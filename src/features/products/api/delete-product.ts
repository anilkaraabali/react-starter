import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from '@/features/products/api/products.keys';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

export const deleteProduct = (id: string) => {
  return api.delete<never, void>(`/api/products/${id}`);
};

type UseDeleteProductOptions = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({
  mutationConfig,
}: UseDeleteProductOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      void queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteProduct,
  });
};
