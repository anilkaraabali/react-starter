import { Button, Dropdown, Label } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ChevronDownIcon } from 'lucide-react';
import { PaletteSwatch } from '@/components/atoms/palette-swatch';
import { COLOR_PALETTE } from '@/config/color-palette.constants';
import { usePreferences } from '@/stores/preferences-provider';
import type { ColorPalette } from '@/types/color-palette.types';
import { getColorPaletteOption } from '@/utils/color-palette.utils';

export function ColorPalettePicker() {
  const { _ } = useLingui();
  const { palette, setPalette } = usePreferences();

  const activePalette = getColorPaletteOption(palette);

  return (
    <Dropdown>
      <Button
        aria-label={_(msg`Select color scheme`)}
        size='sm'
        variant='outline'
      >
        <PaletteSwatch color={activePalette.color} />
        {_(activePalette.label)}
        <ChevronDownIcon />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => setPalette(key as ColorPalette)}
          selectedKeys={[palette]}
          selectionMode='single'
        >
          {COLOR_PALETTE.map((paletteOption) => (
            <Dropdown.Item
              id={paletteOption.key}
              key={paletteOption.key}
              textValue={_(paletteOption.label)}
            >
              <PaletteSwatch color={paletteOption.color} />
              <Label>{_(paletteOption.label)}</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
