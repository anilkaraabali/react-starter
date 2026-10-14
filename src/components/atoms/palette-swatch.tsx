import { ColorSwatch } from '@heroui/react';

type PaletteSwatchProps = {
  color: string;
};

export function PaletteSwatch({ color }: PaletteSwatchProps) {
  return <ColorSwatch aria-hidden color={color} size='xs' />;
}
