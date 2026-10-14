import { Label, NumberField, type NumberFieldProps } from '@heroui/react';
import type { ReactNode } from 'react';
import { NumberFieldGroup } from '@/components/molecules/number-field-group';
import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';
import { FormFieldFooter } from './form-field-footer';

type FormNumberFieldProps = Omit<
  NumberFieldProps,
  'children' | 'onChange' | 'value'
> & {
  description?: ReactNode;
  label: string;
  placeholder?: string;
  prefix?: ReactNode;
};

export function FormNumberField({
  description,
  label,
  prefix,
  placeholder,
  ...props
}: FormNumberFieldProps) {
  const field = useFieldContext<number | undefined>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <NumberField
      isInvalid={!!errorMessage}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={(val) => {
        field.handleChange(Number.isNaN(val) ? undefined : val);
      }}
      // NaN keeps the field controlled while empty.
      value={field.state.value ?? Number.NaN}
      {...props}
    >
      <Label>{label}</Label>
      <NumberFieldGroup placeholder={placeholder} prefix={prefix} />
      <FormFieldFooter description={description} errorMessage={errorMessage} />
    </NumberField>
  );
}
