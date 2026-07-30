import React from 'react';
import { cn } from '@/utils/utils';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'outline'
  | 'ghost';

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';

export type BadgeProps = {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  showDot?: boolean;
  isShadow?: boolean;
  dotClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  labelClassName?: string;
  size?: BadgeSize;
  variant?: BadgeVariant;
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
  xl: 'text-lg px-4 py-2',
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-transparent border border-secondary-light text-secondary-light',
  primary: 'bg-secondary-blue/10 border border-secondary-blue/30 text-secondary-blue',
  secondary: 'bg-secondary-light-bg border border-border-grey text-white',
  success: 'bg-secondary-green/10 border border-secondary-green/30 text-secondary-green',
  warning: 'bg-warning-bg/10 border border-warning-bg/30 text-warning-bg',
  destructive: 'bg-destructive/10 border border-destructive/30 text-destructive',
  info: 'bg-secondary-blue/10 border border-secondary-blue/30 text-secondary-blue',
  outline: 'bg-transparent border border-border text-slate-300',
  ghost: 'bg-transparent border-transparent text-slate-300',
};

const dotVariantClasses: Record<BadgeVariant, string> = {
  default: 'bg-secondary-light',
  primary: 'bg-secondary-blue',
  secondary: 'bg-white',
  success: 'bg-secondary-green',
  warning: 'bg-warning-bg',
  destructive: 'bg-destructive',
  info: 'bg-secondary-blue',
  outline: 'bg-slate-300',
  ghost: 'bg-slate-300',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  className,
  style,
  showDot = false,
  isShadow = false,
  dotClassName,
  icon,
  iconClassName,
  labelClassName,
  size = 'md',
  variant = 'default',
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium w-fit transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      style={style}
    >
      {/* Dot (optional) */}
      {showDot && (
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            dotVariantClasses[variant],
            isShadow && 'badge-dot-shadow badge-dot-blur',
            dotClassName
          )}
        />
      )}

      {/* Icon / Image (optional) */}
      {icon && <span className={cn('flex items-center', iconClassName)}>{icon}</span>}

      {/* Label */}
      <span className={cn('font-medium', labelClassName)}>{label}</span>
    </span>
  );
};