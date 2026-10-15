import { queryOptions, useQuery } from '@tanstack/react-query';
import { productKeys } from '@/features/products/api/products.keys';
import type { Product } from '@/features/products/types/product.types';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';

export const getProduct = (id: string, signal?: AbortSignal) => {
  return api.get<never, Product>(`/api/products/${id}`, {
    signal,
  });
};

export const getProductQueryOptions = (id: string) =>
  queryOptions({
    queryFn: ({ signal }) => getProduct(id, signal),
    queryKey: productKeys.detail(id),
  });

type UseProductOptions = {
  id: string;
  queryConfig?: QueryConfig<() => ReturnType<typeof getProductQueryOptions>>;
};

export const useProduct = ({ id, queryConfig }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions(id),
    ...queryConfig,
  });
};
