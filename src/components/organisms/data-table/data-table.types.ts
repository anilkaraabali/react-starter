import type { Selection } from '@heroui/react';
import type { ReactNode } from 'react';

type TableCellOverflow = 'nowrap' | 'truncate' | 'wrap';

export type TableColumnDef<TRow, TColumnId extends string = string> = {
  cell: (row: TRow) => ReactNode;
  /** Resolved at render time so locale switches stay fresh. */
  header: () => string;
  /**
   * When false, TableColumnFilter cannot hide this column.
   * Defaults to `false` for row-header columns, otherwise `true`.
   */
  hideable?: boolean;
  id: TColumnId;
  isRowHeader?: boolean;
  /**
   * Optional custom label used in TableColumnFilter popover.
   * Falls back to `header()` if not provided.
   */
  label?: () => string;
  /** Cell text layout. When omitted, the cell keeps native table behaviour. */
  overflow?: TableCellOverflow;
};

export type TableColumnVisibility<TColumnId extends string> = Record<
  TColumnId,
  boolean
>;

export type DataTableSelection<TRow> = {
  getRowLabel: (row: TRow) => string;
  onSelectionChange: (keys: Selection) => void;
  selectedKeys: Selection;
};

export type DataTablePagination = {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
