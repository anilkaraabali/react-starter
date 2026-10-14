import { describe, expect, it } from 'vitest';
import {
  COLOR_PALETTE,
  DEFAULT_COLOR_PALETTE,
} from '@/config/color-palette.constants';
import {
  getColorPaletteOption,
  isColorPalette,
} from '@/utils/color-palette.utils';

describe('color-palette.utils', () => {
  describe('isColorPalette', () => {
    it('returns true for all registered palettes', () => {
      for (const palette of COLOR_PALETTE) {
        expect(isColorPalette(palette.key)).toBe(true);
      }
    });

    it('returns false for unknown keys', () => {
      expect(isColorPalette('neon')).toBe(false);
      expect(isColorPalette('')).toBe(false);
    });
  });

  describe('getColorPaletteOption', () => {
    it('returns the matching palette option', () => {
      const option = getColorPaletteOption(DEFAULT_COLOR_PALETTE);
      expect(option.key).toBe(DEFAULT_COLOR_PALETTE);
      expect(option.color).toBeDefined();
    });

    it('falls back to the first palette when not found', () => {
      const option = getColorPaletteOption('unknown' as never);
      expect(option).toBe(COLOR_PALETTE[0]);
    });
  });
});
