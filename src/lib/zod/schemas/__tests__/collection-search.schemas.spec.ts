import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { createCollectionSearchSchema } from '@/lib/zod/schemas/collection-search.schemas';
import { SearchParamNonNegativeNumberSchema } from '@/lib/zod/schemas/search-params.schemas';

describe('collection-search.schemas', () => {
  describe('createCollectionSearchSchema', () => {
    it('reads the shared pagination and sort fields', () => {
      const schema = createCollectionSearchSchema();

      expect(
        schema.parse({ page: '2', pageSize: '25', search: '  keyword  ' })
      ).toEqual({
        page: 2,
        pageSize: 25,
        search: 'keyword',
      });
      expect(schema.parse({ search: '   ' })).toEqual({});
      expect(schema.parse({ sortOrder: 'asc' })).toEqual({ sortOrder: 'asc' });
      expect(schema.parse({})).toEqual({});
    });

    it('adds the feature’s own fields', () => {
      const schema = createCollectionSearchSchema({
        enabled: SearchParamNonNegativeNumberSchema,
      });

      expect(schema.parse({ enabled: '1' })).toEqual({ enabled: 1 });
    });

    it('lets a feature field override a shared one', () => {
      const schema = createCollectionSearchSchema({ search: z.number() });

      expect(schema.parse({ search: 7 })).toEqual({ search: 7 });
      // No coercion: a string no longer fits, so the catch() empties the object.
      expect(schema.parse({ search: '7' })).toEqual({});
    });

    it('falls back to an empty object rather than rejecting the route', () => {
      // A bad search param must not take the page down; TanStack validates the
      // URL and the view falls back to its defaults.
      expect(createCollectionSearchSchema().parse({ page: 'many' })).toEqual(
        {}
      );
    });
  });
});
