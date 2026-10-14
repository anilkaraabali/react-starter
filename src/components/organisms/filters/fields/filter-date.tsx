import { DatePicker, Label } from '@heroui/react';
import type { CalendarDate } from '@internationalized/date';
import { DatePickerGroup } from '@/components/molecules/date-picker-group';
import { DatePickerPopover } from '@/components/molecules/date-picker-popover';
import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';

type FilterDateProps = {
  config: FilterFieldConfig;
  onChange: (value: CalendarDate | null) => void;
  value: CalendarDate | null;
};

export function FilterDate({ config, onChange, value }: FilterDateProps) {
  return (
    <DatePicker onChange={onChange} value={value}>
      <Label>{config.label}</Label>
      <DatePickerGroup variant='secondary' />
      <DatePickerPopover label={config.label} />
    </DatePicker>
  );
}
