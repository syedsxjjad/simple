import React from 'react';
import { cn } from '@/utils/utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  trackClassName?: string;
  ariaLabel?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
  trackClassName,
  ariaLabel = 'Toggle',
}) => {
  return (
    <label
      className={cn(
        'relative inline-flex items-center cursor-pointer',
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
        aria-label={ariaLabel}
      />
      <div
        className={cn(
          'w-11 h-6 bg-placeholder rounded-full peer',
          'peer-checked:after:translate-x-full',
          'peer-checked:after:border-white',
          "after:content-[''] after:absolute after:top-0.5",
          'after:left-[2px] after:bg-white after:border-placeholder',
          'after:border after:rounded-full after:h-5 after:w-5',
          'after:transition-all peer-checked:bg-secondary-light',
          'peer-disabled:opacity-60 peer-disabled:cursor-not-allowed',
          trackClassName
        )}
      />
    </label>
  );
};
