import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import IconButton from "../atoms/IconButton";
import { Input } from "../ui/input";

interface InputSpinnerProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const InputSpinner: React.FC<InputSpinnerProps> = ({
  min = 0,
  max = 100,
  value = 1,
  onChange,
  className
}) => {
  const [spinnerValue, setSpinnerValue] = useState(value);

  const handleDecrease = () => {
    const newValue = Math.max(min, spinnerValue - 1);
    setSpinnerValue(newValue);
    onChange?.(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, spinnerValue + 1);
    setSpinnerValue(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      setSpinnerValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <IconButton
        onClick={handleDecrease}
        variant="ghost"
        icon={<Minus className="!w-6 !h-6"/>}
        disabled={spinnerValue <= min}
      />
      <Input
        type="number"
        value={spinnerValue}
        onChange={handleInputChange}
        className={cn(
          "!text-base text-main-600 text-center font-bold w-16",
          "border-none outline-none focus:outline-none focus-visible:ring-0"
        )}
        min={min}
        max={max}
      />
      <IconButton
        onClick={handleIncrease}
        variant="ghost"
        icon={<Plus className="!w-6 !h-6"/>}
        disabled={spinnerValue >= max}
      />
    </div>
  );
};

export default InputSpinner;
