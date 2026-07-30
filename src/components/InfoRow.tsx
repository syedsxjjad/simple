import type { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import { LucideIcon } from 'lucide-react';
import { Typography } from './Form/Typography';
import TooltipTypography from './TooltipTypography';

interface InfoItemProps {
  text?: string;
  children?: ReactNode;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  tooltip?: boolean;
}

export default function InfoRow({
  icon: Icon,
  text,
  children,
  className,
  iconClassName,
  textClassName,
  tooltip = false,
}: InfoItemProps) {
  const content = children ?? text;

  return (
    <div className={cn('flex items-center gap-2 min-w-0', className)}>
      <div className={cn(`w-4 h-4 shrink-0`, iconClassName)}>
        <Icon className={cn('w-4 h-4 text-primary', iconClassName)} />
      </div>
      {tooltip ? (
        <TooltipTypography
          tooltipContent={content}
          className={cn('!text-xs !text-mute-foreground', textClassName)}
        >
          {content}
        </TooltipTypography>
      ) : (
        <Typography className={cn('!text-xs !text-mute-foreground', textClassName)}>
          {content}
        </Typography>
      )}
    </div>
  );
}
