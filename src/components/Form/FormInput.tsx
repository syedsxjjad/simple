import { cn } from '@/utils/utils';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface FormInputProps {
  name: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  description?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  pattern?: string;
  labelClassName?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  endIcon,
  onChange,
  startIcon,
  className,
  placeholder,
  description,
  autoComplete,
  type = 'text',
  labelClassName,
  disabled = false,
  required = false,
  ...props
}) => {
  const { getValues } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (isPasswordType) {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="h-20 flex flex-col justify-start">
          {label && (
            <div className="flex min-h-5 items-center gap-1">
              <FormLabel className={cn('text-sm! font-medium text-foreground-white! tracking-[0.942px]! uppercase', labelClassName)}>
                {label}
              </FormLabel>
              {required && <span className="pl-0.5 text-sm leading-none text-required-red">*</span>}
            </div>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <div className="relative w-full">
              {startIcon && (
                <span className="absolute inset-y-0 md:left-6 left-4 flex items-center text-placeholder">
                  {startIcon}
                </span>
              )}
              <Input
                {...field}
                disabled={disabled}
                type={getInputType()}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={cn(
                  'h-12 md:h-14 pl-5',
                  startIcon && 'sm:pl-13 pl-11',
                  isPasswordType && 'sm:pr-12 pr-11',
                  endIcon && !isPasswordType && 'sm:pr-12 pr-11',
                  fieldState.error && 'border-destructive focus:border-destructive',
                  className
                )}
                onChange={e => {
                  if (onChange) {
                    onChange(e);
                    field.onChange(getValues(name));
                    return;
                  }
                  field.onChange(e);
                }}
                {...props}
              />
              {isPasswordType && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 md:right-6 right-4 flex items-center text-placeholder cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
              {endIcon && !isPasswordType && (
                <span className="absolute inset-y-0 md:right-6 right-4 flex items-center">{endIcon}</span>
              )}
            </div>
          </FormControl>
          <div className="h-5 flex items-start -mt-1.5">
            <FormMessage className="sm:text-xs text-[10px] font-medium" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
