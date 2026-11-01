import type { z } from 'zod';
import { createProductInputSchema } from '@/api/models/products/create-product-input';

const updateProductInputSchema = createProductInputSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;
