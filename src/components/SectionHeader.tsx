import Button from './Form/Button';
import { cn } from '@/utils/utils';
import { Typography } from './Form/Typography';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  className?: string;
  seeAllText?: string;
  onSeeAll?: () => void;
  subtitleText?: string;
  titleClassName?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  subtitleClassName?: string;
  disabled?: boolean;
  titleBack?: string;
  previousText?: string;
  onPrevious?: () => void;
  previousClassName?: string;
}

export default function SectionHeader({
  title,
  leftIcon,
  onSeeAll,
  children,
  className,
  subtitleText,
  titleClassName,
  buttonClassName,
  seeAllText = '',
  titleBack,
  subtitleClassName,
  disabled,
  previousText,
  onPrevious,
  previousClassName,
}: SectionHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className={cn('flex flex-wrap gap-4 justify-between items-center pb-5', className)}>
      <div className="flex flex-col gap-1.5">
        {previousText ? (
          <button
            type="button"
            onClick={() => (onPrevious ? onPrevious() : navigate(-1))}
            className={cn('mb-1 inline-flex cursor-pointer items-center gap-1 text-placeholder transition-colors', previousClassName)}
          >
            <ChevronLeft className="h-4 w-4" />
            <Typography className="text-sm! font-normal!">
              {previousText}
            </Typography>
          </button>
        ) : null}
        {titleBack ?
          <Typography className={cn('font-sora text-sm! font-normal! text-secondary-dark tracking-[0.2em]! break-all', titleClassName)}>
            {titleBack}
          </Typography> : null
        }
        <Typography className={cn('font-sora md:text-4xl! text-2xl font-normal! text-foreground-black break-all', titleClassName)}>
          {title}
        </Typography>
        {subtitleText ? (
          <Typography className={cn('text-base! font-normal! text-placeholder break-all', subtitleClassName)}>
            {subtitleText}
          </Typography>
        ) : null}
      </div>
      {seeAllText && (
        <Button
          className={cn('cursor-pointer text-foreground-black underline break-all text-base! font-normal', buttonClassName)}
          onClick={() => (onSeeAll ? onSeeAll() : navigate(-1))}
          leftIcon={leftIcon}
          disabled={disabled}
        >
          {seeAllText}
        </Button>
      )}
      {children ? <div>{children}</div> : null}
    </div>
  );
}
