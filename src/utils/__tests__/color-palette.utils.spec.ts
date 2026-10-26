import { describe, expect, it } from 'vitest';
import {
  colorPaletteOptions,
  DEFAULT_COLOR_PALETTE,
} from '@/config/color-palette';
import {
  getColorPaletteOption,
  isColorPalette,
} from '@/utils/color-palette.utils';

describe('color-palette.utils', () => {
  describe('isColorPalette', () => {
    it('returns true for all registered palettes', () => {
      for (const palette of colorPaletteOptions) {
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
      expect(option).toBe(colorPaletteOptions[0]);
    });
  });
});
