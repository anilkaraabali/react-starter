import { buttonVariants, Card, toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { useForm } from '@/components/organisms/form/use-form';
import { ContentLayout } from '@/components/templates/content-layout';
import {
  type CreateProductInput,
  useCreateProduct,
} from '@/features/products/api/create-product';
import { ProductForm } from './product-form';
import { productFormOptions } from './product-form-options';

export function CreateProductView() {
  const { _ } = useLingui();
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Product created.`));
        void navigate({
          to: '/products',
        });
      },
    },
  });

  const form = useForm(
    productFormOptions({
      onSubmit: async (values: CreateProductInput) => {
        await createProductMutation.mutateAsync({ data: values });
      },
    })
  );

  return (
    <ContentLayout
      actions={
        <div className='flex items-center gap-2'>
          <Link
            className={buttonVariants({ variant: 'secondary' })}
            to='/products'
          >
            {_(msg`Cancel`)}
          </Link>
          <FormActions
            formId='create-product-form'
            isSavePending={createProductMutation.isPending}
          />
        </div>
      }
      description={_(msg`Add a new product to your inventory catalog.`)}
    >
      <Card className='p-6'>
        <form.AppForm>
          <form.Root id='create-product-form'>
            <form.UnsavedChangesGuard />
            <ProductForm form={form} />
          </form.Root>
        </form.AppForm>
      </Card>
    </ContentLayout>
  );
}
