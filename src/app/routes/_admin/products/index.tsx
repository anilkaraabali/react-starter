import { msg } from '@lingui/core/macro';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { getProductsQuerySchema } from '@/features/products/api/get-products';
import { ProductListView } from '@/features/products/components/product-list/product-list-view';
import { INITIAL_PRODUCTS_SEARCH_STATE } from '@/features/products/config/products-filter.config';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Products`),
  },
];

export const Route = createFileRoute('/_admin/products/')({
  component: ProductListView,
  loader: () => ({ meta }),
  search: {
    middlewares: [stripSearchParams(INITIAL_PRODUCTS_SEARCH_STATE)],
  },
  validateSearch: zodValidator(getProductsQuerySchema),
});
