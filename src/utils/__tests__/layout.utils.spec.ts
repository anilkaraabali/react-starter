import { describe, expect, it } from 'vitest';

import { sidebarVariants } from '@/config/layout-options';
import { isSidebarVariant } from '@/utils/layout.utils';

describe('layout.utils', () => {
  describe('isSidebarVariant', () => {
    it('accepts every declared variant', () => {
      for (const variant of sidebarVariants) {
        expect(isSidebarVariant(variant)).toBe(true);
      }
    });

    it('rejects a string that is not a variant', () => {
      expect(isSidebarVariant('unknown')).toBe(false);
      expect(isSidebarVariant('')).toBe(false);
      expect(isSidebarVariant('DEFAULT')).toBe(false);
    });

    it('rejects values that are not strings', () => {
      expect(isSidebarVariant(undefined)).toBe(false);
      expect(isSidebarVariant(null)).toBe(false);
      expect(isSidebarVariant(0)).toBe(false);
      expect(isSidebarVariant(true)).toBe(false);
      expect(isSidebarVariant(['default'])).toBe(false);
      expect(isSidebarVariant({ variant: 'default' })).toBe(false);
    });
  });
});
