import { Checkbox, cn, Spinner, Table } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { ReactNode } from 'react';

import type {
  DataTablePagination,
  DataTableSelection,
  TableColumnDef,
} from './data-table.types';
import { TablePaginationFooter } from './pagination/table-pagination-footer';
import { TableEmptyState } from './table-empty-state';
import { TableToolbar } from './table-toolbar';

const preventRowSelection = {
  onClick: (event: React.MouseEvent) => event.stopPropagation(),
  onPointerDown: (event: React.PointerEvent) => event.stopPropagation(),
};

type DataTableViewProps<TRow, TColumnId extends string = string> = {
  activeColumns: readonly TableColumnDef<TRow, TColumnId>[];
  columnFilterNode?: ReactNode;
  data: TRow[];
  isLoading: boolean;
  onRowAction?: (id: string) => void;
  pagination?: DataTablePagination;
  selection?: DataTableSelection<TRow>;
  toolbar?: ReactNode;
};

export function DataTableView<
  TRow extends { id: string },
  TColumnId extends string = string,
>({
  activeColumns,
  columnFilterNode,
  data,
  isLoading,
  onRowAction,
  pagination,
  selection,
  toolbar,
}: DataTableViewProps<TRow, TColumnId>) {
  const { _ } = useLingui();
  const hasResults = data.length > 0;

  return (
    <div className='flex flex-col gap-4'>
      <TableToolbar columnFilter={columnFilterNode} toolbar={toolbar} />

      <Table
        aria-busy={isLoading}
        className={cn(
          'min-h-80.25 transition-opacity',
          isLoading && hasResults && 'opacity-60'
        )}
      >
        <Table.ScrollContainer>
          <Table.Content
            aria-label={_(msg`Data table`)}
            className={cn({
              'h-full': !hasResults,
            })}
            onRowAction={
              onRowAction ? (key) => onRowAction(String(key)) : undefined
            }
            onSelectionChange={selection?.onSelectionChange}
            selectedKeys={selection?.selectedKeys}
            selectionMode={selection ? 'multiple' : undefined}
          >
            <Table.Header>
              {selection ? (
                <Table.Column>
                  <Checkbox
                    aria-label={_(msg`Select all rows`)}
                    slot='selection'
                  >
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Content>
                  </Checkbox>
                </Table.Column>
              ) : null}
              {activeColumns.map((column) => (
                <Table.Column
                  id={column.id}
                  isRowHeader={column.isRowHeader}
                  key={column.id}
                >
                  {column.header()}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body
              dependencies={[activeColumns]}
              items={data}
              renderEmptyState={() =>
                isLoading ? (
                  <div className='flex items-center justify-center py-12'>
                    <Spinner />
                  </div>
                ) : (
                  <TableEmptyState />
                )
              }
            >
              {(item) => (
                <Table.Row
                  className={cn({ 'cursor-pointer': !!onRowAction })}
                  id={item.id}
                >
                  {selection ? (
                    <Table.Cell className='w-12' {...preventRowSelection}>
                      <Checkbox
                        aria-label={selection.getRowLabel(item)}
                        slot='selection'
                        variant='secondary'
                      >
                        <Checkbox.Content>
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                        </Checkbox.Content>
                      </Checkbox>
                    </Table.Cell>
                  ) : null}
                  {activeColumns.map((column) => (
                    <Table.Cell key={column.id}>{column.cell(item)}</Table.Cell>
                  ))}
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        {pagination ? (
          <TablePaginationFooter
            currentPage={pagination.page}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
            pageSize={pagination.pageSize}
            total={pagination.total}
            totalPages={pagination.totalPages}
          />
        ) : null}
      </Table>
    </div>
  );
}
