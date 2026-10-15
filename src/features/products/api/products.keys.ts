import type { GetProductsQuery } from '@/features/products/api/get-products';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  list: (params?: GetProductsQuery) =>
    [...productKeys.lists(), params] as const,
  lists: () => [...productKeys.all, 'list'] as const,
};
