import twilio from "twilio";

// Only initialize Twilio client if we have valid credentials
const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC') 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN!)
  : null;

const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// ✅ Send OTP via SMS using Twilio Verify
export const sendOTP = async (phoneNumber: string) => {
  if (!client || !serviceSid) {
    throw new Error("Twilio not configured");
  }
  
  const result = await client.verify.v2
    .services(serviceSid)
    .verifications.create({
      to: phoneNumber,
      channel: "sms",
    });

  return result.status === "pending";
};

// ✅ Verify OTP entered by user
export const checkOTP = async (phoneNumber: string, otp: string) => {
  if (!client || !serviceSid) {
    throw new Error("Twilio not configured");
  }
  
  const result = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({
      to: phoneNumber,
      code: otp,
    });

  return result.status === "approved";
};
