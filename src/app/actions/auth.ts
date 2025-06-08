"use server";

import { checkOTP } from "@/lib/otp";
import jwt from "jsonwebtoken";
// import crypto from "crypto";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

export async function phoneAuthAction(_: unknown, formData: FormData) {
  const phone = formData.get("phoneNumber")?.toString();
  const code = formData.get("otp")?.toString();
  if (!phone || !code) return { error: "Missing inputs" };

  /* 1 — Verify OTP with Twilio */
  const ok = await checkOTP(phone, code);
  if (!ok) return { error: "Invalid code" };

  /* 2 — Upsert user in Payload */
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "users",
    where: { phoneNumber: { equals: phone } },
    limit: 1,
  });

  const user = docs[0];
  // if (!user) {
  //   user = await payload.create({
  //     collection: "users",
  //     data: {
  //       phoneNumber: phone,
  //       isPhoneNumberVerified: true,
  //       email: `${phone}@gen.fake`,
  //       password: crypto.randomBytes(12).toString("base64url"), // satifies schema
  //     },
  //   });
  // } else

  if (user && !user.isPhoneNumberVerified) {
    await payload.update({
      collection: "users",
      id: user.id,
      data: { isPhoneNumberVerified: true },
    });
  }

  /* 3 — Sign JWT manually (same payload Payload would use) */
  const token = jwt.sign(
    { id: user.id, collection: "users" },
    process.env.PAYLOAD_SECRET!,
    { expiresIn: "30d" }
  );

  /* 4 — Set HttpOnly cookie */
  (await cookies()).set("payload-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  /* 5 — Return concise result */
  return { authenticated: true };
}
