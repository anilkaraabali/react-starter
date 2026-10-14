import { DateField, DatePicker } from '@heroui/react';
import type { ReactNode } from 'react';

type DatePickerGroupProps = {
  prefix?: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function DatePickerGroup({ prefix, variant }: DatePickerGroupProps) {
  return (
    <DateField.Group fullWidth variant={variant}>
      {prefix ? <DateField.Prefix>{prefix}</DateField.Prefix> : null}
      <DateField.Input>
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateField.Suffix>
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
  );
}
