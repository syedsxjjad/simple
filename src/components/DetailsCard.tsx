import React from 'react';

import { Typography } from '@/components/Form/Typography';
import { cn } from '@/utils/utils';
import Card from './Cards';
import TooltipTypography from './TooltipTypography';

export interface DetailItem {
  label: string;
  value: React.ReactNode;
  /** Override label styles (e.g. lowercase `sex`) */
  labelClassName?: string;
  /** Custom class for the wrapper div, e.g. for grid spanning */
  className?: string;
}

interface DetailsCardProps {
  title: React.ReactNode;
  items: DetailItem[];
  columns?: 1 | 2 | 3;
  className?: string;
  titleClassName?: string;
  subtitle?: string;
  subClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  subTitleClassName?: string;
  titleWithHeaderClassName?: string;
  /** Right side of the header row (e.g. Edit button) */
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  children1?: React.ReactNode;
}

const getOrphanColumnSpanClass = (
  index: number,
  total: number,
  columns: 1 | 2 | 3,
): string => {
  if (columns === 1 || total === 0) return '';

  const remainder = total % columns;
  if (remainder !== 1 || index !== total - 1) return '';

  if (columns === 3) return 'md:col-span-2 lg:col-span-3';
  if (columns === 2) return 'md:col-span-2';
  return '';
};

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
  valueClassName,
  children,
  labelClassName,
  titleWithHeaderClassName,
  children1,
}) => {
  const gridCols =
    columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : '';

  return (
    <Card className={cn('border-input-border p-5 sm:p-6 md:p-6', className)}>
      <div className={cn('flex flex-col gap-5', subClassName)}>
        <div className={cn("flex !flex-wrap items-start justify-between gap-4", titleWithHeaderClassName)}>
          <div className="min-w-0 flex-1 space-y-2">
            <Typography
              className={cn(
                '!text-lg !font-semibold text-header-name wrap-break-word whitespace-normal',
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

        <div className={cn('grid grid-cols-1 gap-x-10 gap-y-5', gridCols)}>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex min-w-0 w-full flex-col gap-1.5',
                getOrphanColumnSpanClass(index, items.length, columns),
                item.className,
              )}
            >
              <TooltipTypography
                className={cn(
                  '!text-sm font-manrope font-medium! tracking-[0.08em] text-sec-text',
                  item.labelClassName,
                  labelClassName,
                )}
              >
                {item.label}
              </TooltipTypography>
              <TooltipTypography className={cn("!text-base !font-normal text-foreground-black", item.value, valueClassName)}>
                {item.value ?? '—'}
              </TooltipTypography>
            </div>
          ))}
        </div>

        {children1 ? <div>{children1}</div> : null}
      </div>
    </Card>
  );
};

export default DetailsCard;
