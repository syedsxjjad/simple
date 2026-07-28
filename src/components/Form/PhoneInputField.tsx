import React, { useEffect, useRef, useState } from 'react';
import 'react-international-phone/style.css';
import { useFormContext } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
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
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
    name,
    label,
    className = '',
    defaultCountry = 'gb',
    placeholder = 'Enter mobile number',
    required = false,
    labelClassName,
}) => {
    const { control } = useFormContext();
    const [openUpwards, setOpenUpwards] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkPosition = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - rect.bottom;
                // If space below is less than 350px, open upwards
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
                <FormItem className="h-20 flex flex-col justify-start">
                    {label && (
                        <FormLabel className={cn('text-sm font-medium text-foreground-white! uppercase', labelClassName)}>
                            {label} {required && <span className="text-required-red pl-0.5">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div
                            ref={containerRef}
                            className={cn(
                                "relative w-full pl-1.5 react-international-phone-container flex items-center border border-border rounded-2xl transition-all duration-200 bg-primary h-12! md:h-14! [&_.react-international-phone-country-selector-button__country-name]:hidden",
                                fieldState.error && "border-destructive focus-within:border-destructive",
                                className
                            )}
                        >
                            <PhoneInput
                                className="w-full"
                                value={field.value || ''}
                                placeholder={placeholder}
                                defaultCountry={defaultCountry}
                                onChange={phone => field.onChange(phone)}
                                inputClassName={cn(
                                    "!h-12 md:!h-14 !text-placeholder w-full min-w-0 !border-none !bg-transparent !pl-0 !pr-4 !text-base !shadow-none !outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 !placeholder:text-placeholder/30"
                                )}
                                countrySelectorStyleProps={{
                                    buttonClassName: cn(
                                        '!h-12 md:!h-14 !bg-transparent !border-none !border-r !border-border !px-4 !text-placeholder !hover:bg-white/5 !transition-colors !flex !items-center !justify-center !rounded-l-2xl !w-auto',
                                    ),
                                    dropdownStyleProps: {
                                        className: cn(
                                            '!bg-background !border !border-border !rounded-xl !text-placeholder !shadow-md !outline-none z-[100] min-w-[300px] max-h-[300px] overflow-y-auto custom-scrollbar',
                                            '[&_li:hover]:bg-primary! [&_li:hover]:text-foreground-white!',
                                            '[&_li[data-selected="true"]]:bg-placeholder! [&_li[data-selected="true"]]:text-placeholder!',
                                            '[&_li]:px-4! [&_li]:py-2.5! [&_li]:cursor-pointer! [&_li]:transition-colors!',
                                            '[&_.react-international-phone-country-selector-dropdown__dial-code]:text-placeholder/60! [&_li:hover_.react-international-phone-country-selector-dropdown__dial-code]:text-foreground-placeholder!',
                                            openUpwards ? '!bottom-full !top-auto !mb-2' : '!top-full !bottom-auto !mt-2'
                                        ),
                                    },
                                }}
                            />
                        </div>
                    </FormControl>
                    {fieldState.error && <p className="text-destructive -mt-1.5 text-xs">{fieldState.error.message}</p>}
                </FormItem>
            )}
        />
    );
};

export default PhoneInputField;
