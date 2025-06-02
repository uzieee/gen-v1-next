import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";
import IconButton from "../atoms/IconButton";
import { Input } from "../ui/input";

// Text Field Component
interface TextFieldProps extends Omit<ComponentProps<'input'>, 'children'> {
  handleClear?: () => void;
  prefix?: string;
  suffix?: React.ReactNode;
  error?: string;
  icon?: React.ReactNode;
  textClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({
  type = 'text',
  handleClear,
  prefix,
  suffix,
  error,
  disabled = false,
  className,
  textClassName,
  icon,
  ...props
}, ref) {
  return (
    <>
      <div className={cn(
        "flex items-center border-b-2 pb-2 transition-colors font-syne",
        error ? "border-error" : "border-main-600 focus-within:border-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}>
        {prefix && (
        <span className="text-main-600 mr-2 font-bold">{prefix}</span>
        )}
        {icon && (
          <div className='mr-2 text-main-600'>
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(
            "flex-1 bg-transparent outline-none text-lg font-bold border-none",
            disabled ? "cursor-not-allowed text-secondary" : "text-main-600",
            "focus:border-primary-200 focus:outline-none focus-visible:ring-0",
            textClassName
          )}
          {...props}
        />
        {suffix && (
          <IconButton 
            onClick={handleClear}
            icon={suffix}
            variant="ghost"
          />
        )}
      </div>
      {error && (
        <div className="text-sm mt-1 transition-colors text-error">
          {error}
        </div>
      )}
    </>
  );
});

export default TextField;