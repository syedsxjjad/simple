import React, { useEffect, useRef, useState } from 'react';
import 'react-international-phone/style.css';
import { useFormContext } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/utils';

interface PhoneInputFieldProps {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
    defaultCountry?: string;
    maxLength?: number;
    labelClassName?: string;
    appearance?: 'dark' | 'light';
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
    name,
    label,
    className = '',
    defaultCountry = 'US',
    placeholder = 'Enter mobile number',
    required = false,
    labelClassName,
    appearance = 'dark',
}) => {
    const { control } = useFormContext();
    const [openUpwards, setOpenUpwards] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isLightAppearance = appearance === 'light';
    const fieldHeightClass = isLightAppearance
        ? 'h-12 min-h-12 max-h-12 md:h-[50px] md:min-h-[50px] md:max-h-[50px]'
        : 'h-12 min-h-12 max-h-12 md:h-14 md:min-h-14 md:max-h-14';

    useEffect(() => {
        const checkPosition = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                setOpenUpwards(spaceBelow < 350);
            }
        };

        checkPosition();
        window.addEventListener('scroll', checkPosition, true);
        window.addEventListener('resize', checkPosition);

        return () => {
            window.removeEventListener('scroll', checkPosition, true);
            window.removeEventListener('resize', checkPosition);
        };
    }, []);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="flex h-20 gap-1 space-y-0 flex-col justify-start">
                    {label ? (
                        <div className="mb-2 flex min-h-5 items-center gap-1">
                            <FormLabel
                                className={cn(
                                    isLightAppearance
                                        ? 'text-base! font-medium text-sec-text! tracking-[0.942px]!'
                                        : 'text-sm font-medium text-foreground-white!',
                                    labelClassName,
                                )}
                            >
                                {label}
                            </FormLabel>
                            {required ? <span className="pl-0.5 text-sm leading-none text-required-red">*</span> : null}
                        </div>
                    ) : null}
                    <FormControl>
                        <div
                            ref={containerRef}
                            className={cn(
                                'react-international-phone-container relative flex w-full items-center transition-all duration-200',
                                fieldHeightClass,
                                '[&_.react-international-phone-country-selector-button__country-name]:hidden',
                                '[&_.react-international-phone-input-container]:flex [&_.react-international-phone-input-container]:h-full [&_.react-international-phone-input-container]:max-h-full [&_.react-international-phone-input-container]:w-full [&_.react-international-phone-input-container]:items-center',
                                isLightAppearance
                                    ? 'rounded-xl border border-input-border bg-input-bg'
                                    : 'rounded-2xl border border-border bg-primary',
                                fieldState.error && 'border-destructive focus-within:border-destructive',
                                className,
                            )}
                        >
                            <PhoneInput
                                className={cn('flex w-full items-center', fieldHeightClass)}
                                value={field.value || ''}
                                placeholder={placeholder}
                                defaultCountry={defaultCountry}
                                onChange={(phone) => field.onChange(phone)}
                                inputClassName={cn(
                                    'w-full min-w-0 !h-auto !max-h-full !min-h-0 !border-none !bg-transparent !py-0 !pl-0 !pr-4 !text-base !leading-5 !shadow-none !outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                                    isLightAppearance
                                        ? '!text-sec-text !placeholder:text-sec-text/50'
                                        : '!text-placeholder !placeholder:text-placeholder/30',
                                )}
                                countrySelectorStyleProps={{
                                    buttonClassName: cn(
                                        '!flex !h-auto !max-h-full !min-h-0 !w-auto !items-center !justify-center !self-center !border-none !px-4 !py-0 !transition-colors',
                                        isLightAppearance
                                            ? '!rounded-l-xl !border-r !border-input-border !bg-transparent !text-sec-text hover:!bg-input-bg'
                                            : '!rounded-l-2xl !border-r !border-border !bg-transparent !text-placeholder hover:!bg-white/5',
                                    ),
                                    dropdownStyleProps: {
                                        className: cn(
                                            '!z-[100] min-w-[300px] max-h-[300px] overflow-y-auto custom-scrollbar !rounded-xl !border !shadow-md !outline-none',
                                            '[&_li]:cursor-pointer! [&_li]:px-4! [&_li]:py-2.5! [&_li]:transition-colors!',
                                            isLightAppearance
                                                ? '!border-input-border !bg-foreground-white !text-sec-text [&_li:hover]:bg-input-bg! [&_li[data-selected="true"]]:bg-input-bg! [&_.react-international-phone-country-selector-dropdown__dial-code]:text-sec-text/60!'
                                                : '!border-border !bg-background !text-placeholder [&_li:hover]:bg-primary! [&_li:hover]:text-foreground-white! [&_li[data-selected="true"]]:bg-placeholder! [&_li[data-selected="true"]]:text-placeholder! [&_.react-international-phone-country-selector-dropdown__dial-code]:text-placeholder/60! [&_li:hover_.react-international-phone-country-selector-dropdown__dial-code]:text-foreground-placeholder!',
                                            openUpwards ? '!bottom-full !top-auto !-translate-y-3.5' : '!top-full !bottom-auto !translate-y-3.5',
                                        ),
                                    },
                                }}
                            />
                        </div>
                    </FormControl>
                    <div className="-mt-0.5 flex min-h-5 items-start">
                        <FormMessage className="text-[10px] font-medium sm:text-xs" />
                    </div>
                </FormItem>
            )}
        />
    );
};

export default PhoneInputField;
