import { cn } from '@/utils/utils';
import { LucideIcon } from 'lucide-react';
import { Typography } from './Form/Typography';

interface InfoItemProps {
  text: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function InfoItem({ icon: Icon, text, className, iconClassName, textClassName }: InfoItemProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Icon className={cn('w-4 h-4 text-primary', iconClassName)} />
      <Typography className={cn('!text-xs !text-mute-foreground', textClassName)}>{text}</Typography>
    </div>
  );
}
