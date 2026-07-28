import { Calendar } from 'lucide-react';
import { cn } from '@/utils/utils';
import { FormLabel } from './ui/form';
import { RangeDatePicker } from '@/components/RangeDatePicker';

export interface DatePickerInputProps {
    value?: string;
    onChange?: (value: string) => void;
    prefixLabel?: string;
    'aria-label'?: string;
    className?: string;
    inputClassName?: string;
    disabled?: boolean;
    min?: string;
    max?: string;
    mode?: 'date' | 'month';
    labelClassName?: string;
    required?: boolean;
    label: string
    error?: string;
    errorClassName?: string;
    placeholder?: string;
}

const baseWrapperClass =
    'relative flex items-center rounded-2xl px-4 border border-border bg-primary h-12 md:h-14 shrink-0';
const baseInputClass =
    'text-base font-normal flex-1 min-w-0 h-12 md:h-14 py-0 leading-[3rem] md:leading-[3.5rem] focus:!outline-none focus:!ring-0 focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [color-scheme:dark]';

export function DatePickerInput({
    value,
    onChange,
    prefixLabel,
    'aria-label': ariaLabel,
    label,
    required,
    className = '',
    inputClassName = '',
    disabled = false,
    min,
    max,
    mode = 'date',
    labelClassName = '',
    placeholder,
    error,
    errorClassName,
}: DatePickerInputProps) {
    const isMonth = mode === 'month';

    return (
        <div className={cn('flex flex-col gap-1.5 h-22 justify-start', className)}>
            <FormLabel className={cn('text-sm font-medium text-foreground-white! uppercase', labelClassName)}>
                {label} {required && <span className="text-required-red">*</span>}
            </FormLabel>

            {isMonth ? (
                <div
                    className={cn(
                        baseWrapperClass,
                        error && 'border-destructive',
                        disabled && 'opacity-60'
                    )}
                >
                    <input
                        type="month"
                        value={value}
                        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                        disabled={disabled}
                        min={min}
                        max={max}
                        placeholder={placeholder || 'Select month'}
                        className={cn(
                            baseInputClass,
                            value ? 'text-placeholder' : 'text-placeholder/30',
                            inputClassName
                        )}
                        aria-label={ariaLabel}
                    />
                    <Calendar
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-dark pointer-events-none shrink-0"
                        aria-hidden
                    />
                </div>
            ) : (
                <RangeDatePicker
                    embedded
                    selection="single"
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    disabled={disabled}
                    placeholder={placeholder || 'Select Date'}
                    aria-label={ariaLabel}
                    triggerClassName={inputClassName}
                    error={error}
                    className="gap-0"
                />
            )}

            <div className="h-5 flex items-start -mt-1">
                {error && (
                    <p className={cn('font-normal text-xs text-destructive', errorClassName)}>{error}</p>
                )}
            </div>
        </div>

    );
}
