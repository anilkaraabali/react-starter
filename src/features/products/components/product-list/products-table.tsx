import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { DataTable } from '@/components/organisms/data-table/data-table';
import type { DataTablePagination } from '@/components/organisms/data-table/data-table.types';
import { KNOWN_LOCAL_STORAGE_KEYS } from '@/config/known-local-storage-keys.constants';
import { createProductsTableColumns } from '@/features/products/components/product-list/products-table-columns';
import type { Product } from '@/features/products/types/product.types';

type ProductsTableProps = {
  isLoading: boolean;
  onDeleteClick: (product: Product) => void;
  onRowAction?: (id: string) => void;
  pagination: DataTablePagination;
  products: Product[];
  toolbar?: ReactNode;
};

export function ProductsTable({
  isLoading,
  onDeleteClick,
  onRowAction,
  pagination,
  products,
  toolbar,
}: ProductsTableProps) {
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
      data={products}
      enableColumnVisibility
      isLoading={isLoading}
      onRowAction={onRowAction}
      pagination={pagination}
      toolbar={toolbar}
    />
  );
}
