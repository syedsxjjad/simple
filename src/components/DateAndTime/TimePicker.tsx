import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Clock } from 'lucide-react';
import { cn } from '@/utils/utils';
import { FormLabel, FormMessage } from '@/components/ui/form';

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
    value?: string;
    onChange?: (e: { target: { value: string } }) => void;
    minTime?: string;
    label?: string;
    labelClassName?: string;
    required?: boolean;
    error?: string;
}

const HOURS = ['12', ...Array.from({ length: 11 }, (_, i) => String(i + 1).padStart(2, '0'))];
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const PERIODS = ['AM', 'PM'] as const;

function to24h(hour12: string, minute: string, period: string) {
    let h = parseInt(hour12, 10) % 12;
    if (period === 'PM') h += 12;
    return `${String(h).padStart(2, '0')}:${minute}`;
}

function from24h(value?: string) {
    if (!value) return { hour: '12', minute: '00', period: 'AM' as const };
    const [hStr, mStr] = value.split(':');
    const h = parseInt(hStr, 10);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = (h % 12) || 12;
    return { hour: String(hour12).padStart(2, '0'), minute: mStr ?? '00', period };
}

function Column({ items, selected, onSelect, isDisabled }: { items: readonly string[]; selected: string; onSelect: (v: string) => void; isDisabled?: (v: string) => boolean }) {
    const selectedRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        selectedRef.current?.scrollIntoView({ block: 'center' });
    }, []);

    return (
        <div className="h-56 overflow-y-auto scroll-smooth px-1 space-y-1">
            {items.map((item) => {
                const isSelected = item === selected;
                return (
                    <button
                        key={item}
                        ref={isSelected ? selectedRef : undefined}
                        type="button"
                        disabled={isDisabled?.(item)}
                        onClick={() => onSelect(item)}
                        className={cn(
                            'w-full rounded-lg py-2 text-sm font-normal transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
                            isSelected ? 'bg-secondary-light text-white' : 'text-sec-text hover:bg-input-bg'
                        )}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
    ({ className, value, onChange, disabled, placeholder, minTime, label, labelClassName, error, ...props }, ref) => {
        const { hour, minute, period } = from24h(value);

        const minHour24 = minTime ? parseInt(minTime.split(':')[0], 10) : -1;
        const minMinute = minTime ? parseInt(minTime.split(':')[1], 10) : -1;

        const isPeriodDisabled = (p: string) => {
            if (!minTime) return false;
            if (p === 'AM' && minHour24 >= 12) return true;
            return false;
        };

        const isHourDisabled = (h: string) => {
            if (!minTime) return false;
            let hour24 = parseInt(h, 10);
            if (period === 'PM' && hour24 < 12) hour24 += 12;
            if (period === 'AM' && hour24 === 12) hour24 = 0;
            return hour24 < minHour24;
        };

        const isMinuteDisabled = (m: string) => {
            if (!minTime) return false;
            let hour24 = parseInt(hour, 10);
            if (period === 'PM' && hour24 < 12) hour24 += 12;
            if (period === 'AM' && hour24 === 12) hour24 = 0;
            if (hour24 < minHour24) return true;
            if (hour24 === minHour24 && parseInt(m, 10) < minMinute) return true;
            return false;
        };

        const emit = (nextHour: string, nextMinute: string, nextPeriod: string) => {
            onChange?.({ target: { value: to24h(nextHour, nextMinute, nextPeriod) } });
        };

        const trigger = (
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button
                        ref={ref as React.Ref<HTMLButtonElement>}
                        type="button"
                        disabled={disabled}
                        className={cn(
                            'relative flex items-center rounded-xl pl-3 pr-8 border bg-input-bg text-base font-normal! h-12 md:h-[50px] outline-none focus:ring-1 focus:ring-secondary-light focus:border-secondary-light transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full',
                            error ? 'border-red-500' : 'border-input-border',
                            value ? 'text-sec-text' : 'text-sec-text/50',
                            className
                        )}
                    >
                        {value ? `${hour}:${minute} ${period}` : (placeholder ?? 'Select time')}
                        <Clock
                            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 text-secondary-light"
                            aria-hidden
                        />
                    </button>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        align="start"
                        sideOffset={4}
                        className="z-50 grid grid-cols-3 gap-2 rounded-xl border border-input-border bg-white p-2 shadow-lg w-48"
                        {...(props as React.ComponentPropsWithoutRef<typeof Popover.Content>)}
                    >
                        <Column items={HOURS} selected={hour} onSelect={(h) => emit(h, minute, period)} isDisabled={isHourDisabled} />
                        <Column items={MINUTES} selected={minute} onSelect={(m) => emit(hour, m, period)} isDisabled={isMinuteDisabled} />
                        <Column items={PERIODS} selected={period} onSelect={(p) => emit(hour, minute, p)} isDisabled={isPeriodDisabled} />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );

        if (label || error) {
            return (
                <div className="flex flex-col justify-start gap-1 w-full relative">
                    {label && (
                        <div className="flex min-h-5 items-center gap-1 mb-1">
                            <FormLabel className={cn('text-base! font-medium text-sec-text! tracking-[0.942px]!', labelClassName)}>
                                {label}
                            </FormLabel>
                            {props.required && <span className="pl-0.5 text-sm leading-none text-required-red">*</span>}
                        </div>
                    )}
                    {trigger}
                    {error && <FormMessage className="sm:text-xs text-xs font-medium leading-none">
                        {error}
                    </FormMessage>}
                </div>
            );
        }

        return trigger;
    }
);

TimePicker.displayName = 'TimePicker';
