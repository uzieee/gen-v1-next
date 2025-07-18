"use client";

import PINInput from "@/components/atoms/PinInput";
import Header from "@/components/molecules/Header";
import { IVerifyDetails, verifySchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { phoneAuthAction } from "@/app/actions/auth";
import { ResendCodeButton } from "./_components/ResendCodeButton";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";

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
        action={async () => {
          try {
            const verificationCode = watch("verificationCode");

            const data = new FormData();
            data.append("otp", verificationCode);
            data.append("phoneNumber", phoneNumber as string);

            const results = await phoneAuthAction(data);

            if (results.isExistingUser) {
              push(`/home`);
            } else {
              push(`/onboarding/account-setup`);
            }
          } catch (error) {
            console.log(error);
            return;
          }
        }}
        className="flex flex-col gap-14 p-6"
      >
        <div className="flex flex-col gap-1">
          <div className="text-xl font-ariom font-bold text-main-600">
            Let&apos;s verify it&apos;s you
          </div>
          <div className="text-sm font-ariom font-bold text-secondary">
            We&apos;ve sent you a code — enter it below to continue.
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
          <ResendCodeButton phoneNumber={phoneNumber as string} />
          <FormSubmitButton
            loadingText="Verifying..."
            defaultText="Verify"
            state={isValid ? "default" : "disabled"}
          />
        </div>
      </form>
    </>
  );
}
