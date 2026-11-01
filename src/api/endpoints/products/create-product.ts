import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from '@/api/endpoints/products/products.keys';
import type { CreateProductInput } from '@/api/models/products/create-product-input';
import type { ProductDto } from '@/api/models/products/product-dto';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

const createProduct = ({
  data,
}: {
  data: CreateProductInput;
}): Promise<ProductDto> => {
  return api.post<never, ProductDto>('/api/products', data);
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
