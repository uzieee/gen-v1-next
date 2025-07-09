"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

interface ComboBoxProps {
  /** List of {label,value} pairs */
  options: Option[];
  /** Controlled value (value string or undefined) */
  value?: string;
  /** Callback on change */
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  prefix?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function ComboBox({
  options,
  value,
  onChange,
  placeholder = "Select…",
  disabled,
  error,
  prefix,
  icon,
  className,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              "flex w-full items-center border-b-2 font-ariom transition-colors text-left",
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

            <span
              className={cn(
                "flex-1 truncate py-3 text-lg font-bold",
                selected ? "text-main-600" : "text-secondary"
              )}
            >
              {selected ? selected.label : placeholder}
            </span>

            <ChevronDownIcon className="mr-2 h-5 w-5 text-main-600" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "p-0 w-[--popover-width:var(--radix-popover-trigger-width)]",
            "bg-[#131313] text-main-600 font-ariom"
          )}
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Search…"
              className="placeholder:text-secondary-800"
            />
            <CommandEmpty>No results.</CommandEmpty>
            <CommandList>
              {options.map((opt) => (
                <CommandItem
                  value={opt.label}
                  key={opt.value}
                  onSelect={() => {
                    onChange?.(opt.value === value ? undefined : opt.value);
                    setOpen(false);
                  }}
                  className="text-main-600 font-ariom"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      opt.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="mt-1 text-sm text-error transition-colors">{error}</p>
      )}
    </>
  );
}
