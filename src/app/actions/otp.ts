"use server";

import { sendOTP, checkOTP } from "@/lib/otp";

export async function sendOTPAction(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber")?.toString();
  if (!phoneNumber) throw new Error("Phone number required");

  // only run this in production
  // if (process.env.NODE_ENV === "production") {
  const success = await sendOTP(phoneNumber);
  if (!success) throw new Error("Failed to send OTP");
  // }
}

export async function verifyOTPAction(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber")?.toString();
  const otp = formData.get("otp")?.toString();
  if (!phoneNumber || !otp) throw new Error("Missing inputs");

  // only run this in production
  // if (process.env.NODE_ENV === "production") {
  const verified = await checkOTP(phoneNumber, otp);
  if (!verified) throw new Error("OTP verification failed");
  // }

  return { verified: true };
}
