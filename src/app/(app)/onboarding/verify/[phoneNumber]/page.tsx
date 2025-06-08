"use client";
import CustomButton from "@/components/atoms/CustomButton";
import PINInput from "@/components/atoms/PinInput";
import Header from "@/components/molecules/Header";
import { ButtonState, IVerifyDetails, verifySchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { verifyOTPAction } from "@/app/actions/otp";
import { useFormStatus } from "react-dom";

export default function Verify() {
  const { push } = useRouter();
  const { phoneNumber } = useParams();
  const {
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<IVerifyDetails>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onBack = () => {
    push("/onboarding/signin");
  };

  return (
    <>
      <Header onBack={onBack} title={"Sign In"} />
      <form
        onSubmit={async () => {
          try {
            const verificationCode = watch("verificationCode");

            const data = new FormData();
            data.append("otp", verificationCode);
            data.append("phoneNumber", phoneNumber as string);

            console.log({ data });

            await verifyOTPAction(data);
            // push(`/onboarding/profile`);
          } catch (error) {
            console.log(error);
            return;
          }
        }}
        className="flex flex-col gap-14 p-6"
      >
        <div className="flex flex-col gap-1">
          <div className="text-xl font-ariom font-bold text-main-600">
            Enter your Verification
          </div>
          <div className="text-sm font-ariom font-bold text-secondary">
            Enter your password and explore Cabo
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Controller
            name="verificationCode"
            control={control}
            render={({ field }) => (
              <PINInput
                onChange={field.onChange}
                error={errors.verificationCode?.message}
              />
            )}
          />
          <CustomButton
            variant="ghost"
            className="p-0 text-white"
            textClassName="p-0 text-sm"
            onClick={() => console.log("Resend code clicked")}
          >
            Didn{`'`}t receive code? Send again
          </CustomButton>
          <SubmitButton state={isValid ? "default" : "disabled"} />
        </div>
      </form>
    </>
  );
}

function SubmitButton({ state }: { state: ButtonState }) {
  const { pending } = useFormStatus();
  return (
    <CustomButton
      type="submit"
      state={state}
      isLoading={pending}
      className="w-full rounded-2xl"
    >
      {pending ? "Verifying..." : "Confirm"}
    </CustomButton>
  );
}
