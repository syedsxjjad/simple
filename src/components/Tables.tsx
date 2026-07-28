import React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Database } from 'lucide-react';
import { Typography, Variant } from './Form/Typography';
import { cn } from '@/utils/utils';

interface DataTableProps<TData, TValue> {
  title?: string;
  titleVariant?: Variant;
  titleClassName?: string;
  actions?: React.ReactNode;
  actionsClassName?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
}

export function Tables<TData, TValue>({
  title,
  titleVariant = 'h4',
  titleClassName,
  actions,
  actionsClassName,
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No results.',
  className,
  headerClassName,
  cellClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  return (
    <div className={cn('w-full border border-border-grey rounded-2xl bg-foreground-white overflow-hidden', className)}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between border-b border-border-grey p-0">
          {title && (
            <Typography
              variant={titleVariant}
              className={cn('font-semibold text-foreground-black break-words', titleClassName)}
            >
              {title}
            </Typography>
          )}
          {actions && <div className={cn(actionsClassName)}>{actions}</div>}
        </div>
      )}

      <div className="-mx-4 sm:mx-0 overflow-x-auto w-[100vw] sm:w-full">
        <div className="min-w-max sm:min-w-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="border-b border-border-grey">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'py-4 px-5 font-bold text-sm text-foreground-black bg-background whitespace-nowrap border-r border-border-grey last:border-r-0',
                        headerClassName
                      )}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-foreground-black border-t border-border-grey"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className="border-b border-border-grey transition-colors hover:bg-primary/10"
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'py-3 px-5 text-sm text-foreground-black whitespace-nowrap border-r border-border-grey last:border-r-0',
                          cellClassName
                        )}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground border-t border-border-grey"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Database className="h-6 w-6" />
                      <span>{emptyMessage}</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
