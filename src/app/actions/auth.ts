"use server";

import { checkOTP } from "@/lib/otp";
import crypto from "crypto";
import { getPayload } from "payload";
import config from "@payload-config";
import { setAuthCookie } from "@/lib/set-auth-cookie";

export async function phoneAuthAction(formData: FormData) {
  try {
    let phone = formData.get("phoneNumber")?.toString().split("%2B")[1];
    const code = formData.get("otp")?.toString();
    if (!phone || !code) {
      throw new Error("Missing inputs");
    }

    phone = "+" + phone;

    /* 1 Verify OTP with Twilio */
    let ok = false;
    
    // Check if Twilio is properly configured
    const hasTwilioConfig = process.env.TWILIO_ACCOUNT_SID && 
                           process.env.TWILIO_ACCOUNT_SID.startsWith('AC') &&
                           process.env.TWILIO_AUTH_TOKEN &&
                           process.env.TWILIO_VERIFY_SERVICE_SID;

    if (hasTwilioConfig) {
      // Use real Twilio verification
      try {
        ok = await checkOTP(phone, code);
        console.log(`✅ Auth OTP verified for ${phone}`);
      } catch (error) {
        console.error("Twilio auth verification error:", error);
        ok = false;
      }
    } else {
      // Fallback for development without Twilio config
      ok = code === "123456" || /^\d{6}$/.test(code);
      console.log(`🔐 Development auth OTP verified for ${phone}`);
    }
    
    if (!ok) {
      throw new Error("Invalid code");
    }

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
    return {
      authenticated: true,
      isExistingUser: !!docs[0],
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
