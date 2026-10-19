import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { useCreateMember } from '@/features/account/api/create-member';
import { NameEmailFieldsGroup } from '@/features/account/components/forms/name-email-fields-group';
import {
  type CreateMemberInput,
  createMemberDefaultValues,
  createMemberInputSchema,
} from '@/features/account/types/create-member-input';
import { ORGANIZATION_INVITE_ROLES } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';

type CreateMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateMemberModal({ isOpen, onClose }: CreateMemberModalProps) {
  const { _ } = useLingui();
  const createMemberMutation = useCreateMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Member added.`));
        onClose();
      },
    },
  });

  const form = useForm({
    defaultValues: createMemberDefaultValues,
    onSubmit: async (data: CreateMemberInput) => {
      await createMemberMutation.mutateAsync({ data });
    },
    schema: createMemberInputSchema,
  });

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={_(msg`Create`)}
      title={_(msg`Add member`)}
    >
      <div className='grid gap-4'>
        <NameEmailFieldsGroup
          fields={{
            email: 'email',
            name: 'name',
          }}
          form={form}
        />

        <form.AppField name='password'>
          {(field) => (
            <field.FormPasswordInput
              autoComplete='new-password'
              isRequired
              label={_(msg`Temporary password`)}
              variant='secondary'
            />
          )}
        </form.AppField>

        <form.AppField name='role'>
          {(field) => (
            <field.FormSelect
              isRequired
              label={_(msg`Role`)}
              options={ORGANIZATION_INVITE_ROLES.map((role) => ({
                label: getOrganizationRoleLabel(role),
                value: role,
              }))}
              variant='secondary'
            />
          )}
        </form.AppField>
      </div>
    </FormModalShell>
  );
}
