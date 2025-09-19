"use client";

import Header from "@/components/molecules/Header";
import PhoneTextField from "@/components/organisms/PhoneTextField";
import { ISignInDetails, signInSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { signinAction } from "@/app/actions/otp";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";

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
        action={signinAction}
        className="flex flex-col gap-14 p-6"
      >
        {/* Hidden inputs for form data */}
        <input type="hidden" name="phoneNumber" value={watch("phoneNumber") || ""} />
        <input type="hidden" name="countryCode" value={watch("countryCode") || ""} />
        
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
        <FormSubmitButton
          loadingText="Sending..."
          state={isValid ? "default" : "disabled"}
        />
        
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => router.push("/reset-password")}
            className="text-primary text-sm font-ariom hover:underline"
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </>
  );
}
