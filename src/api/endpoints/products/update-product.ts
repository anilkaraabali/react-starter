import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from '@/api/endpoints/products/products.keys';
import type { ProductDto } from '@/api/models/products/product-dto';
import type { UpdateProductInput } from '@/api/models/products/update-product-input';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

const updateProduct = ({
  data,
  productId,
}: {
  data: UpdateProductInput;
  productId: string;
}): Promise<ProductDto> => {
  return api.patch<never, ProductDto>(`/api/products/${productId}`, data);
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
