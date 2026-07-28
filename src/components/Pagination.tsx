import React from 'react';

import { cn } from '@/utils/utils';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  totalItems: number;
  className?: string;
  disabled?: boolean;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const navButtonClass =
  'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-0 gold-gradient-button gold-border-gradient text-foreground-black shadow-[inset_5px_-8px_19.5px_#804301] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-light/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:text-foreground-black cursor-pointer';

const Pagination: React.FC<PaginationProps> = ({
  className,
  totalPages,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  disabled = false,
}) => {
  const handleFirst = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(totalPages);
    }
  };

  const isFirstDisabled = currentPage <= 1 || disabled || totalPages <= 1;
  const isPreviousDisabled = currentPage <= 1 || disabled || totalPages <= 1;
  const isNextDisabled = currentPage >= totalPages || disabled || totalPages <= 1;
  const isLastDisabled = currentPage >= totalPages || disabled || totalPages <= 1;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-primary px-5 py-3',
        className
      )}
    >
      <p className="text-sm font-medium text-foreground-white">
        <span>{startItem}-{endItem}</span> <span className="text-placeholder">of {totalItems}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleFirst}
          disabled={isFirstDisabled}
          className={cn(navButtonClass)}
          aria-label="Go to first page"
        >
          <ChevronsLeftIcon className="h-4 w-4" strokeWidth={2.25} />
        </button>

        <button
          type="button"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          className={cn(navButtonClass)}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" strokeWidth={2.25} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          className={cn(navButtonClass)}
          aria-label="Go to next page"
        >
          <ChevronRightIcon className="h-4 w-4" strokeWidth={2.25} />
        </button>

        <button
          type="button"
          onClick={handleLast}
          disabled={isLastDisabled}
          className={cn(navButtonClass)}
          aria-label="Go to last page"
        >
          <ChevronsRightIcon className="h-4 w-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
