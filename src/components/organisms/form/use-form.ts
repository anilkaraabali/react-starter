import { createFormHook } from '@tanstack/react-form';
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

export const {
  useAppForm: useForm,
  withFieldGroup,
  withForm,
} = createFormHook({
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
