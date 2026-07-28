import React from 'react';
import { cn } from '@/utils/utils';
import { useFormContext, Controller } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface FormSelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  description?: string;
  labelClassName?: string;
  startIcon?: React.ReactNode;
  chevronDownIconClassName?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  startIcon,
  className,
  containerClassName,
  placeholder,
  description,
  onValueChange,
  labelClassName,
  disabled = false,
  required = false,
  chevronDownIconClassName,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className={cn('h-20', containerClassName)}>
          {label && (
            <FormLabel className={cn('text-sm font-medium text-foreground-white! uppercase', labelClassName)}>
              {label} {required && <span className="text-required-red">*</span>}
            </FormLabel>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <Select
            value={field.value}
            onValueChange={value => {
              field.onChange(value);
              onValueChange?.(value);
            }}
            disabled={disabled}
            {...props}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  'w-full px-4 h-12! md:h-14! cursor-pointer text-base! rounded-2xl bg-primary text-placeholder border-border',
                  fieldState.error && 'border-destructive focus:border-destructive aria-invalid:border-destructive',
                  className
                )}
                chevronDownIconClassName={chevronDownIconClassName || ''}
                aria-invalid={fieldState.error ? true : undefined}
              >
                <div className="flex items-center gap-2">
                  {startIcon && <span className="text-placeholder!">{startIcon}</span>}
                  <SelectValue placeholder={placeholder} />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full border border-border! bg-background! rounded-xl text-placeholder!">
              {options.length === 0 ? (
                <div className="px-3 py-2 text-sm text-placeholder">No option available</div>
              ) : (
                options.map(option => (
                  <SelectItem
                    className="cursor-pointer!"
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {errors[name] && <p className="text-destructive -mt-1.5 text-xs">{errors[name]?.message as string}</p>}
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
