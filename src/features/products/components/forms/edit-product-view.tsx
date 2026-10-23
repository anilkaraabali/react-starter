import { Card, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { useForm } from '@/components/organisms/form/use-form';
import { ContentLayout } from '@/components/templates/content-layout';
import {
  type CreateProductInput,
  createProductInputSchema,
  productDefaultValues,
} from '@/features/products/api/create-product';
import { useUpdateProduct } from '@/features/products/api/update-product';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductQueryBoundary } from '@/features/products/components/product-query-boundary';
import type { Product } from '@/features/products/types/product.types';
import { ProductForm } from './product-form';
import { productToFormValues } from './product-form-mappers';

type EditProductViewProps = {
  productId: string;
};

export function EditProductView({ productId }: EditProductViewProps) {
  return (
    <ProductQueryBoundary productId={productId}>
      {(product) => <EditProductLayout product={product} />}
    </ProductQueryBoundary>
  );
}

function EditProductLayout({ product }: { product: Product }) {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const updateProductMutation = useUpdateProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Product updated.`));
        void navigate({
          to: '/products',
        });
      },
    },
  });

  const form = useForm({
    defaultValues: { ...productDefaultValues, ...productToFormValues(product) },
    onSubmit: async (values: CreateProductInput) => {
      await updateProductMutation.mutateAsync({
        data: values,
        productId: product.id,
      });
    },
    schema: createProductInputSchema,
  });

  return (
    <ContentLayout
      actions={
        <FormActions
          formId='edit-product-form'
          isSavePending={updateProductMutation.isPending}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      }
      title={product.name}
    >
      <Card>
        <ProductForm form={form} formId='edit-product-form' />
      </Card>

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => {
          void navigate({ to: '/products' });
        }}
        product={product}
      />
    </ContentLayout>
  );
}
