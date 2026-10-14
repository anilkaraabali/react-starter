import {
  Autocomplete,
  type AutocompleteProps,
  type Key,
  Label,
} from '@heroui/react';
import type { ReactNode } from 'react';
import { AutocompletePopover } from '@/components/molecules/autocomplete-popover';
import { useFieldContext } from '../form-context';
import { getFormError } from '../utils/form-error.utils';
import { FormFieldFooter } from './form-field-footer';

type FormAutocompleteOption<T extends FormAutocompleteValue = Key> = {
  description?: ReactNode;
  label: ReactNode;
  prefix?: ReactNode;
  value: T;
};

type FormAutocompleteProps<T extends FormAutocompleteValue = string> = Omit<
  AutocompleteProps<object, 'single'>,
  'children' | 'onChange' | 'selectionMode' | 'value'
> & {
  description?: ReactNode;
  label: string;
  options: Array<FormAutocompleteOption<T>>;
};

type FormAutocompleteValue = Key;

export function FormAutocomplete<T extends FormAutocompleteValue = Key>({
  description,
  label,
  options,
  placeholder,
  variant,
  ...props
}: FormAutocompleteProps<T>) {
  const field = useFieldContext<T>();
  const errorMessage = getFormError(field.state.meta);

  return (
    <Autocomplete
      fullWidth
      isInvalid={!!errorMessage}
      name={field.name}
      onChange={(key) => {
        field.handleChange(key as T);
      }}
      placeholder={placeholder}
      selectionMode='single'
      value={field.state.value ?? null}
      variant={variant}
      {...props}
    >
      <Label>{label}</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value className='flex items-center gap-2' />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <FormFieldFooter description={description} errorMessage={errorMessage} />
      <AutocompletePopover options={options} />
    </Autocomplete>
  );
}
