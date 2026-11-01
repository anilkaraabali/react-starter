import { toast } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useCreateMember } from '@/api/endpoints/organizations/create-member';
import { FormModalShell } from '@/components/organisms/form/modals/form-modal-shell';
import { useForm } from '@/components/organisms/form/use-form';
import { NameEmailFieldsGroup } from '@/features/account/components/forms/name-email-fields-group';
import {
  type CreateMemberFormValues,
  createMemberFormDefaultValues,
  createMemberFormSchema,
} from '@/features/account/schemas/create-member-form-schema';
import { ORGANIZATION_INVITE_ROLES } from '@/features/account/utils/member-role.utils';
import { getOrganizationRoleLabel } from '@/lib/authorization/organization-role.utils';

type CreateMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateMemberModal({ isOpen, onClose }: CreateMemberModalProps) {
  const { t } = useLingui();
  const createMemberMutation = useCreateMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Member added.`);
        onClose();
      },
    },
  });

  const form = useForm({
    defaultValues: createMemberFormDefaultValues,
    onSubmit: async (data: CreateMemberFormValues) => {
      await createMemberMutation.mutateAsync({ data });
    },
    schema: createMemberFormSchema,
  });

  return (
    <FormModalShell
      form={form}
      isOpen={isOpen}
      onClose={onClose}
      submitLabel={t`Create`}
      title={t`Add member`}
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
              label={t`Temporary password`}
              variant='secondary'
            />
          )}
        </form.AppField>

        <form.AppField name='role'>
          {(field) => (
            <field.FormSelect
              isRequired
              label={t`Role`}
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
