import { queryOptions, useQuery } from '@tanstack/react-query';
import type { z } from 'zod';
import { productKeys } from '@/api/endpoints/products/products.keys';
import type { Collection } from '@/api/models/common/collection';
import { ProductCategoryDto } from '@/api/models/products/product-category-dto';
import type { ProductDto } from '@/api/models/products/product-dto';
import { ProductSortByDto } from '@/api/models/products/product-sort-by-dto';
import { ProductStatusDto } from '@/api/models/products/product-status-dto';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';
import { createCollectionSearchSchema } from '@/lib/zod/schemas/collection-search.schemas';
import {
  createSearchParamEnumSchema,
  createSearchParamObjectEnumSchema,
  searchParamIsoDateSchema,
} from '@/lib/zod/schemas/search-params.schemas';

export const getProductsQuerySchema = createCollectionSearchSchema({
  category: createSearchParamEnumSchema(ProductCategoryDto),
  dateEnd: searchParamIsoDateSchema,
  dateStart: searchParamIsoDateSchema,
  sortBy: createSearchParamObjectEnumSchema(ProductSortByDto).default(
    ProductSortByDto.createdAt
  ),
  status: createSearchParamEnumSchema(ProductStatusDto),
});

export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>;

const getProducts = (params?: GetProductsQuery, signal?: AbortSignal) => {
  return api.get<never, Collection<ProductDto>>('/api/products', {
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
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
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
