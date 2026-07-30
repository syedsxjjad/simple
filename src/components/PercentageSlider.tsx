import { Typography } from '@/components/Form/Typography';
import { cn, formatPercentage, roundToTwo } from '@/utils/utils';

interface GoldPercentageSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
    disabled?: boolean;
}

const PercentageSlider = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    className,
    disabled,
}: GoldPercentageSliderProps) => {
    const clampedValue = Math.min(max, Math.max(min, value));
    const range = max - min || 1;
    const progress = ((clampedValue - min) / range) * 100;

    return (
        <div className={cn('flex min-w-0 items-center gap-4', disabled && 'opacity-50 pointer-events-none', className)}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={clampedValue}
                onChange={e => onChange(roundToTwo(Number(e.target.value)))}
                disabled={disabled}
                className="gold-percentage-slider min-w-0 flex-1"
                style={{
                    background: `linear-gradient(to right, rgba(245, 208, 156, 0.44) 0%, #F5D09C ${progress}%, #0E1527 ${progress}%, #0E1527 100%)`,
                }}
            />
            <Typography className="text-xs! font-normal! leading-none! text-secondary-light tabular-nums">
                {formatPercentage(roundToTwo(clampedValue))}%
            </Typography>
        </div>
    );
};

export default PercentageSlider;
