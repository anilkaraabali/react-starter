import { toast } from '@heroui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useRemoveMember } from '@/api/endpoints/organizations/remove-member';
import type { OrganizationMemberDto } from '@/api/models/organizations/organization-member-dto';
import { ConfirmDialog } from '@/components/molecules/confirm-dialog';

type MemberDeleteModalProps = {
  isOpen: boolean;
  member: OrganizationMemberDto;
  onClose: () => void;
};

export function MemberDeleteModal({
  isOpen,
  member,
  onClose,
}: MemberDeleteModalProps) {
  const { t } = useLingui();
  const removeMemberMutation = useRemoveMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Member removed.`);
        onClose();
      },
    },
  });

  return (
    <ConfirmDialog
      confirmLabel={t`Remove`}
      isOpen={isOpen}
      isPending={removeMemberMutation.isPending}
      onClose={onClose}
      onConfirm={() =>
        removeMemberMutation.mutateAsync({ memberId: member.id })
      }
      title={t`Remove Member`}
    >
      <Trans>
        Are you sure you want to remove{' '}
        <b>
          <i>{member.name}</i>
        </b>
        ? This action cannot be undone.
      </Trans>
    </ConfirmDialog>
  );
}
