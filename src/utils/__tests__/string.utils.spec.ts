import { describe, expect, it } from 'vitest';

import { getUserInitials, trimOrUndefined } from '@/utils/string.utils';

describe('string.utils', () => {
  describe('trimOrUndefined', () => {
    it('trims the value', () => {
      expect(trimOrUndefined('  hello  ')).toBe('hello');
      expect(trimOrUndefined('\thello\n')).toBe('hello');
    });

    it('keeps inner spaces', () => {
      expect(trimOrUndefined('  two words  ')).toBe('two words');
    });

    it('returns undefined for an empty or blank value', () => {
      expect(trimOrUndefined('')).toBeUndefined();
      expect(trimOrUndefined('   ')).toBeUndefined();
      expect(trimOrUndefined('\t\n')).toBeUndefined();
    });
  });

  describe('getUserInitials', () => {
    it('uses the first character of the first and last word', () => {
      expect(getUserInitials('Ada Lovelace')).toBe('AL');
      expect(getUserInitials('ada lovelace')).toBe('AL');
    });

    it('uses the first character when there is only one word', () => {
      expect(getUserInitials('ada')).toBe('A');
      expect(getUserInitials('a')).toBe('A');
    });

    it('uses the first and last word when there are more than two', () => {
      expect(getUserInitials('Ada King Lovelace')).toBe('AL');
    });

    it('normalizes surrounding and repeated whitespace', () => {
      expect(getUserInitials('   Ada   Lovelace   ')).toBe('AL');
      expect(getUserInitials('Ada\tLovelace')).toBe('AL');
    });

    it('returns null when there is no name to derive initials from', () => {
      expect(getUserInitials('')).toBeNull();
      expect(getUserInitials('   ')).toBeNull();
      expect(getUserInitials(null)).toBeNull();
      expect(getUserInitials(undefined)).toBeNull();
    });
  });
});
