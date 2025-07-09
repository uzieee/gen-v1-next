"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import IconButton from "@/components/atoms/IconButton";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

interface SelectFieldProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  prefix?: string;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  function SelectField(
    {
      options,
      value,
      onChange,
      placeholder = "Select…",
      disabled,
      error,
      prefix,
      suffix,
      icon,
      className,
    },
    ref
  ) {
    return (
      <div className="w-full relative">
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            className={cn(
              "flex w-full items-center border-b-2 font-ariom transition-colors",
              error
                ? "border-error"
                : "border-main-600 focus-within:border-primary",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            {prefix && (
              <span className="mr-2 font-bold text-main-600">{prefix}</span>
            )}
            {icon && <span className="mr-2 text-main-600">{icon}</span>}

            <SelectValue
              placeholder={
                <span className="text-secondary text-lg font-bold">
                  {placeholder}
                </span>
              }
              className="flex-1 text-lg font-bold text-main-600"
            />

            {suffix ? (
              <IconButton icon={suffix} variant="ghost" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-main-600" />
            )}
          </SelectTrigger>

          <SelectContent
            position="popper" // keeps it next to the trigger even inside flex
            sideOffset={4}
            align="start"
            className="bg-[#131313] text-main-600 font-ariom"
          >
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="flex items-center gap-2"
              >
                <CheckIcon
                  className={cn(
                    "h-4 w-4",
                    value === opt.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {error && (
          <p className="mt-1 text-sm text-error transition-colors">{error}</p>
        )}
      </div>
    );
  }
);

export default SelectField;
