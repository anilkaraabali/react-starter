import { describe, expect, it } from 'vitest';
import { languageOptions } from '@/config/language';
import { isLanguage } from '@/utils/language.utils';

describe('language.utils', () => {
  describe('isLanguage', () => {
    it('returns true for configured languages', () => {
      for (const lang of languageOptions) {
        expect(isLanguage(lang.key)).toBe(true);
      }
    });

    it('returns false for invalid languages', () => {
      expect(isLanguage('fr')).toBe(false);
      expect(isLanguage('de')).toBe(false);
      expect(isLanguage('')).toBe(false);
      expect(isLanguage(null)).toBe(false);
      expect(isLanguage(undefined)).toBe(false);
      expect(isLanguage(123)).toBe(false);
    });
  });
});
