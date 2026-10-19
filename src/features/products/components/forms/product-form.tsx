import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { AppForm } from '@/components/organisms/form/use-form';
import type { createProductInputSchema } from '@/features/products/api/create-product';
import {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
} from '@/features/products/config/product.constants';

type ProductFormProps = {
  form: AppForm<typeof createProductInputSchema>;
  formId: string;
};

export function ProductForm({ form, formId }: ProductFormProps) {
  const { _ } = useLingui();

  return (
    <form.AppForm>
      <form.Root id={formId}>
        <form.UnsavedChangesGuard />
        <div className='grid gap-6'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <form.AppField name='name'>
              {(field) => (
                <field.FormInput
                  isRequired
                  label={_(msg`Product Name`)}
                  placeholder={_(msg`e.g. Ergonomic Keyboard`)}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='sku'>
              {(field) => (
                <field.FormInput
                  isRequired
                  label={_(msg`SKU`)}
                  placeholder={_(msg`e.g. PROD-001`)}
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
                  label={_(msg`Category`)}
                  options={PRODUCT_CATEGORY_OPTIONS.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='status'>
              {(field) => (
                <field.FormSelect
                  isRequired
                  label={_(msg`Status`)}
                  options={PRODUCT_STATUS_OPTIONS.map((s) => ({
                    label: s.label,
                    value: s.value,
                  }))}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='barcode'>
              {(field) => (
                <field.FormInput
                  label={_(msg`Barcode / EAN`)}
                  placeholder={_(msg`Optional barcode`)}
                  variant='secondary'
                />
              )}
            </form.AppField>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <form.AppField name='price'>
              {(field) => (
                <field.FormNumberField
                  isRequired
                  label={_(msg`Selling Price ($)`)}
                  minValue={0}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='costPrice'>
              {(field) => (
                <field.FormNumberField
                  label={_(msg`Cost Price ($)`)}
                  minValue={0}
                  variant='secondary'
                />
              )}
            </form.AppField>

            <form.AppField name='stock'>
              {(field) => (
                <field.FormNumberField
                  isRequired
                  label={_(msg`Available Stock`)}
                  minValue={0}
                  variant='secondary'
                />
              )}
            </form.AppField>
          </div>

          <form.AppField name='description'>
            {(field) => (
              <field.FormTextArea
                label={_(msg`Description`)}
                placeholder={_(msg`Detailed product description...`)}
                rows={4}
                variant='secondary'
              />
            )}
          </form.AppField>
        </div>
      </form.Root>
    </form.AppForm>
  );
}
