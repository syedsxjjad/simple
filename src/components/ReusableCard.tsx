import React from 'react';
import { Typography } from '@/components/Form/Typography';
import { cn } from '@/utils/utils';
import Cards from './Cards';

interface ReusableCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  contentClassName?: string;
  titleClassName?: string;
  titleStatusClassName?: string;
  subTitle?: React.ReactNode;
  titleSectionClassName?: string;
  firstItem?: React.ReactNode;
  subTitleClassName?: string;
  descriptionClassName?: string;
  onClick?: () => void;
}

const ReusableCard: React.FC<ReusableCardProps> = ({
  title,
  titleClassName = '',
  description,
  className = '',
  children,
  contentClassName = '',
  subTitle,
  firstItem,
  subTitleClassName = '',
  titleStatusClassName = '',
  titleSectionClassName = '',
  descriptionClassName = '',
  onClick,
}) => {
  return (
    <Cards className={cn('flex flex-col', className)} onClick={onClick}>
      <div className={cn('flex flex-wrap justify-between gap-1', contentClassName)}>
        <div className={cn('flex flex-wrap items-center', titleStatusClassName)}>
          {firstItem && <div>{firstItem}</div>}
          <div className={cn("flex flex-col gap-1", titleSectionClassName)}>
            {title && (
            <Typography
              className={cn('!text-base !font-semibold !break-all text-text-primary', titleClassName)}
              >
                {title}
              </Typography>
            )}
            {subTitle && (
            <Typography
              className={cn('!text-base !font-semibold !break-all text-text-primary', subTitleClassName)}
              >
                {subTitle}
              </Typography>
            )}
          </div>

        </div>

        {description &&
          (React.isValidElement(description) ? (
            <div className={cn("!text-sm text-text-secondary", descriptionClassName)}>{description}</div>
          ) : (
            <Typography className={cn("!text-sm text-text-secondary", descriptionClassName)}>
              {description}
            </Typography>
          ))}
      </div>

      {children != null && (
        <div className="flex flex-1 flex-col min-h-0 gap-3 w-full min-w-0">
          {children}
        </div>
      )}
    </Cards>
  );
};

export default ReusableCard;
