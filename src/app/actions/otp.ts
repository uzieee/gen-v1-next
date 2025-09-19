"use server";

import { sendOTP, checkOTP } from "@/lib/otp";

export async function sendOTPAction(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber")?.toString();
  if (!phoneNumber) throw new Error("Phone number required");

  // Check if Twilio is properly configured
  const hasTwilioConfig = process.env.TWILIO_ACCOUNT_SID && 
                         process.env.TWILIO_ACCOUNT_SID.startsWith('AC') &&
                         process.env.TWILIO_AUTH_TOKEN &&
                         process.env.TWILIO_VERIFY_SERVICE_SID;

  if (hasTwilioConfig) {
    // Use real Twilio in both development and production
    try {
      const success = await sendOTP(phoneNumber);
      if (!success) throw new Error("Failed to send OTP");
      console.log(`✅ OTP sent successfully to ${phoneNumber}`);
    } catch (error) {
      console.error("Twilio OTP send error:", error);
      throw new Error("Failed to send OTP. Please check your Twilio configuration.");
    }
  } else {
    // Fallback for development without Twilio config
    console.log(`🔐 Development OTP for ${phoneNumber}: 123456`);
    console.log("⚠️  Twilio not configured. Using development mode.");
  }
}

export async function verifyOTPAction(formData: FormData) {
  const phoneNumber = formData.get("phoneNumber")?.toString();
  const otp = formData.get("otp")?.toString();
  if (!phoneNumber || !otp) throw new Error("Missing inputs");

  // Check if Twilio is properly configured
  const hasTwilioConfig = process.env.TWILIO_ACCOUNT_SID && 
                         process.env.TWILIO_ACCOUNT_SID.startsWith('AC') &&
                         process.env.TWILIO_AUTH_TOKEN &&
                         process.env.TWILIO_VERIFY_SERVICE_SID;

  if (hasTwilioConfig) {
    // Use real Twilio verification in both development and production
    try {
      const verified = await checkOTP(phoneNumber, otp);
      if (!verified) throw new Error("OTP verification failed");
      console.log(`✅ OTP verified successfully for ${phoneNumber}`);
    } catch (error) {
      console.error("Twilio OTP verification error:", error);
      throw new Error("OTP verification failed. Please check your code and try again.");
    }
  } else {
    // Fallback for development without Twilio config
    if (otp !== "123456" && (!/^\d{6}$/.test(otp))) {
      throw new Error("Invalid OTP. Use 123456 for development");
    }
    console.log(`🔐 Development OTP verified for ${phoneNumber}`);
  }

  return { verified: true };
}

// 14378337450
