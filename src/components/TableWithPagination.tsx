import type { ReactNode } from 'react';

import Card from '@/components/Cards';
import { Typography } from '@/components/Form/Typography';
import Pagination from '@/components/Pagination';
import { ReUsableTable, type TableColumn, type TableProps } from '@/components/ReUsableTable';
import { cn } from '@/utils/utils';

export type TablePaginationConfig = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

export type TableWithPaginationProps<T> = Pick<
  TableProps<T>,
  'columns' | 'data' | 'emptyMessage' | 'isLoading' | 'loadingRows' | 'onRowClick' | 'rowClassName'
> & {
  title: string;
  titleClassName?: string;
  toolbar?: ReactNode;
  pagination: TablePaginationConfig;
  cardClassName?: string;
  headerClassName?: string;
  tableClassName?: string;
  isEqualWidth?: boolean;
  minWidth?: string;
};

export function TableWithPagination<T>({
  title,
  titleClassName,
  toolbar,
  columns,
  data,
  emptyMessage = 'No data found.',
  pagination,
  cardClassName,
  headerClassName,
  tableClassName,
  isLoading,
  loadingRows,
  onRowClick,
  rowClassName,
  isEqualWidth,
  minWidth,
}: TableWithPaginationProps<T>) {
  const { currentPage, totalPages, totalItems, itemsPerPage, onPageChange, disabled, className: paginationClassName } =
    pagination;

  return (
    <div className="space-y-5">
      <Card className={cn('space-y-0 p-0! border-sidebar-border overflow-hidden', cardClassName)}>
        <div className={cn('flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-5 mb-3', headerClassName)}>
          <Typography className={cn('text-foreground-white text-2xl! font-semibold! font-sora', titleClassName)}>
            {title}
          </Typography>
          {toolbar ? (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">{toolbar}</div>
          ) : null}
        </div>

        <ReUsableTable
          columns={columns}
          data={data}
          emptyMessage={emptyMessage}
          isLoading={isLoading}
          loadingRows={loadingRows}
          onRowClick={onRowClick}
          rowClassName={rowClassName}
          isEqualWidth={isEqualWidth}
          minWidth={minWidth}
          className={cn('rounded-none border-0', tableClassName)}
        />

      </Card>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        disabled={disabled}
        className={paginationClassName}
      />
    </div>
  );
}

export type { TableColumn };
