import {
  Description,
  FieldError,
  Label,
  Radio,
  RadioGroup,
  type RadioGroupProps,
} from '@heroui/react';
import type { ReactNode } from 'react';

import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { handleFieldBlur } from '../utils/form-field.utils';

type FormRadioGroupOption<T extends FormRadioGroupValue = string> = {
  label: string;
  value: T;
};

type FormRadioGroupProps<T extends FormRadioGroupValue = string> = Omit<
  RadioGroupProps,
  'children' | 'onChange' | 'value'
> & {
  description?: ReactNode;
  label: string;
  options: Array<FormRadioGroupOption<T>>;
};

type FormRadioGroupValue = string;

export function FormRadioGroup<T extends FormRadioGroupValue = string>({
  description,
  label,
  options,
  ...props
}: FormRadioGroupProps<T>) {
  const field = useFieldContext<null | T | undefined>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <RadioGroup
      isInvalid={!!errorMessage}
      name={field.name}
      onBlur={() => handleFieldBlur(field)}
      onChange={(value) => field.handleChange(value as T)}
      value={field.state.value ?? undefined}
      {...props}
    >
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            {option.label}
          </Radio.Content>
        </Radio>
      ))}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </RadioGroup>
  );
}
