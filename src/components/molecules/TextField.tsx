import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";
import IconButton from "../atoms/IconButton";

// Text Field Component
interface TextFieldProps {
  type?: 'text' | 'email' | 'tel' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  prefix?: string;
  suffix?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  placeholder,
  value = '',
  onChange,
  prefix,
  suffix,
  error = false,
  disabled = false,
  className,
  icon
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center border-b-2 pb-2 transition-colors font-syne",
        error ? "border-error" : "border-main-600 focus-within:border-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        {prefix && (
        <span className="text-main-600 mr-2 font-bold">{prefix}</span>
        )}
        {icon && (
          <div className={`mr-2 ${error ? 'text-error' : 'text-main-600'}`}>
            {icon}
          </div>
        )}
        <Input
          type={type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 bg-transparent outline-none text-lg font-bold border-none",
            disabled ? "cursor-not-allowed text-secondary" : "text-main-600",
            "focus:border-primary-200 focus:outline-none focus-visible:ring-0"
          )}
        />
        {suffix && inputValue && (
          <IconButton 
            onClick={handleClear}
            icon={suffix}
            variant="ghost"
            className={error ? "text-error" : ""}
          />
        )}
      </div>
      {error && (
        <div className="text-sm mt-1 transition-colors text-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;