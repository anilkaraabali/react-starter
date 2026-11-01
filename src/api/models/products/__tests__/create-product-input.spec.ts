import { describe, expect, it } from 'vitest';
import { createProductInputSchema } from '@/api/models/products/create-product-input';

describe('createProductInputSchema', () => {
  it('requires name, sku, category, status, price, and stock', () => {
    const result = createProductInputSchema.safeParse({
      category: 'electronics',
      name: 'Widget',
      price: 10,
      sku: 'W-1',
      status: 'draft',
      stock: 5,
    });

    expect(result.success).toBe(true);
  });

  it('rejects negative price and stock', () => {
    const result = createProductInputSchema.safeParse({
      category: 'electronics',
      name: 'Widget',
      price: -1,
      sku: 'W-1',
      status: 'draft',
      stock: -1,
    });

    expect(result.success).toBe(false);
  });
});
