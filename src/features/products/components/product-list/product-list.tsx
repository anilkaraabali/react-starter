import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Filters } from '@/components/organisms/filters/filters';
import { RouteFilterProvider } from '@/components/organisms/filters/stores/filter-provider';
import {
  type GetProductsQuery,
  useProducts,
} from '@/features/products/api/get-products';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductsTable } from '@/features/products/components/product-list/products-table';
import {
  getProductsFilterFields,
  initialProductsFiltersState,
} from '@/features/products/config/products-filter.config';
import type { Product } from '@/features/products/types/product.types';
import { useResponsivePageSize } from '@/hooks/use-responsive-page-size';

export function ProductList() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as GetProductsQuery;
  const responsivePageSize = useResponsivePageSize();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filterFields = useMemo(() => getProductsFilterFields(), []);

  const params: GetProductsQuery = {
    ...initialProductsFiltersState,
    pageSize: responsivePageSize,
    ...searchParams,
  };

  const { data, isLoading } = useProducts({ params });

  return (
    <RouteFilterProvider
      fields={filterFields}
      initialState={initialProductsFiltersState}
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
