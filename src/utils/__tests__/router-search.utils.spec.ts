import { describe, expect, it } from 'vitest';

import { stringifySearch } from '@/utils/router-search.utils';

describe('router-search.utils', () => {
  describe('stringifySearch', () => {
    it('serializes single and multiple array values as repeated keys', () => {
      expect(
        stringifySearch({
          entityType: ['member'],
          sortOrder: 'desc',
        })
      ).toBe('?entityType=member&sortOrder=desc');

      expect(
        stringifySearch({
          entityType: ['member', 'organization'],
          sortOrder: 'desc',
        })
      ).toBe('?entityType=member&entityType=organization&sortOrder=desc');
    });

    it('omits undefined, null, and empty string values', () => {
      expect(
        stringifySearch({
          empty: '',
          emptyArr: [],
          nil: null,
          undef: undefined,
          valid: 'test',
        })
      ).toBe('?valid=test');
    });

    it('returns empty string when there are no valid params', () => {
      expect(stringifySearch({})).toBe('');
      expect(stringifySearch({ a: undefined, b: '' })).toBe('');
    });
  });
});
