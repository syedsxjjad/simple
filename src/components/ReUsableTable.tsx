import type { ReactNode } from 'react';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (item: T, index: number) => ReactNode;
  renderHeader?: () => ReactNode;
  className?: string;
  /** Header + cell alignment (default left). Use `right` for e.g. Actions. */
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

function alignClass(align: TableColumn['align']) {
  if (align === 'right') return 'text-right';
  if (align === 'center') return 'text-center';
  return 'text-left';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (item: T, index: number) => void;
  rowClassName?: (item: T, index: number) => string;
  headerClassName?: string;
  isEqualWidth?: boolean;
  minWidth?: string;
}

export function ReUsableTable<T = any>({
  columns,
  data,
  isLoading = false,
  loadingRows = 10,
  emptyMessage = 'No data found',
  className = '',
  onRowClick,
  rowClassName,
  headerClassName = '',
  isEqualWidth = false,
  minWidth,
}: TableProps<T>) {
  const renderLoadingSkeleton = () => {
    return Array.from({ length: loadingRows }).map((_, index) => (
      <tr key={`skeleton-${index}`} className="animate-pulse">
        {columns.map((column, colIndex) => (
          <td
            key={`skeleton-cell-${colIndex}`}
            className={`px-3 sm:px-5 py-3 sm:py-4 whitespace-nowrap text-placeholder/70 ${alignClass(column.align)} ${column.className || ''
              }`}
          >
            <div className="h-4 w-full rounded bg-sidebar-border/60" />
          </td>
        ))}
      </tr>
    ));
  };

  const renderEmptyState = () => (
    <tr>
      <td colSpan={columns.length} className="px-5 py-8 text-center text-placeholder">
        {emptyMessage}
      </td>
    </tr>
  );

  const handleRowClick = (item: T, index: number) => {
    if (onRowClick) {
      onRowClick(item, index);
    }
  };

  return (
    <div className={`mx-0 overflow-x-auto ${className}`}>
      <div className="overflow-x-auto border border-sidebar-border bg-background">
        {/* <table
          className={`w-full ${isEqualWidth ? 'table-fixed' : ''}`}
          style={{ minWidth: minWidth || '100%' }}
        > */}
        <table className="w-full min-w-full">
          <thead className="border-b border-sidebar-border bg-background/50">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`px-3 sm:px-5 py-3 text-sm font-normal text-foreground-white/95 whitespace-nowrap ${alignClass(
                    column.align
                  )} ${headerClassName} ${column.className || ''}`}
                >
                  {column.renderHeader ? column.renderHeader() : column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-sidebar-border bg-primary">
            {isLoading
              ? renderLoadingSkeleton()
              : data.length === 0
                ? renderEmptyState()
                : data.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(item, index)}
                    className={`transition-colors hover:bg-background/35 ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName ? rowClassName(item, index) : ''
                      }`}
                  >
                    {columns.map(column => (
                      <td
                        key={column.key}
                        className={`px-3 sm:px-5 py-4.5 text-sm font-normal text-placeholder break-all ${alignClass(column.align)} ${column.className || ''
                          }`}
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
