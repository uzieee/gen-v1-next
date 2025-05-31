import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ButtonSize } from "@/types";

interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'fill' | 'outline' | 'ghost';
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  variant = 'fill',
  size = 'md'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10';
      case 'lg':
        return 'w-14 h-14';
      default:
        return 'w-12 h-12';
    }
  };

  const getVariantClasses = () => {
    const baseClasses = 'rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105';

    switch (variant) {
      case 'fill':
        return cn(
          baseClasses,
          'bg-main hover:bg-main-600 text-background',
        )
      case 'outline':
        return cn(
          baseClasses,
          'border-2 border-background bg-transparent text-background hover:bg-main',
        )
      default:
        return baseClasses;
    }
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        getSizeClasses(),
        getVariantClasses(),
        'cursor-pointer focus:outline-none',
        className
      )}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
