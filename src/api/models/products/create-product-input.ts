import { z } from 'zod';
import { ProductCategoryDto } from '@/api/models/products/product-category-dto';
import { ProductStatusDto } from '@/api/models/products/product-status-dto';
import {
  enumFieldSchema,
  nonNegativeIntegerFieldSchema,
  nonNegativeNumberFieldSchema,
  stringFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

export const createProductInputSchema = z.object({
  barcode: z.string().trim().optional(),
  category: enumFieldSchema(ProductCategoryDto),
  costPrice: nonNegativeNumberFieldSchema.optional(),
  description: z.string().trim().optional(),
  name: stringFieldSchema.min(2),
  price: nonNegativeNumberFieldSchema,
  sku: stringFieldSchema.min(2),
  status: enumFieldSchema(ProductStatusDto),
  stock: nonNegativeIntegerFieldSchema,
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;
