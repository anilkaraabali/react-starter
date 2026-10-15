import { describe, expect, it } from 'vitest';
import { getProductsQuerySchema } from '@/features/products/api/get-products';

describe('getProductsQuerySchema', () => {
  it('parses valid search, date filters, and sort options', () => {
    const raw = {
      category: 'electronics',
      dateEnd: '2026-12-31',
      dateStart: '2026-01-01',
      page: '2',
      pageSize: '20',
      search: 'headphone',
      sortBy: 'price',
      sortOrder: 'desc',
      status: 'active',
    };

    const parsed = getProductsQuerySchema.parse(raw);
    expect(parsed).toEqual({
      category: 'electronics',
      dateEnd: '2026-12-31',
      dateStart: '2026-01-01',
      page: 2,
      pageSize: 20,
      search: 'headphone',
      sortBy: 'price',
      sortOrder: 'desc',
      status: 'active',
    });
  });

  it('applies default values for sortBy and sortOrder when omitted', () => {
    const parsed = getProductsQuerySchema.parse({});
    expect(parsed.sortBy).toBe('createdAt');
    expect(parsed.sortOrder).toBe('desc');
    expect(parsed.status).toBeUndefined();
  });

  it('safely falls back for invalid inputs via catch fallback', () => {
    const invalid = {
      dateStart: 'not-a-date',
      sortBy: 'unsupportedField',
      sortOrder: 'invalidOrder',
    };

    const parsed = getProductsQuerySchema.parse(invalid);
    expect(parsed).toBeDefined();
    expect(parsed.dateStart).toBeUndefined();
    expect(parsed.sortBy).toBeUndefined();
    expect(parsed.sortOrder).toBeUndefined();
  });
});
