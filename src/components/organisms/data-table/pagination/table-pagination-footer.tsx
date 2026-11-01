import { Pagination, Table } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';
import { TablePaginationSummary } from '@/components/organisms/data-table/pagination/table-pagination-summary';
import { TablePageSizeSelect } from './table-page-size-select';
import { buildPaginationPages } from './table-pagination.utils';

type TablePaginationFooterProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function TablePaginationFooter({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
  total,
  totalPages,
}: TablePaginationFooterProps) {
  const { t } = useLingui();
  const pages = useMemo(
    () => buildPaginationPages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (total === 0) {
    return null;
  }

  return (
    <Table.Footer className='mt-auto'>
      <Pagination
        className='flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between'
        size='sm'
      >
        <Pagination.Summary>
          <TablePaginationSummary
            page={currentPage}
            pageSize={pageSize}
            total={total}
          />
        </Pagination.Summary>
        <div className='flex flex-wrap items-center justify-between gap-2 sm:justify-end'>
          <TablePageSizeSelect
            onPageSizeChange={onPageSizeChange}
            pageSize={pageSize}
          />
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={currentPage === 1}
                onPress={() => onPageChange(Math.max(1, currentPage - 1))}
              >
                <Pagination.PreviousIcon />
                <span>{t`Previous`}</span>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) =>
              typeof p === 'string' ? (
                <Pagination.Item key={p}>
                  <Pagination.Ellipsis />
                </Pagination.Item>
              ) : (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === currentPage}
                    onPress={() => onPageChange(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={currentPage === totalPages}
                onPress={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
              >
                <span>{t`Next`}</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </div>
      </Pagination>
    </Table.Footer>
  );
}
