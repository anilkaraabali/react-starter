import { colorPaletteKeys, colorPaletteOptions } from '@/config/color-palette';
import type {
  ColorPalette,
  ColorPaletteOption,
} from '@/types/color-palette.types';

export function isColorPalette(value: string): value is ColorPalette {
  return (colorPaletteKeys as readonly string[]).includes(value);
}

export function getColorPaletteOption(key: ColorPalette): ColorPaletteOption {
  return (
    colorPaletteOptions.find((palette) => palette.key === key) ??
    colorPaletteOptions[0]
  );
}
