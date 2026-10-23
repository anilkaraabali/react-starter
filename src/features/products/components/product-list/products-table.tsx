import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { DataTable } from '@/components/organisms/data-table/data-table';
import type { TableToolbarSlot } from '@/components/organisms/data-table/table-toolbar';
import { useFilter } from '@/components/organisms/filters/stores/filter-provider';
import { KNOWN_LOCAL_STORAGE_KEYS } from '@/config/known-local-storage-keys.constants';
import type {
  GetProductsQuery,
  ProductsResponseDto,
} from '@/features/products/api/get-products';
import { createProductsTableColumns } from '@/features/products/components/product-list/products-table-columns';
import type { Product } from '@/features/products/types/product.types';

type ProductsTableProps = {
  data?: ProductsResponseDto;
  isLoading: boolean;
  onDeleteClick: (product: Product) => void;
  onRowAction?: (id: string) => void;
  toolbar?: TableToolbarSlot;
  toolbarActions?: ReactNode;
};

export function ProductsTable({
  data,
  isLoading,
  onDeleteClick,
  onRowAction,
  toolbar,
  toolbarActions,
}: ProductsTableProps) {
  const { getFilterValue, setFilterValue, setPage } =
    useFilter<GetProductsQuery>();

  const columns = useMemo(
    () =>
      createProductsTableColumns({
        onDeleteClick,
      }),
    [onDeleteClick]
  );

  return (
    <DataTable
      columnStorageKey={KNOWN_LOCAL_STORAGE_KEYS.COLUMNS.PRODUCTS}
      columns={columns}
      data={data?.data ?? []}
      enableColumnVisibility
      isLoading={isLoading}
      onRowAction={onRowAction}
      pagination={{
        onPageChange: setPage,
        onPageSizeChange: (pageSize) => setFilterValue('pageSize', pageSize),
        page: getFilterValue('page') ?? 1,
        pageSize: getFilterValue('pageSize') ?? 10,
        total: data?.meta.total ?? 0,
        totalPages: data?.meta.totalPages ?? 1,
      }}
      toolbar={toolbar}
      toolbarActions={toolbarActions}
    />
  );
}
