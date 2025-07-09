/* components/molecules/TextArea.tsx
   ----------------------------------------------------------------------- */
"use client";

import { forwardRef, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import IconButton from "@/components/atoms/IconButton";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps extends Omit<ComponentProps<"textarea">, "children"> {
  handleClear?: () => void;
  prefix?: string;
  suffix?: React.ReactNode;
  icon?: React.ReactNode;
  error?: string;
  textClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      handleClear,
      prefix,
      suffix,
      icon,
      error,
      disabled = false,
      className,
      textClassName,
      rows = 4,
      ...props
    },
    ref
  ) {
    return (
      <>
        <div
          className={cn(
            "flex border-b-2 font-ariom transition-colors",
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

          <Textarea
            ref={ref}
            disabled={disabled}
            rows={rows}
            className={cn(
              "flex-1 resize-none border-none bg-transparent text-lg font-bold outline-none min-h-[100px]",
              disabled ? "cursor-not-allowed text-secondary" : "text-main-600",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              textClassName
            )}
            {...props}
          />

          {suffix && (
            <IconButton onClick={handleClear} icon={suffix} variant="ghost" />
          )}
        </div>

        {error && (
          <p className="mt-1 text-error transition-colors text-sm">{error}</p>
        )}
      </>
    );
  }
);

export default TextArea;
