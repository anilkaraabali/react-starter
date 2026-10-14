import { msg } from '@lingui/core/macro';
import type {
  ColorPalette,
  ColorPaletteOption,
} from '@/types/color-palette.types';

export const DEFAULT_COLOR_PALETTE: ColorPalette = 'emerald';

/** Chromatic palettes from [shadcn colors](https://ui.shadcn.com/colors) — each swatch is the `500` stop (primary). */
export const COLOR_PALETTE: readonly ColorPaletteOption[] = [
  { color: '#fb2c36', key: 'red', label: msg`Red` },
  { color: '#ff6900', key: 'orange', label: msg`Orange` },
  { color: '#fe9a00', key: 'amber', label: msg`Amber` },
  { color: '#f0b100', key: 'yellow', label: msg`Yellow` },
  { color: '#7ccf00', key: 'lime', label: msg`Lime` },
  { color: '#00c950', key: 'green', label: msg`Green` },
  { color: '#00bc7d', key: 'emerald', label: msg`Emerald` },
  { color: '#00bba7', key: 'teal', label: msg`Teal` },
  { color: '#00b8db', key: 'cyan', label: msg`Cyan` },
  { color: '#00a6f4', key: 'sky', label: msg`Sky` },
  { color: '#2b7fff', key: 'blue', label: msg`Blue` },
  { color: '#615fff', key: 'indigo', label: msg`Indigo` },
  { color: '#8e51ff', key: 'violet', label: msg`Violet` },
  { color: '#ad46ff', key: 'purple', label: msg`Purple` },
  { color: '#e12afb', key: 'fuchsia', label: msg`Fuchsia` },
  { color: '#f6339a', key: 'pink', label: msg`Pink` },
  { color: '#ff2056', key: 'rose', label: msg`Rose` },
];

export const COLOR_PALETTE_KEYS: readonly ColorPalette[] = COLOR_PALETTE.map(
  (palette) => palette.key
);
