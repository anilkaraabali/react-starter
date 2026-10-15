import { describe, expect, it } from 'vitest';
import { productToFormValues } from '@/features/products/components/forms/product-form-mappers';
import type { Product } from '@/features/products/types/product.types';

describe('toProductFormValues', () => {
  it('maps product fields to form values correctly', () => {
    const product: Product = {
      barcode: '1234567890123',
      category: 'electronics',
      costPrice: 50,
      createdAt: '2026-01-01T00:00:00.000Z',
      description: 'Test description',
      id: 'prod-1',
      name: 'Test Product',
      price: 100,
      sku: 'TEST-SKU-1',
      status: 'active',
      stock: 25,
      updatedAt: '2026-01-02T00:00:00.000Z',
      version: 1,
    };

    expect(productToFormValues(product)).toEqual({
      barcode: '1234567890123',
      category: 'electronics',
      costPrice: 50,
      description: 'Test description',
      name: 'Test Product',
      price: 100,
      sku: 'TEST-SKU-1',
      status: 'active',
      stock: 25,
    });
  });

  it('falls back to empty strings and zero for undefined optional values', () => {
    const product: Product = {
      barcode: undefined,
      category: 'books',
      costPrice: undefined,
      createdAt: '2026-01-01T00:00:00.000Z',
      description: undefined,
      id: 'prod-2',
      name: 'Book without optional fields',
      price: 20,
      sku: 'BOOK-1',
      status: 'draft',
      stock: 5,
      updatedAt: '2026-01-01T00:00:00.000Z',
      version: 1,
    };

    expect(productToFormValues(product)).toEqual({
      barcode: '',
      category: 'books',
      costPrice: 0,
      description: '',
      name: 'Book without optional fields',
      price: 20,
      sku: 'BOOK-1',
      status: 'draft',
      stock: 5,
    });
  });
});
