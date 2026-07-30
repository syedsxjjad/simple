import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const baseInputClass =
    'text-base font-normal flex-1 min-w-0 h-12 md:h-14 py-0 leading-[3rem] md:leading-[3.5rem] focus:!outline-none focus:!ring-0 focus-visible:ring-0 appearance-none bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0 [color-scheme:dark]';

export interface CustomMonthPickerProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    ariaLabel?: string;
    min?: string;
    max?: string;
}

export function CustomMonthPicker({ value, onChange, disabled, placeholder, className, inputClassName, ariaLabel, min, max }: CustomMonthPickerProps) {
    const [open, setOpen] = useState(false);
    const [viewYear, setViewYear] = useState(new Date().getFullYear());

    useEffect(() => {
        if (open) {
            if (value) {
                setViewYear(parseInt(value.split('-')[0], 10));
            } else {
                setViewYear(new Date().getFullYear());
            }
        }
    }, [open, value]);

    const displayValue = value ? (() => {
        const [y, m] = value.split('-');
        return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
    })() : '';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <button
                    type="button"
                    aria-label={ariaLabel}
                    className={cn(className, 'cursor-pointer w-full')}
                >
                    <span className={cn(baseInputClass, !value && 'text-placeholder/30', value && 'text-placeholder', inputClassName, 'text-left inline-flex items-center w-full')}>
                        {displayValue || placeholder || 'Select month'}
                    </span>
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-dark pointer-events-none shrink-0" aria-hidden />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-4 bg-primary border border-border shadow-xl rounded-2xl text-foreground-white" sideOffset={8}>
                <div className="flex justify-between items-center pb-3 mb-4">
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setViewYear(y => y - 1); }}
                        className="h-7 w-7 flex items-center cursor-pointer justify-center border border-border bg-transparent text-foreground-white opacity-80 hover:opacity-100 rounded-md transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium text-foreground-white">{viewYear}</span>
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setViewYear(y => y + 1); }}
                        className="h-7 w-7 flex items-center cursor-pointer justify-center border border-border bg-transparent text-foreground-white opacity-80 hover:opacity-100 rounded-md transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-y-4 gap-x-2 mb-4">
                    {MONTHS.map((m, i) => {
                        const monthValue = `${viewYear}-${String(i + 1).padStart(2, '0')}`;
                        const isSelected = value === monthValue;
                        const isMonthDisabled = !!((min && monthValue < min) || (max && monthValue > max));
                        return (
                            <button
                                key={m}
                                type="button"
                                disabled={isMonthDisabled}
                                onClick={(e) => { e.preventDefault(); onChange?.(monthValue); setOpen(false); }}
                                className={cn(
                                    "py-2 text-sm text-center cursor-pointer rounded-md transition-colors",
                                    isSelected ? "bg-foreground-white/20 text-foreground-white font-medium" : "text-foreground-white hover:bg-foreground-white/10",
                                    isMonthDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent"
                                )}
                            >
                                {m}
                            </button>
                        );
                    })}
                </div>
                <div className="flex justify-between items-center pt-3 mt-2 border-t border-border">
                    <button type="button" onClick={(e) => { e.preventDefault(); onChange?.(''); setOpen(false); }} className="text-sm text-placeholder cursor-pointer hover:text-foreground-white transition-colors">Clear</button>
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                        const now = new Date();
                        onChange?.(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
                        setOpen(false);
                    }} className="text-sm text-placeholder cursor-pointer hover:text-foreground-white transition-colors">This month</button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
