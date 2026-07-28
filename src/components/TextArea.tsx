import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utils/utils';
import { FormLabel } from './ui/form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    required?: boolean;
    labelClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, required, className = '', labelClassName = '', ...props }, ref) => {
        return (
            <div className="flex flex-col gap-[6px]">
                <FormLabel className={cn('text-sm font-medium text-foreground-white! uppercase', labelClassName)}>
                    {label} {required && <span className="text-required-red">*</span>}
                </FormLabel>
                <textarea
                    {...props}
                    ref={ref}
                    className={cn(
                        'border border-border font-urbanist font-normal text-sm md:text-base lg:text-[16px] leading-[1.357] px-4 md:px-5 lg:px-[20px] py-3 md:py-4 lg:py-[18px] rounded-lg lg:rounded-[10px] w-full text-placeholder placeholder:text-placeholder/30 focus:outline-none focus:ring-[1px] transition-all bg-primary resize-none',
                        error
                            ? 'border-destructive focus:ring-destructive focus:ring-[0.4px] focus:border-destructive'
                            : 'border-border focus:ring-primary',
                        className
                    )}
                />
                {error && (
                    <p className="font-normal text-xs text-destructive -inset-0 -mt-2">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

