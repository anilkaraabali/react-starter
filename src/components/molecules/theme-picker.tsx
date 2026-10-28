import { Button, Dropdown, Label } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { ChevronDownIcon } from 'lucide-react';
import { themeOptions } from '@/config/theme';
import { usePreferences } from '@/stores/preferences-provider';
import type { Theme } from '@/types/theme.types';

export function ThemePicker() {
  const { t } = useLingui();
  const { setTheme, theme } = usePreferences();

  const activeTheme = themeOptions.find((t) => t.key === theme);

  return (
    <Dropdown>
      <Button aria-label={t`Select theme`} size='sm' variant='outline'>
        {activeTheme ? <activeTheme.icon /> : null}
        {activeTheme ? t(activeTheme.label) : null}
        <ChevronDownIcon />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => setTheme(key as Theme)}
          selectedKeys={[theme]}
          selectionMode='single'
        >
          {themeOptions.map((themeOption) => (
            <Dropdown.Item
              id={themeOption.key}
              key={themeOption.key}
              textValue={t(themeOption.label)}
            >
              <themeOption.icon />
              <Label>{t(themeOption.label)}</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
