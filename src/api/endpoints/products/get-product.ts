import { queryOptions, useQuery } from '@tanstack/react-query';
import { productKeys } from '@/api/endpoints/products/products.keys';
import type { ProductDto } from '@/api/models/products/product-dto';
import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';

const getProduct = (id: string, signal?: AbortSignal) => {
  return api.get<never, ProductDto>(`/api/products/${id}`, {
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
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

export const useProduct = ({ id, queryConfig }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions(id),
    ...queryConfig,
  });
};
