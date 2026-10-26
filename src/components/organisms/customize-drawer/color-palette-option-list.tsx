import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { PaletteSwatch } from '@/components/atoms/palette-swatch';
import { colorPaletteOptions } from '@/config/color-palette';
import type { ColorPalette } from '@/types/color-palette.types';
import { PreferenceOptionCard } from './preference-option-card';

type ColorPaletteOptionListProps = {
  onSelect: (palette: ColorPalette) => void;
  selectedPalette: ColorPalette;
};

export function ColorPaletteOptionList({
  onSelect,
  selectedPalette,
}: ColorPaletteOptionListProps) {
  const { _ } = useLingui();

  return (
    <div>
      <h4 className='mb-2 font-semibold text-foreground text-xs'>
        {_(msg`Color`)}
      </h4>
      <div className='grid grid-cols-3 gap-2.5'>
        {colorPaletteOptions.map((pal) => {
          const isSelected = selectedPalette === pal.key;

          return (
            <PreferenceOptionCard
              isSelected={isSelected}
              key={pal.key}
              label={_(pal.label)}
              onSelect={() => onSelect(pal.key as ColorPalette)}
              preview={<PaletteSwatch color={pal.color} />}
            />
          );
        })}
      </div>
    </div>
  );
}
