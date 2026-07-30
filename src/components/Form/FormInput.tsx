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
  min?: string | number;
  max?: string | number;
  step?: string | number;
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
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  compact?: boolean;
  isNumberOnly?: boolean;
  itemClassName?: string;
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
  disabled = false,
  required = false,
  compact = true,
  isNumberOnly,
  itemClassName,
  ...props
}) => {
  const { control, getValues } = useFormContext();
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
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            compact
              ? cn('h-auto gap-2 space-y-0', fieldState.error && '!mb-[4px]')
              : 'h-20 flex flex-col justify-start',
            itemClassName,
          )}
        >
          {label && (
            <div className="flex min-h-5 items-center gap-1 mb-1">
              <FormLabel className={cn('text-base! font-medium text-placeholder! tracking-[0.942px]!', props.labelClassName)}>
                {label}
              </FormLabel>
              {required && <span className="pl-0.5 text-sm leading-none text-required-red">*</span>}
            </div>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <div className="relative w-full">
              {startIcon && (
                <span className="absolute inset-y-0 md:left-6 left-4 flex items-center text-sec-text">
                  {startIcon}
                </span>
              )}
              <Input
                {...field}
                disabled={disabled}
                type={getInputType()}
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={isNumberOnly ? 'numeric' : props.inputMode}
                onPaste={props.onPaste}
                className={cn(
                  'h-12 md:h-[50px] pl-5',
                  startIcon && 'sm:pl-15 pl-13',
                  isPasswordType && 'sm:pr-12 pr-11',
                  endIcon && !isPasswordType && 'sm:pr-12 pr-11',
                  fieldState.error && 'border-destructive focus:border-destructive',
                  className
                )}
                onChange={e => {
                  if (isNumberOnly) {
                    e.target.value = e.target.value.replace(/\D/g, '');
                  }
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
                  className="absolute inset-y-0 md:right-6 right-4 flex items-center text-secondary-light cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {endIcon && !isPasswordType && (
                <span className="absolute inset-y-0 md:right-6 right-4 flex items-center">{endIcon}</span>
              )}
            </div>
          </FormControl>
          {compact ? (
            fieldState.error ? (
              <FormMessage className="sm:text-xs -mt-1 text-xs font-medium leading-none" />
            ) : null
          ) : (
            <div className="h-5 flex items-start -mt-1">
              <FormMessage className="sm:text-xs text-xs font-medium" />
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormInput;
