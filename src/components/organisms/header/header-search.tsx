import { Kbd, Label, SearchField } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';

export function HeaderSearch() {
  const { t } = useLingui();

  return (
    <SearchField aria-label={t`Search`} fullWidth name='search'>
      <Label className='sr-only'>Search</Label>
      <SearchField.Group className='pr-0.5'>
        <SearchField.SearchIcon />
        <SearchField.Input
          className='min-w-0 cursor-pointer pr-2 md:w-64 lg:w-80'
          placeholder={t`Search anything...`}
          readOnly
        />
        <Kbd className='hidden shrink-0 bg-background md:flex'>
          <Kbd.Abbr keyValue='command' />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </SearchField.Group>
    </SearchField>
  );
}
