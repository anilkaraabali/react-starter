import {
  COLOR_PALETTE,
  COLOR_PALETTE_KEYS,
} from '@/config/color-palette.constants';
import type {
  ColorPalette,
  ColorPaletteOption,
} from '@/types/color-palette.types';

export function isColorPalette(value: string): value is ColorPalette {
  return (COLOR_PALETTE_KEYS as readonly string[]).includes(value);
}

export function getColorPaletteOption(key: ColorPalette): ColorPaletteOption {
  return (
    COLOR_PALETTE.find((palette) => palette.key === key) ?? COLOR_PALETTE[0]
  );
}
