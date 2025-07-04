"use client";

import { useFormStatus } from "react-dom";
import CustomButton from "../atoms/CustomButton";
import { ButtonState } from "@/types";

interface SubmitButtonProps {
  state: ButtonState;
  loadingText?: string;
  defaultText?: string;
  className?: string;
}

export function FormSubmitButton({
  state,
  loadingText = "Saving...",
  defaultText = "Continue",
  className = "w-full rounded-2xl",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <CustomButton
      type="submit"
      state={state}
      isLoading={pending}
      className={className}
    >
      {pending ? loadingText : defaultText}
    </CustomButton>
  );
}
