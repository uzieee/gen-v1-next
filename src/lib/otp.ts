import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

// ✅ Send OTP via SMS using Twilio Verify
export const sendOTP = async (phoneNumber: string) => {
  const result = await client.verify.v2
    .services(serviceSid)
    .verifications.create({
      to: phoneNumber,
      channel: "sms",
    });

  return result.status === "pending"; // usually 'pending' means it was sent
};

// ✅ Verify OTP entered by user
export const checkOTP = async (phoneNumber: string, otp: string) => {
  const result = await client.verify.v2
    .services(serviceSid)
    .verificationChecks.create({
      to: phoneNumber,
      code: otp,
    });

  return result.status === "approved";
};
