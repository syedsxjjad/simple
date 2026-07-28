import React from 'react';
import { cn } from '@/utils/utils';

type BadgeProps = {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  showDot?: boolean;
  isShadow?: boolean;
  dotClassName?: string;
  icon?: React.ReactNode;

  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
  xl: 'text-lg px-4 py-2',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  className,
  style,
  showDot = false,
  isShadow = false,
  dotClassName,
  icon,
  size = 'md',
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium bg-transparent border border-secondary-light text-secondary-light w-fit',
        sizeClasses[size],
        className
      )}
      style={style}
    >
      {/* Dot (optional) */}
      {showDot && (
        <span
          className={cn(
            'w-2 h-2 rounded-full bg-secondary-light',
            isShadow && 'badge-dot-shadow badge-dot-blur',
            dotClassName
          )}
        />
      )}

      {/* Icon / Image (optional) */}
      {icon && <span className="flex items-center">{icon}</span>}

      {/* Label */}
      <span>{label}</span>
    </span>
  );
};