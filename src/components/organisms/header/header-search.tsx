import { Kbd, Label, SearchField } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

export function HeaderSearch() {
  const { _ } = useLingui();

  return (
    <SearchField aria-label={_(msg`Search`)} fullWidth name='search'>
      <Label className='sr-only'>Search</Label>
      <SearchField.Group className='pr-0.5'>
        <SearchField.SearchIcon />
        <SearchField.Input
          className='min-w-0 cursor-pointer pr-2 md:w-64 lg:w-80'
          placeholder={_(msg`Search anything...`)}
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
