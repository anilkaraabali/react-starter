import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Filters } from '@/components/organisms/filters/filters';
import { RouteFilterProvider } from '@/components/organisms/filters/stores/route-filter-provider';
import {
  type GetProductsQuery,
  useProducts,
} from '@/features/products/api/get-products';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductsTable } from '@/features/products/components/product-list/products-table';
import {
  getProductsFilterFields,
  INITIAL_PRODUCTS_SEARCH_STATE,
} from '@/features/products/config/products-filter.config';
import type { Product } from '@/features/products/types/product.types';
import { useResponsivePageSize } from '@/hooks/use-responsive-page-size';

export function ProductListView() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as GetProductsQuery;
  const responsivePageSize = useResponsivePageSize();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filterFields = useMemo(() => getProductsFilterFields(), []);

  const params: GetProductsQuery = {
    ...INITIAL_PRODUCTS_SEARCH_STATE,
    pageSize: responsivePageSize,
    ...searchParams,
  };

  const { data, isLoading } = useProducts({ params });

  return (
    <RouteFilterProvider
      fields={filterFields}
      initialState={INITIAL_PRODUCTS_SEARCH_STATE}
      navigate={navigate}
      search={params}
    >
      <ProductsTable
        data={data}
        isLoading={isLoading}
        onDeleteClick={(product) => setProductToDelete(product)}
        onRowAction={(id) => {
          void navigate({
            params: { productId: id },
            to: '/products/$productId',
          });
        }}
        toolbar={(endActions) => <Filters endActions={endActions} />}
      />

      <DeleteProductModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        product={productToDelete}
      />
    </RouteFilterProvider>
  );
}
