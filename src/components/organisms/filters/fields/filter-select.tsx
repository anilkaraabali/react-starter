import { type Key, Label, ListBox, Select } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';

type FilterSelectProps = {
  config: FilterFieldConfig;
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterSelect({ config, onChange, value }: FilterSelectProps) {
  const { _ } = useLingui();
  const options = config.options ?? [];
  const isMulti = config.type === 'multiselect';

  if (isMulti) {
    return (
      <Select
        fullWidth
        onChange={(keys) => onChange(keys as Key[])}
        placeholder={_(msg`Select one`)}
        selectionMode='multiple'
        value={value as Key[]}
        variant='secondary'
      >
        <Label>{config.label}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode='multiple'>
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

  return (
    <Select
      fullWidth
      onChange={onChange}
      placeholder={_(msg`Select one`)}
      value={value as Key}
      variant='secondary'
    >
      <Label>{config.label}</Label>
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
