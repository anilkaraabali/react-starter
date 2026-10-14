import type { TableColumnDef } from '../data-table.types';

export function isTableColumnHideable<TRow, TColumnId extends string>(
  column: Pick<TableColumnDef<TRow, TColumnId>, 'hideable' | 'isRowHeader'>
): boolean {
  return column.hideable ?? !column.isRowHeader;
}
