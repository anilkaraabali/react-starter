import { Autocomplete, type Key, Label } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { AutocompletePopover } from '@/components/molecules/autocomplete-popover';
import type {
  FilterOption,
  FilterValue,
} from '@/components/organisms/filters/filters.types';

type FilterAutocompleteProps = {
  label: string;
  options?: FilterOption[];
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterAutocomplete({
  label,
  onChange,
  options = [],
  value,
}: FilterAutocompleteProps) {
  const { _ } = useLingui();

  return (
    <Autocomplete
      allowsEmptyCollection
      fullWidth
      onChange={onChange}
      placeholder={_(msg`Select one`)}
      selectionMode='single'
      value={value as Key}
      variant='secondary'
    >
      <Label>{label}</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <AutocompletePopover options={options} />
    </Autocomplete>
  );
}
