import { msg } from '@lingui/core/macro';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  getProductsQueryOptions,
  getProductsQuerySchema,
} from '@/api/endpoints/products/get-products';
import { ContentLayout } from '@/components/templates/content-layout';
import { ProductList } from '@/features/products/components/product-list/product-list';
import { ProductListActions } from '@/features/products/components/product-list/product-list-actions';
import { initialProductsFiltersState } from '@/features/products/config/products-filter-config';
import { getResponsivePageSize } from '@/hooks/use-responsive-page-size';

function ProductsRoute() {
  return (
    <ContentLayout actions={<ProductListActions />}>
      <ProductList />
    </ContentLayout>
  );
}

// biome-ignore-start assist/source/useSortedKeys: `loaderDeps` must precede `loader` so TypeScript infers `deps`.
export const Route = createFileRoute('/_admin/products/')({
  component: ProductsRoute,
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) => {
    void queryClient.query({
      ...getProductsQueryOptions({
        ...initialProductsFiltersState,
        ...deps,
        pageSize: deps.pageSize ?? getResponsivePageSize(),
      }),
      staleTime: 'static',
    });
  },
  search: {
    middlewares: [stripSearchParams(initialProductsFiltersState)],
  },
  staticData: { title: msg`Products` },
  validateSearch: zodValidator(getProductsQuerySchema),
});
// biome-ignore-end assist/source/useSortedKeys: see biome-ignore-start above
