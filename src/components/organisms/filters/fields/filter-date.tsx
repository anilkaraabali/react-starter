import { DatePicker, Label } from '@heroui/react';
import { DatePickerGroup } from '@/components/molecules/date-picker-group';
import { DatePickerPopover } from '@/components/molecules/date-picker-popover';
import type { FilterValue } from '@/components/organisms/filters/filters.types';
import {
  parseDateFilterValue,
  serializeDateFilterValue,
} from '@/components/organisms/filters/utils/filter-date.utils';

type FilterDateProps = {
  label: string;
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterDate({ label, onChange, value }: FilterDateProps) {
  return (
    <DatePicker
      onChange={(next) => onChange(serializeDateFilterValue(next))}
      value={parseDateFilterValue(value)}
    >
      <Label>{label}</Label>
      <DatePickerGroup variant='secondary' />
      <DatePickerPopover label={label} />
    </DatePicker>
  );
}
