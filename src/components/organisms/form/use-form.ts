import { createFormHook, type StandardSchemaV1 } from '@tanstack/react-form';
import type { input as ZodInput, output as ZodOutput, ZodType } from 'zod';
import { FormAutocomplete } from './fields/form-autocomplete';
import { FormCheckbox } from './fields/form-checkbox';
import { FormDateField } from './fields/form-date-field';
import { FormDatePicker } from './fields/form-date-picker';
import { FormInput } from './fields/form-input';
import { FormNumberField } from './fields/form-number-field';
import { FormPasswordInput } from './fields/form-password-input';
import { FormRadioGroup } from './fields/form-radio-group';
import { FormSelect } from './fields/form-select';
import { FormSwitch } from './fields/form-switch';
import { FormTextArea } from './fields/form-text-area';
import { FormRoot } from './form-components/form-root';
import { FormSubmitButton } from './form-components/form-submit-button';
import { FormUnsavedChangesGuard } from './form-components/form-unsaved-changes-guard';
import { fieldContext, formContext } from './form-context';

const { useAppForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormAutocomplete,
    FormCheckbox,
    FormDateField,
    FormDatePicker,
    FormInput,
    FormNumberField,
    FormPasswordInput,
    FormRadioGroup,
    FormSelect,
    FormSwitch,
    FormTextArea,
  },
  fieldContext,
  formComponents: {
    Root: FormRoot,
    SubmitButton: FormSubmitButton,
    UnsavedChangesGuard: FormUnsavedChangesGuard,
  },
  formContext,
});

type UseFormOptions<TSchema extends ZodType> = {
  defaultValues: ZodInput<TSchema>;
  onSubmit: (data: ZodOutput<TSchema>) => Promise<void> | void;
  schema: TSchema;
};

export function useForm<TSchema extends ZodType>({
  defaultValues,
  onSubmit,
  schema,
}: UseFormOptions<TSchema>) {
  const validator: StandardSchemaV1<
    ZodInput<TSchema>,
    ZodOutput<TSchema>
  > = schema;

  return useAppForm({
    defaultValues,
    onSubmit: ({ value }) => onSubmit(schema.parse(value)),
    validators: {
      onChange: validator,
      onSubmit: validator,
    },
  });
}

export type AppForm<TSchema extends ZodType> = ReturnType<
  typeof useForm<TSchema>
>;

export { withFieldGroup };
