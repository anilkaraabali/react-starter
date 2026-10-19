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

  it('safely falls back for invalid inputs without crashing the query', () => {
    const invalid = {
      category: 'not-a-category',
      dateStart: 'not-a-date',
      sortBy: 'unsupportedField',
      sortOrder: 'invalidOrder',
      status: 'unknownStatus',
    };

    const parsed = getProductsQuerySchema.parse(invalid);
    expect(parsed).toBeDefined();
    expect(parsed.category).toBeUndefined();
    expect(parsed.dateStart).toBeUndefined();
    expect(parsed.sortBy).toBe('createdAt');
    expect(parsed.sortOrder).toBe('desc');
    expect(parsed.status).toBeUndefined();
  });
});
