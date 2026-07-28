import React from 'react';
import { ArrowLeft, ChevronLeft, Clock } from 'lucide-react';

import InfoItem from './InfoItem';
import Button from './Form/Button';
import { cn } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';
import { Typography } from './Form/Typography';

interface AuthHeaderProps {
  title: string;
  timeLeft?: string;
  subtitle?: React.ReactNode;
  backLabel?: string;
  className?: string;
  isBackButton?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  backLabel = "Back",
  timeLeft,
  className,
  isBackButton,
  titleClassName,
  subtitleClassName,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {isBackButton ? (
        <Button
          label={backLabel || "Back"}
          type="button"
          variant="ghost"
          onClick={() => navigate(-1)}
          leftIcon={<ArrowLeft className="h-4! w-4!" />}
          buttonTextClassName="text-secondary-light text-sm! font-normal! cursor-pointer"
          className="text-secondary-light !text-sm! p-0! h-auto gap-0"
        />
      ) : null}

      <div className={cn('space-y-2', className)}>
        <Typography className={cn('text-foreground-white font-sora', titleClassName)}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography className={cn('text-placeholder', subtitleClassName)}>
            {subtitle}
          </Typography>
        ) : null}
        {timeLeft ? (
          <InfoItem className="gap-1" iconClassName="text-mute-foreground" icon={Clock} text={timeLeft} />
        ) : null}
      </div>
    </div>
  );
};

export default AuthHeader;
