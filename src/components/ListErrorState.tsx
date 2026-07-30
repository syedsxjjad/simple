import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/utils';
import Card from './Cards';
import { Typography } from './Form/Typography';

interface ListErrorStateProps {
  message: string;
  className?: string;
  backToHref?: string;
  backToLabel?: string;
}

export const ListErrorState: React.FC<ListErrorStateProps> = ({
  message,
  className,
  backToHref,
  backToLabel,
}) => {
  const card = (
    <Card
      className={cn(
        'h-[40vh] flex items-center border border-input-border shadow-none rounded-2xl justify-center',
        className
      )}
    >
      <Typography className="!text-base text-destructive">{message}</Typography>
    </Card>
  );

  if (backToHref && backToLabel) {
    return (
      <div className="space-y-2 py-4">
        <Link
          to={backToHref}
          className="text-placeholder underline text-sm inline-block"
        >
          {backToLabel}
        </Link>
        {card}
      </div>
    );
  }

  return card;
};

interface ListEmptyStateProps {
  message: string;
  className?: string;
  textClassName?: string;
}

/** Shown when a list has no data (e.g. no teachers assigned, no students). */
export const ListEmptyState: React.FC<ListEmptyStateProps> = ({ message, className, textClassName }) => (
  <Card
    className={cn(
      'min-h-[200px] flex items-center justify-center rounded-2xl',
      className
    )}
  >
    <Typography className={cn("!text-base text-placeholder text-center", textClassName)}>
      {message}
    </Typography>
  </Card>
);
