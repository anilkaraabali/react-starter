import { describe, expect, it } from 'vitest';
import { createProductInputSchema } from '@/features/products/api/create-product';

describe('createProductInputSchema', () => {
  it('validates valid product data', () => {
    const validData = {
      barcode: '123456789',
      category: 'electronics' as const,
      costPrice: 50,
      description: 'A great gadget',
      name: 'Mechanical Keyboard',
      price: 99.99,
      sku: 'KB-001',
      status: 'active' as const,
      stock: 25,
    };

    const parsed = createProductInputSchema.parse(validData);
    expect(parsed).toEqual(validData);
  });

  it('coerces numeric string fields properly', () => {
    const dataWithStrings = {
      category: 'clothing' as const,
      costPrice: '15.5',
      name: 'T-Shirt',
      price: '29.99',
      sku: 'TS-001',
      status: 'draft' as const,
      stock: '100',
    };

    const parsed = createProductInputSchema.parse(dataWithStrings);
    expect(parsed.price).toBe(29.99);
    expect(parsed.costPrice).toBe(15.5);
    expect(parsed.stock).toBe(100);
  });

  it('rejects short product name or missing sku', () => {
    const invalidData = {
      category: 'home' as const,
      name: 'A',
      price: 10,
      sku: '',
      status: 'draft' as const,
      stock: 5,
    };

    const result = createProductInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.name).toBeDefined();
      expect(fieldErrors.sku).toBeDefined();
    }
  });

  it('rejects negative price and stock', () => {
    const invalidData = {
      category: 'books' as const,
      name: 'React Handbook',
      price: -5,
      sku: 'BK-001',
      status: 'active' as const,
      stock: -1,
    };

    const result = createProductInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.price).toBeDefined();
      expect(fieldErrors.stock).toBeDefined();
    }
  });
});
