import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type RenameOrganizationInput,
  RenameOrganizationSchema,
} from '@/features/account/types/rename-organization-input';

const renameOrganizationDefaultValues: RenameOrganizationInput = {
  name: '',
};

type RenameOrganizationFormOptionsProps = {
  defaultValues?: Partial<RenameOrganizationInput>;
  onSubmit: (data: RenameOrganizationInput) => Promise<void> | void;
};

export function renameOrganizationFormOptions({
  defaultValues,
  onSubmit,
}: RenameOrganizationFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...renameOrganizationDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(RenameOrganizationSchema.parse(value)),
    validators: createFormValidators(RenameOrganizationSchema),
  });
}
