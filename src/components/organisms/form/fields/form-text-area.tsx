import { Label, TextArea, TextField, type TextFieldProps } from '@heroui/react';
import type { ReactNode } from 'react';

import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';

import { FormFieldFooter } from './form-field-footer';

type FormTextAreaProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  description?: ReactNode;
  label: string;
  placeholder?: string;
  rows?: number;
};

export function FormTextArea({
  description,
  label,
  placeholder,
  rows = 3,
  ...props
}: FormTextAreaProps) {
  const field = useFieldContext<string>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <TextField
      fullWidth
      isInvalid={!!errorMessage}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={(value) => field.handleChange(value)}
      value={field.state.value ?? ''}
      {...props}
    >
      <Label>{label}</Label>
      <TextArea
        placeholder={placeholder}
        rows={rows}
        style={{ resize: 'vertical' }}
      />
      <FormFieldFooter description={description} errorMessage={errorMessage} />
    </TextField>
  );
}
