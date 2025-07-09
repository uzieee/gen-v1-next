"use client";

import { updateUserProfile } from "@/app/actions/users";
import { DatePicker } from "@/components/atoms/DatePicker";
import RadioField from "@/components/atoms/RadioField";
import { FormSubmitButton } from "@/components/molecules/FormSubmitButton";
import Header from "@/components/molecules/Header";
import TextField from "@/components/molecules/TextField";
import { accountSetupSchema, IAccountSetupDetails } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, Controller } from "react-hook-form";

export default function AccountSetup() {
  const router = useRouter();
  const {
    formState: { isValid, errors },
    control,
    watch,
    register,
  } = useForm<IAccountSetupDetails>({
    resolver: zodResolver(accountSetupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onBack = () => {
    router.replace("/onboarding/signin");
  };

  return (
    <>
      <Header onBack={onBack} title={"Setup Account"} />
      <form
        action={async () => {
          try {
            const name = watch("fullNames");
            const gender = watch("gender");
            const dateOfBirth = watch("age");

            const data = new FormData();
            data.append("fullName", name);
            data.append("gender", gender);
            data.append("dateOfBirth", dateOfBirth.toISOString().slice(0, 10));

            await updateUserProfile(data);

            router.push(`/onboarding/language-country`);
          } catch (error) {
            console.log(error);
            return;
          }
        }}
        className="flex flex-col gap-14 p-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-xl font-ariom font-bold text-main-600">
              Let&apos;s get to know you
            </div>
            <div className="text-sm font-ariom font-bold text-secondary">
              Enter your phone number to login an account
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium text-main-300">
                Full Names
              </div>
              <div className="text-xs font-ariom text-secondary-800">
                Spelled exactly as you want it to appear
              </div>
            </div>
            <TextField
              {...register("fullNames")}
              placeholder="Your name here"
              autoFocus
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0008 2.29166C8.29688 2.29166 6.92578 3.66926 6.92578 5.36666C6.92578 7.01918 8.21668 8.35998 9.84652 8.43237C9.94536 8.4255 10.0498 8.42516 10.1483 8.4323C11.7765 8.35915 13.0682 7.01923 13.0758 5.36539C13.0751 3.66949 11.6968 2.29166 10.0008 2.29166ZM5.67578 5.36666C5.67578 2.98074 7.60469 1.04166 10.0008 1.04166C12.3876 1.04166 14.3258 2.97982 14.3258 5.36666L14.3258 5.36927C14.3161 7.70293 12.4766 9.60495 10.1551 9.68298C10.1274 9.68391 10.0996 9.68299 10.0719 9.68023C10.0317 9.67621 9.97169 9.67567 9.9157 9.68076C9.88991 9.68311 9.864 9.68385 9.83812 9.68298C7.51711 9.60496 5.67578 7.70281 5.67578 5.36666Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.1447 10.3646C11.7515 10.3646 13.3901 10.7679 14.6564 11.6136C15.7946 12.3712 16.4467 13.4332 16.4467 14.576C16.4467 15.7188 15.7947 16.7827 14.6569 17.5444L14.6568 17.5445C13.3866 18.3943 11.746 18.8 10.1384 18.8C8.53116 18.8 6.89084 18.3945 5.62076 17.5449C4.48234 16.7873 3.83008 15.7253 3.83008 14.5823C3.83008 13.4395 4.48211 12.3756 5.6199 11.614L5.6222 11.6124L5.6222 11.6124C6.89589 10.7679 8.53763 10.3646 10.1447 10.3646ZM6.31411 12.6535C5.43607 13.2417 5.08008 13.9524 5.08008 14.5823C5.08008 15.212 5.43592 15.9206 6.31377 16.5046L6.31514 16.5056C7.33662 17.189 8.72098 17.55 10.1384 17.55C11.5558 17.55 12.9401 17.189 13.9616 16.5056C14.8404 15.9173 15.1967 15.2062 15.1967 14.576C15.1967 13.9463 14.8409 13.2377 13.9631 12.6537L13.9621 12.6531C12.9451 11.9738 11.5628 11.6146 10.1447 11.6146C8.72722 11.6146 7.3403 11.9735 6.31411 12.6535Z"
                    fill="currentColor"
                  />
                </svg>
              }
              error={errors.fullNames?.message}
              className="border border-main-600 rounded-2xl px-4 py-3"
            />
          </div>
          <div className="py-9">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioField
                  options={[
                    { value: "female", label: "Female", id: "female" },
                    { value: "male", label: "Male", id: "male" },
                    {
                      value: "non-binary",
                      label: "Non-binary",
                      id: "non-binary",
                    },
                    {
                      value: "two-spirit",
                      label: "Two-Spirit",
                      id: "two-spirit",
                    },
                    {
                      value: "prefer-to-self-describe",
                      label: "Prefer to self-describe",
                      id: "prefer-to-self-describe",
                    },
                    {
                      value: "prefer-not-to-say",
                      label: "Prefer not to say",
                      id: "prefer-not-to-say",
                    },
                  ]}
                  error={errors.gender?.message}
                  {...field}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-7">
            <div className="text-lg font-medium text-main-300">Age</div>
            <div className="flex flex-col gap-3">
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    error={errors.age?.message}
                    date={field.value}
                    setDate={(date) => field.onChange(date)}
                  />
                )}
              />
              <div className="text-xs font-ariom text-secondary-800">
                Date of birth — for onboarding only. Not shown on your profile.
              </div>
            </div>
          </div>
        </div>
        <FormSubmitButton state={isValid ? "default" : "disabled"} />
      </form>
    </>
  );
}
