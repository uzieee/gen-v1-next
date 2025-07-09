import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface RadioFieldProps {
  options: Array<{
    value: string;
    label: string;
    id: string;
  }>;
  error?: string;
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
export default function RadioField({
  options,
  error,
  name,
  value,
  onValueChange,
}: RadioFieldProps) {
  return (
    <RadioGroup
      className="flex flex-wrap space-x-6 w-full items-center"
      value={value}
      name={name}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2.5">
          <RadioGroupItem
            value={option.value}
            id={option.id}
            className={`border-2 border-main-600 data-[state=checked]:border-primary data-[state=checked]:bg-primary`}
          />
          <Label
            htmlFor={option.id}
            className="text-main-600 font-ariom font-bold"
          >
            {option.label}
          </Label>
        </div>
      ))}
      {error && <p className="text-error text-sm mt-2">{error}</p>}
    </RadioGroup>
  );
}
