import { useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type {
  TableColumnDef,
  TableColumnVisibility,
} from '../data-table.types';
import { isTableColumnHideable } from './table-columns.utils';

export function useTableColumnVisibility<TRow, TColumnId extends string>(
  columns: readonly TableColumnDef<TRow, TColumnId>[],
  storageKey?: string
) {
  const [stored, setStored] = useLocalStorage<
    Partial<TableColumnVisibility<TColumnId>>
  >(storageKey ?? '__fallback_table_key__', {});
  const [local, setLocal] = useState<Partial<TableColumnVisibility<TColumnId>>>(
    {}
  );

  const activeState = storageKey ? stored : local;
  const setActiveState = storageKey ? setStored : setLocal;

  const visibility = useMemo(
    () => resolveTableColumnVisibility(columns, activeState),
    [columns, activeState]
  );

  const visibleColumns = useMemo(
    () => columns.filter((column) => visibility[column.id]),
    [columns, visibility]
  );

  const setColumnVisible = (id: TColumnId, visible: boolean) => {
    setActiveState((current) => ({ ...current, [id]: visible }));
  };

  return { setColumnVisible, visibility, visibleColumns };
}

/** Columns default to visible; non-hideable columns are always visible. */
function resolveTableColumnVisibility<TRow, TColumnId extends string>(
  columns: readonly TableColumnDef<TRow, TColumnId>[],
  stored: Partial<TableColumnVisibility<TColumnId>>
): TableColumnVisibility<TColumnId> {
  return Object.fromEntries(
    columns.map((column) => [
      column.id,
      !isTableColumnHideable(column) || (stored[column.id] ?? true),
    ])
  ) as TableColumnVisibility<TColumnId>;
}
