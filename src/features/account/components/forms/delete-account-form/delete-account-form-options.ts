import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type DeleteAccountInput,
  DeleteAccountSchema,
} from '@/features/account/types/delete-account-input';

export const deleteAccountDefaultValues: DeleteAccountInput = {
  password: '',
};

type DeleteAccountFormOptionsProps = {
  defaultValues?: Partial<DeleteAccountInput>;
  onSubmit: (data: DeleteAccountInput) => Promise<void> | void;
};

export function deleteAccountFormOptions({
  defaultValues,
  onSubmit,
}: DeleteAccountFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...deleteAccountDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(DeleteAccountSchema.parse(value)),
    validators: createFormValidators(DeleteAccountSchema),
  });
}
