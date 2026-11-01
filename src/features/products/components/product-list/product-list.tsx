import { useLingui } from '@lingui/react/macro';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import {
  type GetProductsQuery,
  useProducts,
} from '@/api/endpoints/products/get-products';
import type { ProductDto } from '@/api/models/products/product-dto';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { Filters } from '@/components/organisms/filters/filters';
import {
  FilterProvider,
  useRouteFilterState,
} from '@/components/organisms/filters/stores/filter-provider';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { DeleteProductModal } from '@/features/products/components/delete-product-modal';
import { createProductsTableColumns } from '@/features/products/components/product-list/products-table-columns';
import {
  getProductsFilterFields,
  initialProductsFiltersState,
} from '@/features/products/config/products-filter-config';
import { useResponsivePageSize } from '@/hooks/use-responsive-page-size';

export function ProductList() {
  const { t } = useLingui();
  const navigate = useNavigate();
  const search = useSearch({ from: '/_admin/products/' });
  const responsivePageSize = useResponsivePageSize();
  const [productToDelete, setProductToDelete] = useState<ProductDto | null>(
    null
  );

  const filterFields = useMemo(() => getProductsFilterFields(), []);

  const params: GetProductsQuery = {
    ...initialProductsFiltersState,
    ...search,
    pageSize: search.pageSize ?? responsivePageSize,
  };

  const productsQuery = useProducts({
    params,
    queryConfig: { placeholderData: (previousData) => previousData },
  });

  const filters = useRouteFilterState({
    initialState: initialProductsFiltersState,
    navigate,
    search,
  });
  const { getFilterValue, setFilterValue, setPage } = filters;

  const columns = useMemo(
    () => createProductsTableColumns(t, setProductToDelete),
    [t]
  );

  return (
    <FilterProvider fields={filterFields} value={filters}>
      <DataTable
        columnStorageKey={LOCAL_STORAGE_KEYS.COLUMNS.PRODUCTS}
        columns={columns}
        data={productsQuery.data?.data ?? []}
        enableColumnVisibility
        isLoading={productsQuery.isPending}
        onRowAction={(id) => {
          void navigate({
            params: { productId: id },
            to: '/products/$productId',
          });
        }}
        pagination={{
          onPageChange: setPage,
          onPageSizeChange: (pageSize) => setFilterValue('pageSize', pageSize),
          page: getFilterValue('page') ?? 1,
          pageSize: params.pageSize ?? responsivePageSize,
          total: productsQuery.data?.meta.total ?? 0,
          totalPages: productsQuery.data?.meta.totalPages ?? 1,
        }}
        toolbar={(endActions) => <Filters endActions={endActions} />}
      />

      <DeleteProductModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        product={productToDelete}
      />
    </FilterProvider>
  );
}
