import React from 'react';
import { cn } from '@/utils/utils';
import { useFormContext, Controller } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface FormSelectProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  compact?: boolean;
  containerClassName?: string;
  placeholder?: string;
  description?: string;
  labelClassName?: string;
  startIcon?: React.ReactNode;
  chevronDownIconClassName?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isFetchingNextPage?: boolean;
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
  isLoading = false,
  onLoadMore,
  hasMore = false,
  isFetchingNextPage = false,
  disabled = false,
  required = false,
  compact = true,
  chevronDownIconClassName,
  ...props
}) => {
  const { control } = useFormContext();

  const observer = React.useRef<IntersectionObserver | null>(null);
  const lastElementRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore?.();
          }
        });
        observer.current.observe(node);
      }
    },
    [isLoading, isFetchingNextPage, hasMore, onLoadMore]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            compact
              ? cn('h-auto gap-2 space-y-0', fieldState.error && '!mb-[6px]')
              : 'h-20 flex flex-col justify-start',
            containerClassName,
          )}
        >
          {label && (
            <div className="flex min-h-5 items-center gap-1 mb-1">
              <FormLabel className={cn('text-base! font-medium text-sec-text! tracking-[0.942px]!', labelClassName)}>
                {label}
              </FormLabel>
              {required && <span className="pl-0.5 text-sm leading-none text-required-red">*</span>}
            </div>
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
                  'w-full px-4 !h-12 md:!h-[50px] shrink-0 font-manrope cursor-pointer text-base! rounded-xl bg-input-bg text-pri-text border-input-border outline-none transition-colors overflow-hidden text-left',
                  'focus:border-secondary-light focus:ring-1 focus:ring-secondary-light focus-visible:border-secondary-light focus-visible:ring-secondary-light focus-visible:ring-1',
                  fieldState.error && 'border-destructive focus:border-destructive aria-invalid:border-destructive',
                  className
                )}
                chevronDownIconClassName={chevronDownIconClassName || ''}
                aria-invalid={fieldState.error ? true : undefined}
                isLoading={isLoading || isFetchingNextPage}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden text-left">
                  {startIcon && <span className="text-placeholder! shrink-0">{startIcon}</span>}
                  <SelectValue placeholder={placeholder} className="truncate min-w-0 flex-1 text-left block" />
                </div>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full max-w-[calc(100vw-32px)] border border-input-border! bg-background! rounded-xl text-placeholder!">
              {isLoading ? (
                <div className="px-3 py-2 text-sm text-placeholder">Loading...</div>
              ) : options.length === 0 ? (
                <div className="px-3 py-2 text-sm text-placeholder">No option available</div>
              ) : (
                <>
                  {options.map((option) => {
                    return (
                      <SelectItem
                        className="cursor-pointer! whitespace-normal! break-words! text-left!"
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
                  {hasMore && (
                    <div ref={lastElementRef} className="px-3 py-2 text-sm text-placeholder text-center">
                      {isFetchingNextPage ? 'Loading more...' : 'Scroll to load more'}
                    </div>
                  )}
                </>
              )}
            </SelectContent>
          </Select>
          {/* <div className="h-5 flex items-start -mt-1.5">
            {fieldState.error && (
              <p className="sm:text-xs text-[10px] font-medium text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div> */}
          {compact ? (
            fieldState.error ? (
              <FormMessage className="sm:text-xs -mt-1 text-xs font-medium leading-none">
                {fieldState.error.message}
              </FormMessage>
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

export default FormSelect;
