import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Input } from "../ui/input";

interface PINInputProps {
  length?: number;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const PINInput: React.FC<PINInputProps> = ({
  length = 6,
  onChange,
  error,
  className
}) => {
  const [values, setValues] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues.join(''));

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <div className={cn("flex gap-2", className)}>
        {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="password"
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
            "w-12 h-12 text-center text-main-600 font-bold !text-4xl rounded-none",
            `border-x-0 border-t-0 outline-none border-b-2 ${values[index] == '' ? 'border-main-600' : 'border-primary'}`, 
            "focus:border-primary focus:outline-none focus-visible:ring-0 focus-visible:border-b-2"
          )}
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </div>
      {error && (
        <div className="text-sm mt-1 transition-colors text-error">
        {error}
        </div>
      )}
    </div>
  );
};

export default PINInput;
