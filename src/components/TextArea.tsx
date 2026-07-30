import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utils/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
    labelClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, required, className = '', labelClassName = '', ...props }, ref) => {
        return (
            <div className="flex flex-col gap-[6px]">
                {label && (
                    <div className="flex min-h-5 items-center gap-1 mb-1">
                        <label className={cn('text-base! font-medium text-sec-text! tracking-[0.942px]!', labelClassName)}>
                            {label}
                        </label>
                        {required && <span className="pl-0.5 text-sm leading-none text-required-red">*</span>}
                    </div>
                )}

                <textarea
                    {...props}
                    ref={ref}
                    className={cn(
                        'border border-input-border font-normal text-sm md:text-base lg:text-[16px] leading-[1.357] px-4 md:px-5 lg:px-[14px] py-3 md:py-4 lg:py-[14px] rounded-lg lg:rounded-[10px] w-full text-sec-text placeholder:text-sec-text/50  focus:outline-none focus:border-secondary-light transition-all bg-input-bg resize-none',
                        error
                            ? 'border-destructive focus:border-destructive'
                            : 'border-input-border',
                        className
                    )}
                />
                {error && (
                    <p className="font-normal text-xs text-destructive inset-0 -mt-1.5">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

