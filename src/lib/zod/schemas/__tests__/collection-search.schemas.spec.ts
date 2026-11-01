import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { SortByDto } from '@/api/models/common/sort-by-dto';
import { SortOrderDto } from '@/api/models/common/sort-order-dto';
import { createCollectionSearchSchema } from '@/lib/zod/schemas/collection-search.schemas';
import {
  createSearchParamEnumSchema,
  searchParamNonNegativeNumberSchema,
} from '@/lib/zod/schemas/search-params.schemas';

describe('collection-search.schemas', () => {
  describe('createCollectionSearchSchema', () => {
    it('reads the shared pagination, search, and sort fields', () => {
      const schema = createCollectionSearchSchema();

      expect(
        schema.parse({ page: '2', pageSize: '25', search: '  keyword  ' })
      ).toEqual({
        page: 2,
        pageSize: 25,
        search: 'keyword',
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
      expect(schema.parse({ search: '   ' })).toEqual({
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
      expect(schema.parse({ sortOrder: 'asc' })).toEqual({
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.asc,
      });
      expect(schema.parse({})).toEqual({
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
    });

    it('adds the feature’s own fields, including defaults', () => {
      const schema = createCollectionSearchSchema({
        sort: createSearchParamEnumSchema(['date_desc', 'alpha_asc']).default(
          'date_desc'
        ),
      });

      expect(schema.parse({})).toEqual({
        sort: 'date_desc',
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
    });

    it('adds the feature’s own fields', () => {
      const schema = createCollectionSearchSchema({
        enabled: searchParamNonNegativeNumberSchema,
      });

      expect(schema.parse({ enabled: '1' })).toEqual({
        enabled: 1,
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
    });

    it('lets a feature field override a shared one', () => {
      const schema = createCollectionSearchSchema({ search: z.number() });

      expect(schema.parse({ search: 7 })).toEqual({
        search: 7,
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
      expect(schema.safeParse({ search: '7' }).success).toBe(false);
    });

    it('drops invalid pagination without rejecting the route', () => {
      expect(createCollectionSearchSchema().parse({ page: 'many' })).toEqual({
        page: undefined,
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
    });
  });

  describe('default sort search params', () => {
    const schema = createCollectionSearchSchema();

    it('defaults to newest first', () => {
      expect(schema.parse({})).toEqual({
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
    });

    it('reads sortBy and sortOrder', () => {
      expect(schema.parse({ sortBy: 'name', sortOrder: 'asc' })).toEqual({
        sortBy: SortByDto.name,
        sortOrder: SortOrderDto.asc,
      });
    });

    it('drops unknown values back to the defaults', () => {
      expect(schema.parse({ sortBy: 'price', sortOrder: 'up' })).toEqual({
        sortBy: SortByDto.createdAt,
        sortOrder: SortOrderDto.desc,
      });
    });
  });
});
