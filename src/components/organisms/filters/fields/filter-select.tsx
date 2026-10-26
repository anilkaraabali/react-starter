import { type Key, Label, ListBox, Select } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import type {
  FilterOption,
  FilterValue,
} from '@/components/organisms/filters/filters.types';

type FilterSelectProps = {
  label: string;
  options?: FilterOption[];
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterSelect({
  label,
  onChange,
  options = [],
  value,
}: FilterSelectProps) {
  const { _ } = useLingui();

  return (
    <Select
      fullWidth
      onChange={onChange}
      placeholder={_(msg`Select one`)}
      value={value as Key}
      variant='secondary'
    >
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              id={option.value}
              key={option.value}
              textValue={option.label}
            >
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
