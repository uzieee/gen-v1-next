import CustomButton from "@/components/atoms/CustomButton";
import { sendOTPAction } from "@/app/actions/otp";
import { useState } from "react";

interface ResendCodeFormProps {
  phoneNumber: string;
}

export function ResendCodeButton({ phoneNumber }: ResendCodeFormProps) {
  const [pending, setPending] = useState(false);

  const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const data = new FormData();
      data.append("phoneNumber", phoneNumber);
      await sendOTPAction(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <CustomButton
      variant="ghost"
      isLoading={pending}
      className="p-0 text-white"
      textClassName="p-0 text-sm"
      onClick={handleResendCode}
    >
      Didn&apos;t receive code? Send again
    </CustomButton>
  );
}
