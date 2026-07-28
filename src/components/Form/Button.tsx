import React from 'react';
import { cn } from '@/utils/utils';
import { Loader2 } from 'lucide-react';
import { Button as ShadcnButton } from '@/components/ui/button';

export interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  label?: string;
  loading?: boolean;
  asChild?: boolean;
  fullWidth?: boolean;
  loadingText?: string;
  leftIconClassName?: string;
  leftIcon?: React.ReactNode;
  rightIconClassName?: string;
  rightIcon?: React.ReactNode;
  buttonTextClassName?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const Button: React.FC<ButtonProps> = ({
  label,
  leftIcon,
  disabled,
  children,
  rightIcon,
  className,
  loadingText,
  size = 'default',
  loading = false,
  variant = 'default',
  fullWidth = false,
  leftIconClassName,
  rightIconClassName,
  buttonTextClassName,
  ...props
}) => {
  const buttonText = label || children;
  const isDisabled = disabled || loading;

  const getVariantClasses = () => {
    if (variant === 'default') {
      return 'text-foreground-black gold-gradient-button shadow-[inset_5px_-8px_19.5px_#804301] font-sora sm:font-semibold font-normal sm:text-lg! text-sm! border-0 gold-border-gradient';
    }
    if (variant === 'outline') {
      return 'text-primary hover:text-foreground hover:bg-primary/10';
    }
    return '';
  };

  return (
    <ShadcnButton
      {...props}
      size={size}
      variant={variant}
      disabled={isDisabled}
      className={cn('cursor-pointer rounded-2xl', fullWidth && 'w-full', 'h-auto md:h-14', getVariantClasses(), className)}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

      {!loading && leftIcon && (
        <span className={cn('mr-2 flex items-center [&>svg]:w-4 [&>svg]:h-4', leftIconClassName)}>{leftIcon}</span>
      )}

      {loading ? loadingText || buttonText : <span className={cn("break-all whitespace-normal sm:text-lg! text-sm!  sm:font-semibold font-normal", buttonTextClassName)}>{buttonText}</span>}

      {!loading && rightIcon && (
        <span className={cn('ml-2 flex items-center [&>svg]:w-4 [&>svg]:h-4', rightIconClassName)}>{rightIcon}</span>
      )}
    </ShadcnButton>
  );
};

export default Button;
