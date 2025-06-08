"use client";
import CustomButton from "@/components/atoms/CustomButton";
import Header from "@/components/molecules/Header";
import PhoneTextField from "@/components/organisms/PhoneTextField";
import { ISignInDetails, signInSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
            // Get the current values from the form
            const phoneNumber = watch("phoneNumber");
            const countryCode = watch("countryCode");

            // Create a new FormData instance with both values
            const data = new FormData();
            data.append("phoneNumber", `${countryCode}${phoneNumber}`);

            await sendOTPAction(data);
            router.push("/onboarding/verify");
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
                  // Allow only numeric input and delete/backspace keys
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete"
                  ) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  // Remove any non-numeric characters
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
        <CustomButton
          type="submit"
          className="w-full rounded-2xl"
          state={isValid ? "default" : "disabled"}
        >
          Continue
        </CustomButton>
      </form>
    </>
  );
}
