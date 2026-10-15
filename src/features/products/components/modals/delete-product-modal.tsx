import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ConfirmDialog } from '@/components/molecules/confirm-dialog';
import { useDeleteProduct } from '@/features/products/api/delete-product';
import type { Product } from '@/features/products/types/product.types';

type DeleteProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product: Product | null;
};

export function DeleteProductModal({
  isOpen,
  onClose,
  onSuccess,
  product,
}: DeleteProductModalProps) {
  const { _ } = useLingui();
  const deleteProductMutation = useDeleteProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Product deleted.`));
        onClose();
        onSuccess?.();
      },
    },
  });

  if (!product) return null;

  return (
    <ConfirmDialog
      confirmLabel={_(msg`Delete`)}
      isOpen={isOpen}
      isPending={deleteProductMutation.isPending}
      onClose={onClose}
      onConfirm={() => deleteProductMutation.mutateAsync(product.id)}
      title={_(msg`Delete Product`)}
    >
      <Trans>
        Are you sure you want to delete <b>{product.name}</b>? This action
        cannot be undone.
      </Trans>
    </ConfirmDialog>
  );
}
