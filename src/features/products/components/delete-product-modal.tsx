import { toast } from '@heroui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useDeleteProduct } from '@/api/endpoints/products/delete-product';
import type { ProductDto } from '@/api/models/products/product-dto';
import { ConfirmDialog } from '@/components/molecules/confirm-dialog';

type DeleteProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product: ProductDto | null;
};

export function DeleteProductModal({
  isOpen,
  onClose,
  onSuccess,
  product,
}: DeleteProductModalProps) {
  const { t } = useLingui();
  const deleteProductMutation = useDeleteProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Product deleted.`);
        onClose();
        onSuccess?.();
      },
    },
  });

  if (!product) return null;

  return (
    <ConfirmDialog
      confirmLabel={t`Delete`}
      isOpen={isOpen}
      isPending={deleteProductMutation.isPending}
      onClose={onClose}
      onConfirm={() => deleteProductMutation.mutateAsync(product.id)}
      title={t`Delete Product`}
    >
      <Trans>
        Are you sure you want to delete <b>{product.name}</b>? This action
        cannot be undone.
      </Trans>
    </ConfirmDialog>
  );
}
