import { Checkbox, cn, Spinner, Table, tv } from '@heroui/react';
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
import { TableToolbar, type TableToolbarSlot } from './table-toolbar';

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
  toolbar?: TableToolbarSlot;
  toolbarActions?: ReactNode;
};

const tableCellVariants = tv({
  variants: {
    overflow: {
      nowrap: 'whitespace-nowrap',
      // Truncation lives on the inner span so it can carry a `title`.
      truncate: '',
      wrap: 'whitespace-normal',
    },
  },
});

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
  toolbarActions,
}: DataTableViewProps<TRow, TColumnId>) {
  const { _ } = useLingui();
  const hasResults = data.length > 0;

  return (
    <div className='flex flex-col gap-4'>
      <TableToolbar
        actions={toolbarActions}
        columnFilter={columnFilterNode}
        toolbar={toolbar}
      />

      <Table aria-busy={isLoading} className='min-h-80.25'>
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
                  {activeColumns.map((column) => {
                    const { overflow } = column;
                    const value = column.cell(item);

                    return (
                      <Table.Cell
                        className={tableCellVariants({ overflow })}
                        key={column.id}
                        // Buttons in the actions column must not trigger the row action.
                        {...(column.id === 'actions'
                          ? preventRowSelection
                          : {})}
                      >
                        {overflow === 'truncate' ? (
                          <span
                            className='block max-w-xs truncate'
                            title={
                              typeof value === 'string' ? value : undefined
                            }
                          >
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </Table.Cell>
                    );
                  })}
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
