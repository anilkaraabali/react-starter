import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { useCreateProduct } from '@/api/endpoints/products/create-product';
import { useForm } from '@/components/organisms/form/use-form';
import {
  type ProductFormValues,
  productFormDefaultValues,
  productFormSchema,
} from '@/features/products/components/forms/product-form-schema';
import { ProductForm } from './product-form';

const CREATE_PRODUCT_FORM_ID = 'create-product-form';

export function CreateProduct() {
  const { t } = useLingui();
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Product created.`);
        void navigate({ to: '/products' });
      },
    },
  });

  const form = useForm({
    defaultValues: productFormDefaultValues,
    onSubmit: async (values: ProductFormValues) => {
      await createProductMutation.mutateAsync({ data: values });
    },
    schema: productFormSchema,
  });

  return (
    <form.AppForm>
      <ProductForm form={form} formId={CREATE_PRODUCT_FORM_ID} />
      <form.ActionBar
        formId={CREATE_PRODUCT_FORM_ID}
        onCancel={() => navigate({ to: '/products' })}
        submitLabel={t(msg`Save changes`)}
      />
      <form.UnsavedChangesGuard />
    </form.AppForm>
  );
}
