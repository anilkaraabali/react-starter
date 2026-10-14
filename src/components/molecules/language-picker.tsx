import { Button, Dropdown, Label } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ChevronDownIcon } from 'lucide-react';
import { LANGUAGES } from '@/config/language.constants';
import { useLanguage } from '@/hooks/use-language';

export function LanguagePicker() {
  const { _ } = useLingui();
  const { language, setLanguage } = useLanguage();

  const activeLanguage = LANGUAGES.find((l) => l.key === language);

  return (
    <Dropdown>
      <Button aria-label={_(msg`Select language`)} size='sm' variant='outline'>
        {activeLanguage?.label}
        <ChevronDownIcon />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          onAction={(key) => setLanguage(key as typeof language)}
          selectedKeys={[language]}
          selectionMode='single'
        >
          {LANGUAGES.map((lang) => (
            <Dropdown.Item id={lang.key} key={lang.key} textValue={lang.label}>
              <Label>{lang.label}</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
