import type { MessageDescriptor } from '@lingui/core';

export type ColorPalette =
  | 'amber'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'fuchsia'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'sky'
  | 'teal'
  | 'violet'
  | 'yellow';

export type ColorPaletteOption = {
  /** Tailwind / shadcn `*-500` swatch (HEX) — used as primary accent. */
  color: string;
  key: ColorPalette;
  label: MessageDescriptor;
};
