import type { DateRange } from 'react-day-picker';
import { cn } from '@/utils/utils';
import { FormLabel } from '../ui/form';
import { RangeDatePicker } from '@/components/ui/RangeDatePicker';
import { CustomMonthPicker } from './CustomMonthPicker';

export type DatePickerInputProps = (
    | {
        selection?: 'single';
        value?: string;
        onChange?: (value: string) => void;
        min?: string;
        max?: string;
    }
    | {
        selection: 'range';
        value?: DateRange;
        onChange?: (range: DateRange | undefined) => void;
        min?: string;
        max?: string;
    }
) & {
    prefixLabel?: string;
    'aria-label'?: string;
    className?: string;
    inputClassName?: string;
    disabled?: boolean;
    mode?: 'date' | 'month';
    labelClassName?: string;
    required?: boolean;
    label: string;
    error?: string;
    errorClassName?: string;
    placeholder?: string;
    appearance?: 'dark' | 'light';
};

const baseWrapperClass =
    'relative flex items-center rounded-2xl px-4 border border-border bg-primary h-12 md:h-14 shrink-0';

export function DatePickerInput(props: DatePickerInputProps) {
    const {
        value,
        onChange,
        'aria-label': ariaLabel,
        label,
        required,
        className = '',
        inputClassName = '',
        disabled = false,
        min,
        max,
        mode = 'date',
        selection = 'single',
        labelClassName = '',
        placeholder,
        error,
        errorClassName,
        appearance = 'light',
    } = props;

    const isMonth = mode === 'month';

    return (
        <div className={cn('flex flex-col gap-1.5 h-22 justify-start', className)}>
            <FormLabel className={cn('text-base! font-medium text-sec-text! tracking-[0.942px]!', labelClassName)}>
                {label} {required && <span className="text-required-red">*</span>}
            </FormLabel>

            {isMonth ? (
                <CustomMonthPicker
                    value={value as string}
                    onChange={onChange as ((v: string) => void) | undefined}
                    disabled={disabled}
                    min={min}
                    max={max}
                    placeholder={placeholder || 'Select month'}
                    ariaLabel={ariaLabel}
                    className={cn(
                        baseWrapperClass,
                        error && 'border-destructive',
                        disabled && 'opacity-60'
                    )}
                    inputClassName={inputClassName}
                />
            ) : selection === 'range' ? (
                <RangeDatePicker
                    embedded
                    selection="range"
                    value={value as DateRange | undefined}
                    onChange={onChange as ((range: DateRange | undefined) => void) | undefined}
                    appearance={appearance}
                    disabled={disabled}
                    placeholder={placeholder || 'Select Date Range'}
                    aria-label={ariaLabel}
                    triggerClassName={inputClassName}
                    error={error}
                    className="gap-0"
                />
            ) : (
                <RangeDatePicker
                    embedded
                    selection="single"
                    value={value as string | undefined}
                    onChange={onChange as ((v: string) => void) | undefined}
                    min={min}
                    max={max}
                    appearance={appearance}
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
