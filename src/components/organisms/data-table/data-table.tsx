import type { ReactNode } from 'react';

import { TableColumnFilter } from './columns/table-column-filter';
import { useTableColumnVisibility } from './columns/use-table-column-visibility';
import type {
  DataTablePagination,
  DataTableSelection,
  TableColumnDef,
} from './data-table.types';
import { DataTableView } from './data-table-view';

type DataTableProps<TRow, TColumnId extends string = string> = {
  columnStorageKey?: string;
  columns: readonly TableColumnDef<TRow, TColumnId>[];
  data: TRow[];
  enableColumnVisibility?: boolean;
  isLoading: boolean;
  onRowAction?: (id: string) => void;
  pagination?: DataTablePagination;
  selection?: DataTableSelection<TRow>;
  toolbar?: ReactNode;
};

export function DataTable<
  TRow extends { id: string },
  TColumnId extends string = string,
>({
  columnStorageKey,
  columns,
  data,
  enableColumnVisibility,
  isLoading,
  onRowAction,
  pagination,
  selection,
  toolbar,
}: DataTableProps<TRow, TColumnId>) {
  const { setColumnVisible, visibility, visibleColumns } =
    useTableColumnVisibility(columns, columnStorageKey);

  const activeColumns = enableColumnVisibility ? visibleColumns : columns;

  const columnFilterNode = enableColumnVisibility ? (
    <TableColumnFilter
      columns={columns}
      onColumnVisibleChange={setColumnVisible}
      visibility={visibility}
    />
  ) : undefined;

  return (
    <DataTableView
      activeColumns={activeColumns}
      columnFilterNode={columnFilterNode}
      data={data}
      isLoading={isLoading}
      onRowAction={onRowAction}
      pagination={pagination}
      selection={selection}
      toolbar={toolbar}
    />
  );
}
