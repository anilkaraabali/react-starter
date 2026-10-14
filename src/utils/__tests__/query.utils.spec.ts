import { describe, expect, it } from 'vitest';

import { toCollectionQueryParams } from '@/utils/query.utils';

const SORT_OPTIONS = {
  defaultSortBy: 'createdAt',
  defaultSortOrder: 'asc',
  sortFields: ['createdAt', 'name'],
} as const;

describe('query.utils', () => {
  describe('toCollectionQueryParams', () => {
    it('passes pagination through unchanged', () => {
      const result = toCollectionQueryParams(
        { page: 3, pageSize: 50 },
        SORT_OPTIONS
      );

      expect(result.page).toBe(3);
      expect(result.pageSize).toBe(50);
    });

    it('trims the search term', () => {
      const result = toCollectionQueryParams(
        { search: '  ada  ' },
        SORT_OPTIONS
      );

      expect(result.search).toBe('ada');
    });

    it('drops a blank search term instead of sending an empty string', () => {
      expect(
        toCollectionQueryParams({ search: '' }, SORT_OPTIONS).search
      ).toBeUndefined();
      expect(
        toCollectionQueryParams({ search: '   ' }, SORT_OPTIONS).search
      ).toBeUndefined();
      expect(toCollectionQueryParams({}, SORT_OPTIONS).search).toBeUndefined();
    });

    it('keeps a sort field that the list declares', () => {
      expect(
        toCollectionQueryParams({ sortBy: 'name' }, SORT_OPTIONS).sortBy
      ).toBe('name');
    });

    it('falls back to the default when the sort field is unknown or missing', () => {
      expect(
        toCollectionQueryParams({ sortBy: 'notAColumn' }, SORT_OPTIONS).sortBy
      ).toBe('createdAt');
      expect(toCollectionQueryParams({}, SORT_OPTIONS).sortBy).toBe(
        'createdAt'
      );
      expect(toCollectionQueryParams({ sortBy: '' }, SORT_OPTIONS).sortBy).toBe(
        'createdAt'
      );
    });

    it('keeps asc and desc', () => {
      expect(
        toCollectionQueryParams({ sortOrder: 'asc' }, SORT_OPTIONS).sortOrder
      ).toBe('asc');
      expect(
        toCollectionQueryParams({ sortOrder: 'desc' }, SORT_OPTIONS).sortOrder
      ).toBe('desc');
    });

    it('falls back to the default sort order for anything else', () => {
      const descDefaults = {
        ...SORT_OPTIONS,
        defaultSortOrder: 'desc',
      } as const;

      expect(
        toCollectionQueryParams(
          { sortOrder: 'nonsense' as never },
          descDefaults
        ).sortOrder
      ).toBe('desc');
      expect(toCollectionQueryParams({}, descDefaults).sortOrder).toBe('desc');
      expect(
        toCollectionQueryParams({ sortOrder: 'asc' }, descDefaults).sortOrder
      ).toBe('asc');
      expect(
        toCollectionQueryParams(
          { sortOrder: 'nonsense' as never },
          SORT_OPTIONS
        ).sortOrder
      ).toBe('asc');
    });

    it('builds every field in one call', () => {
      expect(
        toCollectionQueryParams(
          {
            page: 2,
            pageSize: 10,
            search: ' ada ',
            sortBy: 'name',
            sortOrder: 'desc',
          },
          SORT_OPTIONS
        )
      ).toEqual({
        page: 2,
        pageSize: 10,
        search: 'ada',
        sortBy: 'name',
        sortOrder: 'desc',
      });
    });
  });
});
