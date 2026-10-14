import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ConfirmDialog } from '@/components/molecules/confirm-dialog';
import { useRemoveMember } from '@/features/account/api/remove-member';
import type { OrganizationMemberDto } from '@/types/organization.types';

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
  const { _ } = useLingui();
  const removeMemberMutation = useRemoveMember({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Member removed.`));
        onClose();
      },
    },
  });

  return (
    <ConfirmDialog
      confirmLabel={_(msg`Remove`)}
      isOpen={isOpen}
      isPending={removeMemberMutation.isPending}
      onClose={onClose}
      onConfirm={() =>
        removeMemberMutation.mutateAsync({ memberId: member.id })
      }
      title={_(msg`Remove Member`)}
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
