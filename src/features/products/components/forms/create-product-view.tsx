import { buttonVariants, Card, toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { Link, useNavigate } from '@tanstack/react-router';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { useForm } from '@/components/organisms/form/use-form';
import { ContentLayout } from '@/components/templates/content-layout';
import {
  type CreateProductInput,
  createProductInputSchema,
  productDefaultValues,
  useCreateProduct,
} from '@/features/products/api/create-product';
import { ProductForm } from './product-form';

export function CreateProductView() {
  const { t } = useLingui();
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Product created.`);
        void navigate({
          to: '/products',
        });
      },
    },
  });

  const form = useForm({
    defaultValues: productDefaultValues,
    onSubmit: async (values: CreateProductInput) => {
      await createProductMutation.mutateAsync({ data: values });
    },
    schema: createProductInputSchema,
  });

  return (
    <ContentLayout
      actions={
        <div className='flex items-center gap-2'>
          <Link
            className={buttonVariants({ variant: 'secondary' })}
            to='/products'
          >
            {t`Cancel`}
          </Link>
          <FormActions
            formId='create-product-form'
            isSavePending={createProductMutation.isPending}
          />
        </div>
      }
      description={t`Add a new product to your inventory catalog.`}
    >
      <Card className='p-6'>
        <ProductForm form={form} formId='create-product-form' />
      </Card>
    </ContentLayout>
  );
}
