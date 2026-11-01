import { useEffect } from 'react';

import type { DataTablePagination } from '@/components/organisms/data-table/data-table.types';

type UseClampPageOptions = {
  isLoading: boolean;
  pagination?: Pick<
    DataTablePagination,
    'onPageChange' | 'page' | 'total' | 'totalPages'
  >;
};

/**
 * Moves back to the last page when the URL points past the end of the data.
 * Waits for loaded data (`total` and `totalPages` are placeholders until then).
 */
export function useClampPage({ isLoading, pagination }: UseClampPageOptions) {
  const onPageChange = pagination?.onPageChange;
  const page = pagination?.page;
  const total = pagination?.total;
  const totalPages = pagination?.totalPages;

  useEffect(() => {
    if (
      isLoading ||
      !onPageChange ||
      page === undefined ||
      !total ||
      !totalPages ||
      page <= totalPages
    ) {
      return;
    }

    onPageChange(totalPages);
  }, [isLoading, onPageChange, page, total, totalPages]);
}
