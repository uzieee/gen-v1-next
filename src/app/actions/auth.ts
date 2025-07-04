"use server";

import { checkOTP } from "@/lib/otp";
import crypto from "crypto";
import { getPayload } from "payload";
import config from "@payload-config";
import { setAuthCookie } from "@/lib/set-auth-cookie";

export async function phoneAuthAction(formData: FormData) {
  try {
    const phone = formData.get("phoneNumber")?.toString();
    const code = formData.get("otp")?.toString();
    if (!phone || !code) {
      throw new Error("Missing inputs");
    }

    /* 1 Verify OTP with Twilio */
    const ok =
      process.env.NODE_ENV === "production"
        ? await checkOTP(phone, code)
        : true;
    if (!ok) {
      throw new Error("Invalid code");
    }

    /* 2 Upsert user in Payload */
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "users",
      where: { phoneNumber: { equals: phone } },
      limit: 1,
    });

    let user = docs[0];
    if (!user) {
      try {
        user = await payload.create({
          collection: "users",
          data: {
            phoneNumber: phone,
            isPhoneNumberVerified: true,
            email: `${phone}@gen.fake`,
            role: "member",
            password: crypto.randomBytes(12).toString("base64url"), // satisfies schema
          },
        });
      } catch (createError) {
        if (
          createError instanceof Error &&
          createError.message.includes("duplicate key error")
        ) {
          throw new Error("Phone number or email already in use");
        }
        throw createError;
      }
    } else if (user && !user.isPhoneNumberVerified) {
      await payload.update({
        collection: "users",
        id: user.id,
        data: { isPhoneNumberVerified: true },
      });
    }

    await setAuthCookie(user.id);

    /* 5  Return concise result */
    return { authenticated: true };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
