import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils/utils';

export interface AppTooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    className?: string;
    delayDuration?: number;
    disabled?: boolean;
    align?: 'start' | 'center' | 'end';
    showArrow?: boolean;
    arrowClassName?: string;
    /** `light` matches admin cards/forms; `dark` for navy surfaces. */
    variant?: 'light' | 'dark';
}

const tooltipVariants = {
    light: {
        content:
            'rounded-xl border border-input-border bg-foreground-white px-3 py-2 text-xs font-normal leading-5 text-sec-text shadow-lg',
        arrow: 'fill-foreground-white',
    },
    dark: {
        content:
            'rounded-lg bg-secondary-dark-bg1 px-3 py-1.5 text-xs font-normal leading-5 text-foreground-white shadow-md [&_*]:!text-foreground-white [&_*]:!text-xs [&_*]:!font-normal',
        arrow: 'fill-secondary-dark-bg1',
    },
} as const;

export function AppTooltip({
    content,
    children,
    side = 'top',
    sideOffset = 6,
    className,
    delayDuration = 300,
    disabled = false,
    align = 'center',
    showArrow = true,
    arrowClassName,
    variant = 'light',
}: AppTooltipProps) {
    const styles = tooltipVariants[variant];

    return (
        <TooltipPrimitive.Provider delayDuration={delayDuration}>
            <TooltipPrimitive.Root open={disabled ? false : undefined}>
                <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
                {!disabled && (
                    <TooltipPrimitive.Portal>
                        <TooltipPrimitive.Content
                            side={side}
                            sideOffset={sideOffset}
                            align={align}
                            className={cn(
                                'z-[9999] max-w-[min(280px,calc(100vw-32px))] overflow-visible break-words font-manrope whitespace-pre-line',
                                styles.content,
                                className,
                            )}
                        >
                            {content}
                            {showArrow && (
                                <TooltipPrimitive.Arrow
                                    className={cn(styles.arrow, arrowClassName)}
                                    width={10}
                                    height={5}
                                />
                            )}
                        </TooltipPrimitive.Content>
                    </TooltipPrimitive.Portal>
                )}
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
