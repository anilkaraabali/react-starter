import { Card } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { AppForm } from '@/components/organisms/form/use-form';
import type { productFormSchema } from '@/features/products/components/forms/product-form-schema';
import {
  getProductCategorySelectOptions,
  getProductStatusSelectOptions,
} from '@/features/products/config/product-select-options';

type ProductFormProps = {
  form: AppForm<typeof productFormSchema>;
  formId: string;
};

export function ProductForm({ form, formId }: ProductFormProps) {
  const { t } = useLingui();
  const categoryOptions = getProductCategorySelectOptions();
  const statusOptions = getProductStatusSelectOptions();

  return (
    <form.Root id={formId}>
      <Card className='card-form p-6'>
        <div className='grid gap-6'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <form.AppField name='name'>
              {(field) => (
                <field.FormInput
                  isRequired
                  label={t`Product Name`}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='sku'>
              {(field) => (
                <field.FormInput
                  isRequired
                  label={t`SKU`}
                  variant='secondary'
                />
              )}
            </form.AppField>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <form.AppField name='category'>
              {(field) => (
                <field.FormSelect
                  isRequired
                  label={t`Category`}
                  options={categoryOptions}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='status'>
              {(field) => (
                <field.FormSelect
                  isRequired
                  label={t`Status`}
                  options={statusOptions}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='barcode'>
              {(field) => (
                <field.FormInput label={t`Barcode / EAN`} variant='secondary' />
              )}
            </form.AppField>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <form.AppField name='price'>
              {(field) => (
                <field.FormNumberField
                  isRequired
                  label={t`Selling Price ($)`}
                  minValue={0}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='costPrice'>
              {(field) => (
                <field.FormNumberField
                  label={t`Cost Price ($)`}
                  minValue={0}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='stock'>
              {(field) => (
                <field.FormNumberField
                  isRequired
                  label={t`Available Stock`}
                  minValue={0}
                  variant='secondary'
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name='description'>
            {(field) => (
              <field.FormTextArea
                label={t`Description`}
                rows={4}
                variant='secondary'
              />
            )}
          </form.AppField>
        </div>
      </Card>
    </form.Root>
  );
}
