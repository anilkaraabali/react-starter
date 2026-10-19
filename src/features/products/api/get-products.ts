import { queryOptions, useQuery } from '@tanstack/react-query';
import type { z } from 'zod';
import { productKeys } from '@/features/products/api/products.keys';
import {
  DEFAULT_PRODUCT_SORT_BY,
  DEFAULT_PRODUCT_SORT_ORDER,
  PRODUCT_SORT_FIELDS,
} from '@/features/products/config/products-filter.config';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  type Product,
} from '@/features/products/types/product.types';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import { createCollectionSearchSchema } from '@/lib/zod/schemas/collection-search.schemas';
import {
  createSearchParamEnumSchema,
  searchParamIsoDateSchema,
  searchParamSortOrderSchema,
} from '@/lib/zod/schemas/search-params.schemas';
import type { Collection } from '@/types/api.types';

export const getProductsQuerySchema = createCollectionSearchSchema({
  category: createSearchParamEnumSchema(PRODUCT_CATEGORIES),
  dateEnd: searchParamIsoDateSchema,
  dateStart: searchParamIsoDateSchema,
  sortBy: createSearchParamEnumSchema(PRODUCT_SORT_FIELDS).default(
    DEFAULT_PRODUCT_SORT_BY
  ),
  sortOrder: searchParamSortOrderSchema.default(DEFAULT_PRODUCT_SORT_ORDER),
  status: createSearchParamEnumSchema(PRODUCT_STATUSES),
});

export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>;

const getProducts = (params?: GetProductsQuery, signal?: AbortSignal) => {
  return api.get<never, Collection<Product>>('/api/products', {
    params,
    signal,
  });
};

export const getProductsQueryOptions = (params?: GetProductsQuery) =>
  queryOptions({
    queryFn: ({ signal }) => getProducts(params, signal),
    queryKey: productKeys.list(params),
  });

type UseProductsOptions = {
  params?: GetProductsQuery;
  queryConfig?: QueryConfig<() => ReturnType<typeof getProductsQueryOptions>>;
};

export const useProducts = ({
  params,
  queryConfig,
}: UseProductsOptions = {}) => {
  return useQuery({
    ...getProductsQueryOptions(params),
    ...queryConfig,
  });
};
