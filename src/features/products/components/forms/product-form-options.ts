import { formOptions } from '@tanstack/react-form';
import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type CreateProductInput,
  createProductInputSchema,
} from '@/features/products/api/create-product';

const productDefaultValues: CreateProductInput = {
  barcode: '',
  category: 'electronics',
  costPrice: 0,
  description: '',
  name: '',
  price: 0,
  sku: '',
  status: 'draft',
  stock: 0,
};

type ProductFormOptionsProps = {
  defaultValues?: Partial<CreateProductInput>;
  onSubmit: (data: CreateProductInput) => Promise<void> | void;
};

export function productFormOptions({
  defaultValues,
  onSubmit,
}: ProductFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...productDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(createProductInputSchema.parse(value)),
    validators: createFormValidators(createProductInputSchema),
  });
}
