import { useState, useEffect, type ReactNode } from 'react';
import { ArrowDown, MoreVertical } from 'lucide-react';

import { cn } from '@/utils/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export const DEFAULT_TABLE_HEAD_CELL_CLASS =
  'h-11 border-b bg-appoinment-bg px-6 py-3 align-middle text-xs font-semibold whitespace-nowrap text-tableHeader-text border-tablecard-border';

export const DEFAULT_TABLE_BODY_CELL_CLASS =
  'border-b bg-foreground-white px-6 py-4 align-middle text-sm font-normal text-sec-header-text border-tablecard-border';

export const DEFAULT_TABLE_LOADING_BODY_CELL_CLASS = '!py-4';

const alignCellClass = (align: TableColumn['align']) =>
  cn(
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    (align === 'left' || !align) && 'text-left',
  );

const headCellClass = (align: TableColumn['align'], baseClass?: string, extra?: string) =>
  cn(DEFAULT_TABLE_HEAD_CELL_CLASS, baseClass, alignCellClass(align), extra);

const bodyCellClass = (align: TableColumn['align'], baseClass?: string, extra?: string) =>
  cn(DEFAULT_TABLE_BODY_CELL_CLASS, baseClass, alignCellClass(align), extra);

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (item: T, index: number) => ReactNode;
  renderHeader?: () => ReactNode;
  /** Applied to body cells (`td`). */
  className?: string;
  /** Applied to header cells (`th`). Falls back to `className` when omitted. */
  headClassName?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  /** Sort field sent to `onSortChange` when different from `key`. */
  sortKey?: string;
}

export type TableSortOrder = 'asc' | 'desc';

export interface TableSortConfig {
  key: string;
  order: TableSortOrder;
}

export interface TableAction {
  label: string;
  onClick: () => void;
  className?: string;
  dropdownLabel?: string;
  disabled?: boolean;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  className?: string;
  shellClassName?: string;
  /** Min height for the empty-state body area (e.g. to match loading row height). */
  emptyBodyClassName?: string;
  onRowClick?: (item: T, index: number) => void;
  rowClassName?: (item: T, index: number) => string;
  /** Merged into every header cell (`th`). */
  headCellClassName?: string;
  /** Merged into every body cell (`td`). */
  bodyCellClassName?: string;
  /** @deprecated Use `headCellClassName` — still merged into each `th`. */
  headerClassName?: string;
  isEqualWidth?: boolean;
  minWidth?: string;
  actions?: (item: T) => TableAction[];
  sort?: TableSortConfig;
  onSortChange?: (key: string) => void;
}

export function ReUsableTable<T = any>({
  columns,
  data,
  isLoading = false,
  loadingRows = 6,
  emptyMessage = 'No data found',
  className = '',
  shellClassName = '',
  emptyBodyClassName = '',
  onRowClick,
  rowClassName,
  headCellClassName,
  bodyCellClassName,
  headerClassName = '',
  isEqualWidth,
  minWidth,
  actions,
  sort,
  onSortChange,
}: TableProps<T>) {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    if (openRowIndex !== null) {
      mainEl.style.overflow = 'hidden';
    } else {
      mainEl.style.overflow = '';
    }

    return () => {
      mainEl.style.overflow = '';
    };
  }, [openRowIndex]);

  const effectiveColumns = [...columns];
  if (actions) {
    effectiveColumns.push({
      key: 'action',
      label: 'Action',
      align: 'right',
      className: 'pr-12!',
      render: (item: T, index: number) => (
        <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
          <Popover
            open={openRowIndex === index}
            onOpenChange={(open) => setOpenRowIndex(open ? index : null)}
          >
            <PopoverTrigger asChild>
              <button
                className="text-secondary-light hover:opacity-80 transition-opacity p-1.5 cursor-pointer rounded-full hover:bg-gray-bg"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              side="bottom"
              sideOffset={4}
              className="w-48 bg-foreground-white border border-input-border p-1 rounded-xl shadow-lg z-[9999]"
            >
              <div className="flex flex-col gap-0.5">
                {actions(item).map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={btn.disabled}
                    onClick={() => {
                      if (btn.disabled) return;
                      setOpenRowIndex(null);
                      btn.onClick();
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      btn.disabled
                        ? 'cursor-not-allowed text-stats-sub opacity-60'
                        : 'cursor-pointer text-sidebar-text hover:bg-gray-bg',
                    )}
                  >
                    {btn.dropdownLabel ?? btn.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ),
    });
  }

  const effectiveMinWidth = minWidth ?? (isEqualWidth ? '900px' : '100%');
  const renderLoadingSkeleton = () =>
    Array.from({ length: loadingRows }).map((_, index) => (
      <tr key={`skeleton-${index}`} className="animate-pulse bg-foreground-white">
        {effectiveColumns.map((column, colIndex) => (
          <td
            key={`skeleton-cell-${colIndex}`}
            className={bodyCellClass(
              column.align,
              bodyCellClassName,
              cn(column.className, DEFAULT_TABLE_LOADING_BODY_CELL_CLASS),
            )}
          >
            <div className="mx-auto h-4 w-full max-w-[120px] rounded bg-primary" />
          </td>
        ))}
      </tr>
    ));

  const renderEmptyState = () => (
    <tr className="bg-foreground-white">
      <td colSpan={effectiveColumns.length} className="border-0 p-0">
        <div
          className={cn(
            'flex items-center justify-center px-5 py-10 text-center text-sm text-tableHeader-text',
            emptyBodyClassName,
          )}
        >
          {emptyMessage}
        </div>
      </td>
    </tr>
  );

  const handleRowClick = (item: T, index: number) => {
    onRowClick?.(item, index);
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-xl border bg-foreground-white',
        'border-border',
        shellClassName,
        className,
      )}
    >
      <div className="w-full overflow-x-auto">
        <table
          className={cn('w-full border-collapse', isEqualWidth && 'table-fixed')}
          style={{ minWidth: effectiveMinWidth }}
        >
          <thead>
            <tr className="bg-foreground-white">
              {effectiveColumns.map(column => {
                const sortField = column.sortKey ?? column.key;
                const isSorted = sort?.key === sortField;

                return (
                  <th
                    key={column.key}
                    className={headCellClass(
                      column.align,
                      headCellClassName,
                      cn(headerClassName, column.headClassName ?? column.className),
                    )}
                  >
                    {column.renderHeader ? (
                      column.renderHeader()
                    ) : column.sortable ? (
                      <button
                        type="button"
                        onClick={() => onSortChange?.(sortField)}
                        className="flex items-center gap-1 cursor-pointer select-none"
                      >
                        {column.label}
                        <ArrowDown
                          className={cn(
                            'h-3.5 w-3.5 shrink-0 text-tableHeader-text transition-transform',
                            isSorted && 'text-secondary-light',
                            isSorted && sort.order === 'asc' && 'rotate-180',
                          )}
                        />
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child_td]:border-b-0">
            {isLoading
              ? renderLoadingSkeleton()
              : data.length === 0
                ? renderEmptyState()
                : data.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(item, index)}
                    className={cn(
                      'bg-foreground-white transition-colors hover:bg-[#F9FAFB]',
                      onRowClick && 'cursor-pointer',
                      rowClassName?.(item, index),
                    )}
                  >
                    {effectiveColumns.map(column => (
                      <td
                        key={column.key}
                        className={bodyCellClass(column.align, bodyCellClassName, column.className)}
                      >
                        {column.render ? column.render(item, index) : (item as any)[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
