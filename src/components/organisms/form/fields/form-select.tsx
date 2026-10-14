import {
  type Key,
  Label,
  ListBox,
  Select,
  type SelectProps,
} from '@heroui/react';
import type { ReactNode } from 'react';

import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';

import { FormFieldFooter } from './form-field-footer';

type FormSelectOption<T extends FormSelectValue = Key> = {
  label: string;
  prefix?: ReactNode;
  value: T;
};

type FormSelectProps<T extends FormSelectValue = string> = Omit<
  SelectProps<FormSelectOption>,
  'children' | 'onChange' | 'value'
> & {
  description?: ReactNode;
  label: string;
  options: Array<FormSelectOption<T>>;
};

type FormSelectValue = Key;

export function FormSelect<T extends FormSelectValue = string>({
  description,
  label,
  options,
  ...props
}: FormSelectProps<T>) {
  const field = useFieldContext<T>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <Select
      isInvalid={!!errorMessage}
      name={field.name}
      onChange={(key) => {
        field.handleChange(key as T);
      }}
      value={field.state.value}
      {...props}
    >
      <Label>{label}</Label>
      <Select.Trigger className='items-center'>
        <Select.Value className='flex items-center gap-2' />
        <Select.Indicator />
      </Select.Trigger>
      <FormFieldFooter description={description} errorMessage={errorMessage} />
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              className='items-center'
              id={option.value}
              key={option.value}
              textValue={option.label}
            >
              {option.prefix ? (
                <span className='inline-flex items-center'>
                  {option.prefix}
                </span>
              ) : null}
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
