import * as React from 'react';
import { Typography } from './Form/Typography';
import { cn } from '@/utils/utils';
import { AppTooltip } from './ui/AddTooltip';

export interface TooltipTypographyProps {
    children: React.ReactNode;
    tooltipContent?: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    disabled?: boolean;
    className?: string;
    wrapperClassName?: string;
    as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function TooltipTypography({
    children,
    tooltipContent,
    side = 'top',
    align = 'start',
    disabled,
    className,
    wrapperClassName,
    as,
}: TooltipTypographyProps) {
    const content = tooltipContent ?? children;
    const [isTruncated, setIsTruncated] = React.useState(false);
    const wrapperRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const child = wrapperRef.current?.firstElementChild as HTMLElement;
        if (!child) return;

        const checkTruncation = () => {
            setIsTruncated(child.scrollWidth > child.clientWidth || child.scrollHeight > child.clientHeight);
        };

        checkTruncation();

        const resizeObserver = new ResizeObserver(() => {
            checkTruncation();
        });
        resizeObserver.observe(child);

        return () => {
            resizeObserver.disconnect();
        };
    }, [children, content]);

    const isDisabled = disabled ?? (!content || !isTruncated);

    return (
        <AppTooltip content={content} side={side} align={align} disabled={isDisabled}>
            <span ref={wrapperRef} className={cn('block min-w-0 flex-1 cursor-default', wrapperClassName)}>
                <Typography
                    className={cn('block text-inherit text-lg font-bold leading-5 line-clamp-1', className)}
                >
                    {children}
                </Typography>
            </span>
        </AppTooltip>
    );
}

export default TooltipTypography;
