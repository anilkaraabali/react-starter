import { DateField, type DateFieldProps, Label } from '@heroui/react';
import type { CalendarDate } from '@internationalized/date';
import type { ReactNode } from 'react';

import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';

import { FormFieldFooter } from './form-field-footer';

type FormDateFieldProps = Omit<
  DateFieldProps<CalendarDate>,
  'children' | 'onChange' | 'value'
> & {
  description?: ReactNode;
  label: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function FormDateField({
  description,
  label,
  prefix,
  suffix,
  variant,
  ...props
}: FormDateFieldProps) {
  const field = useFieldContext<CalendarDate | null>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <DateField
      fullWidth
      isInvalid={!!errorMessage}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={field.handleChange}
      value={field.state.value}
      {...props}
    >
      <Label>{label}</Label>
      <DateField.Group variant={variant}>
        {prefix ? <DateField.Prefix>{prefix}</DateField.Prefix> : null}
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        {suffix ? <DateField.Suffix>{suffix}</DateField.Suffix> : null}
      </DateField.Group>
      <FormFieldFooter description={description} errorMessage={errorMessage} />
    </DateField>
  );
}
