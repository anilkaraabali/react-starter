import { Card, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { useForm } from '@/components/organisms/form/use-form';
import { ContentLayout } from '@/components/templates/content-layout';
import { APP_ROUTES } from '@/config/app-routes.constants';
import type { CreateProductInput } from '@/features/products/api/create-product';
import { useUpdateProduct } from '@/features/products/api/update-product';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductQueryBoundary } from '@/features/products/components/product-query-boundary';
import type { Product } from '@/features/products/types/product.types';
import { ProductForm } from './product-form';
import { productToFormValues } from './product-form-mappers';
import { productFormOptions } from './product-form-options';

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
          to: APP_ROUTES.PRODUCTS,
        });
      },
    },
  });

  const form = useForm(
    productFormOptions({
      defaultValues: productToFormValues(product),
      onSubmit: async (values: CreateProductInput) => {
        await updateProductMutation.mutateAsync({
          data: values,
          productId: product.id,
        });
      },
    })
  );

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
        <form.AppForm>
          <form.Root id='edit-product-form'>
            <form.UnsavedChangesGuard />
            <ProductForm form={form} />
          </form.Root>
        </form.AppForm>
      </Card>

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => {
          void navigate({ to: APP_ROUTES.PRODUCTS });
        }}
        product={product}
      />
    </ContentLayout>
  );
}
