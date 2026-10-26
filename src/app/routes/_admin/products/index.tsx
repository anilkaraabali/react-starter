import { msg } from '@lingui/core/macro';
import type { QueryClient } from '@tanstack/react-query';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { ContentLayout } from '@/components/templates/content-layout';
import {
  type GetProductsQuery,
  getProductsQueryOptions,
  getProductsQuerySchema,
} from '@/features/products/api/get-products';
import { CreateProductButton } from '@/features/products/components/product-list/create-product-button';
import { ProductList } from '@/features/products/components/product-list/product-list';
import { initialProductsFiltersState } from '@/features/products/config/products-filter.config';
import { getResponsivePageSize } from '@/hooks/use-responsive-page-size';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Products`),
  },
];

export const Route = createFileRoute('/_admin/products/')({
  component: ProductsRoute,
  loader: ({
    context: { queryClient },
    deps,
  }: {
    context: { queryClient: QueryClient };
    deps: GetProductsQuery;
  }) => {
    void queryClient.query({
      ...getProductsQueryOptions({
        ...initialProductsFiltersState,
        pageSize: getResponsivePageSize(),
        ...deps,
      }),
      staleTime: 'static',
    });
    return { meta };
  },
  loaderDeps: ({ search }) => search,
  search: {
    middlewares: [stripSearchParams(initialProductsFiltersState)],
  },
  validateSearch: zodValidator(getProductsQuerySchema),
});

function ProductsRoute() {
  return (
    <ContentLayout actions={<CreateProductButton />}>
      <ProductList />
    </ContentLayout>
  );
}
