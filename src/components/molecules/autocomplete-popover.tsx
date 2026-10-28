import {
  Autocomplete,
  Description,
  EmptyState,
  type Key,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { ReactNode } from 'react';

type AutocompletePopoverOption = {
  description?: ReactNode;
  label: ReactNode;
  prefix?: ReactNode;
  value: Key;
};

type AutocompletePopoverProps = {
  options: AutocompletePopoverOption[];
};

export function AutocompletePopover({ options }: AutocompletePopoverProps) {
  const { t } = useLingui();
  const { contains } = useFilter({ sensitivity: 'base' });

  return (
    <Autocomplete.Popover>
      <Autocomplete.Filter filter={contains}>
        <SearchField autoFocus name='search' variant='secondary'>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder={t`Search...`} />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <ListBox
          renderEmptyState={() => (
            <EmptyState>{t`No results found`}</EmptyState>
          )}
        >
          {options.map((option) => (
            <ListBox.Item
              id={option.value}
              key={option.value}
              textValue={[option.label, option.description]
                .filter((part) => typeof part === 'string')
                .join(' ')}
            >
              {option.prefix ? <span>{option.prefix}</span> : null}
              {option.description ? (
                <div className='flex flex-col'>
                  <Label>{option.label}</Label>
                  <Description>{option.description}</Description>
                </div>
              ) : (
                option.label
              )}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  );
}
