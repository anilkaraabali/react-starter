import { Checkbox, type CheckboxProps } from '@heroui/react';
import type { ReactNode } from 'react';

import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';
import { FormFieldFooter } from './form-field-footer';

type FormCheckboxProps = Omit<CheckboxProps, 'isSelected' | 'onChange'> & {
  description?: ReactNode;
  label: string;
};

export function FormCheckbox({
  description,
  label,
  ...props
}: FormCheckboxProps) {
  const field = useFieldContext<boolean>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <Checkbox
      isInvalid={!!errorMessage}
      isSelected={Boolean(field.state.value)}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={field.handleChange}
      {...props}
    >
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        {label}
      </Checkbox.Content>
      <FormFieldFooter description={description} errorMessage={errorMessage} />
    </Checkbox>
  );
}
