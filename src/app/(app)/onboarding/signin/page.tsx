"use client";
import CustomButton from "@/components/atoms/CustomButton";
import Header from "@/components/molecules/Header";
import PhoneTextField from "@/components/organisms/PhoneTextField";
import { ButtonState, ISignInDetails, signInSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { sendOTPAction } from "@/app/actions/otp";

export default function Signin() {
  const router = useRouter();
  const {
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<ISignInDetails>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      countryCode: "+1",
      phoneNumber: "",
    },
  });

  const onBack = () => {
    router.push("/onboarding/splash");
  };

  return (
    <>
      <Header onBack={onBack} title={"Sign In"} />
      <form
        action={async () => {
          try {
            const phoneNumber = watch("phoneNumber");
            const countryCode = watch("countryCode");

            const data = new FormData();
            data.append("phoneNumber", `${countryCode}${phoneNumber}`);

            await sendOTPAction(data);
            router.push(`/onboarding/verify/${countryCode}${phoneNumber}`);
          } catch (error) {
            console.log(error);
            return;
          }
        }}
        className="flex flex-col gap-14 p-6"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="text-xl font-ariom font-bold text-main-600">
              Enter your phone number
            </div>
            <div className="text-sm font-ariom font-bold text-secondary">
              Enter your phone number to login an account
            </div>
          </div>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneTextField
                {...field}
                error={errors.phoneNumber?.message}
                autoFocus
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete"
                  ) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(numericValue);
                }}
                onCountryCodeChange={(countryCode) => {
                  field.onChange(field.value);
                  control._formValues.countryCode = `+${countryCode.code}`;
                }}
              />
            )}
          />
        </div>
        <SubmitButton state={isValid ? "default" : "disabled"} />
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
      {pending ? "Sending..." : "Continue"}
    </CustomButton>
  );
}
