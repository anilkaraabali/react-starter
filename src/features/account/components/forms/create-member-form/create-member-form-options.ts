import { formOptions } from '@tanstack/react-form';

import { createFormValidators } from '@/components/organisms/form/utils/form-validator.utils';
import {
  type CreateMemberInput,
  CreateMemberSchema,
} from '@/features/account/types/create-member-input';

export const createMemberDefaultValues: CreateMemberInput = {
  email: '',
  name: '',
  password: '',
  role: 'support_agent',
};

type CreateMemberFormOptionsProps = {
  defaultValues?: Partial<CreateMemberInput>;
  onSubmit: (data: CreateMemberInput) => Promise<void> | void;
};

export function createMemberFormOptions({
  defaultValues,
  onSubmit,
}: CreateMemberFormOptionsProps) {
  return formOptions({
    defaultValues: {
      ...createMemberDefaultValues,
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit(CreateMemberSchema.parse(value)),
    validators: createFormValidators(CreateMemberSchema),
  });
}
