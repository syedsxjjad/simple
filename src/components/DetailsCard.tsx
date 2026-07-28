import React from 'react';

import { Typography } from '@/components/Form/Typography';
import { cn } from '@/utils/utils';
import Card from './Cards';

export interface DetailItem {
  label: string;
  value: React.ReactNode;
  /** Override label styles (e.g. lowercase `sex`) */
  labelClassName?: string;
}

interface DetailsCardProps {
  title: string;
  items: DetailItem[];
  columns?: 1 | 2 | 3;
  className?: string;
  titleClassName?: string;
  subtitle?: string;
  subClassName?: string;
  subTitleClassName?: string;
  /** Right side of the header row (e.g. Edit button) */
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  children1?: React.ReactNode;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  title,
  items,
  columns = 2,
  subtitle,
  className = '',
  subTitleClassName = '',
  titleClassName = '',
  subClassName = '',
  headerRight,
  children,
  children1,
}) => {
  const gridCols =
    columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : '';

  return (
    <Card className={cn('border-border p-5 sm:p-6 md:p-6', className)}>
      <div className={cn('flex flex-col gap-6', subClassName)}>
        <div className="flex !flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <Typography
              className={cn(
                'font-sora !text-xl !font-semibold !uppercase text-foreground-white wrap-break-word whitespace-normal',
                titleClassName
              )}
            >
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                className={cn(
                  'wrap-break-word text-base! font-semibold! text-foreground-white whitespace-normal',
                  subTitleClassName
                )}
              >
                {subtitle}
              </Typography>
            ) : null}
          </div>
          <div>
            {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
          </div>
        </div>

        {children ? <div>{children}</div> : null}

        <div className={cn('grid grid-cols-1 gap-x-10 gap-y-8', gridCols)}>
          {items.map((item, index) => (
            <div key={index} className="flex min-w-0 flex-col gap-1.5">
              <Typography
                className={cn(
                  'wrap-break-word !text-sm !uppercase font-normal! tracking-[0.08em] text-placeholder whitespace-normal',
                  item.labelClassName
                )}
              >
                {item.label}
              </Typography>
              <div className="!text-base !font-normal wrap-break-word text-foreground-white whitespace-normal">
                {item.value ?? '—'}
              </div>
            </div>
          ))}
        </div>

        {children1 ? <div>{children1}</div> : null}
      </div>
    </Card>
  );
};

export default DetailsCard;
