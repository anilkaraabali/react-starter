import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { productKeys } from '@/features/products/api/products.keys';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  type Product,
} from '@/features/products/types/product.types';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

export const createProductInputSchema = z.object({
  barcode: z.string().optional(),
  category: z.enum(PRODUCT_CATEGORIES, {
    message: 'Category is required',
  }),
  costPrice: z.coerce.number().min(0).optional(),
  description: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.coerce.number().min(0, 'Price must be 0 or higher'),
  sku: z.string().min(2, 'SKU is required'),
  status: z.enum(PRODUCT_STATUSES),
  stock: z.coerce.number().int().min(0, 'Stock must be 0 or higher'),
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export const createProduct = ({
  data,
}: {
  data: CreateProductInput;
}): Promise<Product> => {
  return api.post<never, Product>('/api/products', data);
};

type UseCreateProductOptions = {
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export const useCreateProduct = ({
  mutationConfig,
}: UseCreateProductOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
