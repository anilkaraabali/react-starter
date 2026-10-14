import {
  cn,
  InputGroup,
  Label,
  TextField,
  type TextFieldProps,
} from '@heroui/react';
import type { ReactNode } from 'react';
import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';
import { FormFieldFooter } from './form-field-footer';

type FormInputClassNames = {
  inputGroup?: string;
  prefix?: string;
  suffix?: string;
};

export type FormInputProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  classNames?: FormInputClassNames;
  description?: ReactNode;
  label: string;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export function FormInput({
  classNames,
  description,
  label,
  placeholder,
  prefix,
  suffix,
  ...props
}: FormInputProps) {
  const field = useFieldContext<number | string>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <TextField
      fullWidth
      isInvalid={!!errorMessage}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={(value) => field.handleChange(value)}
      value={String(field.state.value ?? '')}
      {...props}
    >
      <Label>{label}</Label>
      {/* TODO: `overflow-hidden` clips browser autocomplete dropdown — remove when HeroUI fixes it */}
      <InputGroup className={cn('overflow-hidden', classNames?.inputGroup)}>
        {prefix && (
          <InputGroup.Prefix className={classNames?.prefix}>
            {prefix}
          </InputGroup.Prefix>
        )}
        <InputGroup.Input placeholder={placeholder} />
        {suffix && (
          <InputGroup.Suffix className={classNames?.suffix}>
            {suffix}
          </InputGroup.Suffix>
        )}
      </InputGroup>
      <FormFieldFooter description={description} errorMessage={errorMessage} />
    </TextField>
  );
}
