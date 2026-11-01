import type { z } from 'zod';
import { createProductInputSchema } from '@/api/models/products/create-product-input';
import { ProductCategoryDto } from '@/api/models/products/product-category-dto';
import { ProductStatusDto } from '@/api/models/products/product-status-dto';

export const productFormSchema = createProductInputSchema;

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productFormDefaultValues: ProductFormValues = {
  barcode: '',
  category: ProductCategoryDto.electronics,
  costPrice: 0,
  description: '',
  name: '',
  price: 0,
  sku: '',
  status: ProductStatusDto.draft,
  stock: 0,
};
