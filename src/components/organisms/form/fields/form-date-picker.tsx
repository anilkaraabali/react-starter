import { DatePicker, type DatePickerProps, Label } from '@heroui/react';
import type { CalendarDate } from '@internationalized/date';
import type { ReactNode } from 'react';
import { DatePickerGroup } from '@/components/molecules/date-picker-group';
import { DatePickerPopover } from '@/components/molecules/date-picker-popover';
import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';
import { FormFieldFooter } from './form-field-footer';

type FormDatePickerProps = Omit<
  DatePickerProps<CalendarDate>,
  'children' | 'onChange' | 'value'
> & {
  description?: ReactNode;
  label: string;
  prefix?: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function FormDatePicker({
  description,
  label,
  prefix,
  variant,
  ...props
}: FormDatePickerProps) {
  const field = useFieldContext<CalendarDate | null>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <DatePicker
      isInvalid={!!errorMessage}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={field.handleChange}
      value={field.state.value}
      {...props}
    >
      <Label>{label}</Label>
      <DatePickerGroup prefix={prefix} variant={variant} />
      <FormFieldFooter description={description} errorMessage={errorMessage} />
      <DatePickerPopover label={label} />
    </DatePicker>
  );
}
