import { Button, Dropdown, Label } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ChevronDownIcon } from 'lucide-react';
import { THEME_OPTIONS } from '@/config/theme.constants';
import { usePreferences } from '@/stores/preferences-provider';
import type { Theme } from '@/types/theme.types';

export function ThemePicker() {
  const { _ } = useLingui();
  const { setTheme, theme } = usePreferences();

  const activeTheme = THEME_OPTIONS.find((t) => t.key === theme);

  return (
    <Dropdown>
      <Button aria-label={_(msg`Select theme`)} size='sm' variant='outline'>
        {activeTheme ? <activeTheme.icon /> : null}
        {activeTheme ? _(activeTheme.label) : null}
        <ChevronDownIcon />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => setTheme(key as Theme)}
          selectedKeys={[theme]}
          selectionMode='single'
        >
          {THEME_OPTIONS.map((themeOption) => (
            <Dropdown.Item
              id={themeOption.key}
              key={themeOption.key}
              textValue={_(themeOption.label)}
            >
              <themeOption.icon />
              <Label>{_(themeOption.label)}</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
