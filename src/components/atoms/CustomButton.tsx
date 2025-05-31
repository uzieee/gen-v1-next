import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonSize, ButtonState, ButtonVariant } from "@/types";

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  state = 'default',
  showLeftArrow = false,
  showRightArrow = false,
  onClick,
  className,
  textClassName,
  type = 'button',
  ...props
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'transition-all duration-200 rounded-lg transform hover:scale-105';
    
    switch (variant) {
      case 'primary':
        return cn(
          baseClasses,
          'bg-primary hover:bg-primary/90 text-background',
          state === 'active' && 'bg-primary-200',
          state === 'disabled' && 'bg-primary/50 hover:bg-primary/50 hover:scale-100 opacity-60'
        );
      case 'main':
        return cn(
          baseClasses,
          'bg-main hover:bg-main/90 text-background',
          state === 'active' && 'bg-main-300',
          state === 'disabled' && 'bg-main/50 hover:bg-main/50 hover:scale-100 opacity-60'
        );
      case 'secondary':
        return cn(
          baseClasses,
          'bg-secondary hover:bg-secondary-600 text-background',
          state === 'active' && 'bg-secondary-400',
          state === 'disabled' && 'bg-secondary/50 hover:bg-secondary/50 hover:scale-100 opacity-60'
        );
      case 'error':
        return cn(
          baseClasses,
          'bg-error hover:opacity-90 text-main',
          state === 'disabled' && 'opacity-50 hover:scale-100'
        );
      case 'badge':
        return cn(
          baseClasses,
          'bg-badge-red hover:opacity-90 text-main',
          state === 'disabled' && 'opacity-50 hover:scale-100'
        );
      case 'outline':
        return cn(
          baseClasses,
          'border-2 border-background text-background bg-transparent hover:bg-background hover:text-main',
          state === 'disabled' && 'border-background/50 text-background/50'
        );
      case 'outline-main':
        return cn(
          baseClasses,
          'border-2 border-main text-main bg-transparent hover:border-background hover:bg-main hover:text-background',
          state === 'disabled' && 'border-background/50 text-background/50'
        );
      case 'outline-primary':
        return cn(
          baseClasses,
          'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-background',
          state === 'disabled' && 'border-background/50 text-background/50'
        );
      default:
        return baseClasses;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <Button
      type={type}
      onClick={state !== 'disabled' ? onClick : undefined}
      className={cn(
        getVariantClasses(),
        'flex items-center gap-2 p-6 cursor-pointer focus:outline-none',
        className
      )}
      disabled={state === 'disabled'}
      {...props}
    >
      {showLeftArrow && <ArrowLeft className="!w-6 !h-6" />}
      <div className={`${cn(getSizeClasses(), textClassName)} font-syne font-bold`}>{children}</div>
      {showRightArrow && <ArrowRight className="!w-6 !h-6" />}
    </Button>
  );
};

export default CustomButton;