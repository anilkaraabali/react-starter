import { Button, Dropdown, Label } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { ChevronDownIcon } from 'lucide-react';
import { PaletteSwatch } from '@/components/atoms/palette-swatch';
import { colorPaletteOptions } from '@/config/color-palette';
import { usePreferences } from '@/stores/preferences-provider';
import type { ColorPalette } from '@/types/color-palette.types';
import { getColorPaletteOption } from '@/utils/color-palette.utils';

export function ColorPalettePicker() {
  const { t } = useLingui();
  const { palette, setPalette } = usePreferences();

  const activePalette = getColorPaletteOption(palette);

  return (
    <Dropdown>
      <Button aria-label={t`Select color scheme`} size='sm' variant='outline'>
        <PaletteSwatch color={activePalette.color} />
        {t(activePalette.label)}
        <ChevronDownIcon />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => setPalette(key as ColorPalette)}
          selectedKeys={[palette]}
          selectionMode='single'
        >
          {colorPaletteOptions.map((paletteOption) => (
            <Dropdown.Item
              id={paletteOption.key}
              key={paletteOption.key}
              textValue={t(paletteOption.label)}
            >
              <PaletteSwatch color={paletteOption.color} />
              <Label>{t(paletteOption.label)}</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
