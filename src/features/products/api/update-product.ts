import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { z } from 'zod';
import { createProductInputSchema } from '@/features/products/api/create-product';
import { productKeys } from '@/features/products/api/products.keys';
import type { Product } from '@/features/products/types/product.types';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

const updateProductInputSchema = createProductInputSchema.partial();

type UpdateProductInput = z.infer<typeof updateProductInputSchema>;

const updateProduct = ({
  data,
  productId,
}: {
  data: UpdateProductInput;
  productId: string;
}): Promise<Product> => {
  return api.patch<never, Product>(`/api/products/${productId}`, data);
};

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({
  mutationConfig,
}: UseUpdateProductOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables, ...args) => {
      void queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
      void queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.productId),
      });
      onSuccess?.(data, variables, ...args);
    },
    ...restConfig,
  });
};
