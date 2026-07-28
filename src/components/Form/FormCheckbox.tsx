import React from 'react';
import { cn } from '@/utils/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription, FormField } from '@/components/ui/form';

interface FormCheckboxProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  description,
  disabled = false,
  className,
  labelClassName,
  onChange,
  ...props
}) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start">
          <FormControl>
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={checked => {
                field.onChange(checked);
                onChange?.(Boolean(checked));
              }}
              disabled={disabled}
              className={cn('border-placeholder cursor-pointer', className)}
              {...props}
            />
          </FormControl>
          <div>
            {label && <FormLabel className={cn("text-base font-medium -mt-1 text-placeholder", labelClassName)}>{label}</FormLabel>}
            {description && <FormDescription className="sm:text-xs text-[10px]">{description}</FormDescription>}
            <FormMessage className="sm:text-xs text-[10px]" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
