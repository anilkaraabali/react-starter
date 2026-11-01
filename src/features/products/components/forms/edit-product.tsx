import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateProduct } from '@/api/endpoints/products/update-product';
import type { ProductDto } from '@/api/models/products/product-dto';
import { useForm } from '@/components/organisms/form/use-form';
import {
  type ProductFormValues,
  productFormSchema,
} from '@/features/products/components/forms/product-form-schema';
import { ProductForm } from './product-form';
import { productToFormValues } from './product-form-mappers';

const EDIT_PRODUCT_FORM_ID = 'edit-product-form';

type EditProductProps = {
  product: ProductDto;
  productId: string;
};

export function EditProduct({ product, productId }: EditProductProps) {
  const { t } = useLingui();
  const navigate = useNavigate();
  const updateProductMutation = useUpdateProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Product updated.`);
      },
    },
  });

  const form = useForm({
    defaultValues: productToFormValues(product),
    onSubmit: async (values: ProductFormValues) => {
      await updateProductMutation.mutateAsync(
        {
          data: values,
          productId,
        },
        {
          onSuccess: () => {
            void navigate({ to: '/products' });
          },
        }
      );
    },
    schema: productFormSchema,
  });

  return (
    <form.AppForm>
      <ProductForm form={form} formId={EDIT_PRODUCT_FORM_ID} />
      <form.ActionBar
        formId={EDIT_PRODUCT_FORM_ID}
        lastSavedAt={product.updatedAt}
        onCancel={() => navigate({ to: '/products' })}
      />
      <form.UnsavedChangesGuard />
    </form.AppForm>
  );
}
