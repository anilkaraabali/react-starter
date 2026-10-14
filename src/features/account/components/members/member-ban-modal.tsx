import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { ConfirmDialog } from '@/components/molecules/confirm-dialog';
import { useSetMemberBan } from '@/features/account/api/set-member-ban';
import type { OrganizationMemberDto } from '@/types/organization.types';

type MemberBanModalProps = {
  isOpen: boolean;
  member: OrganizationMemberDto;
  onClose: () => void;
};

export function MemberBanModal({
  isOpen,
  member,
  onClose,
}: MemberBanModalProps) {
  const { _ } = useLingui();
  const setMemberBanMutation = useSetMemberBan({
    mutationConfig: {
      onSuccess: () => {
        toast.success(_(msg`Member banned.`));
        onClose();
      },
    },
  });

  return (
    <ConfirmDialog
      confirmLabel={_(msg`Ban Member`)}
      isOpen={isOpen}
      isPending={setMemberBanMutation.isPending}
      onClose={onClose}
      onConfirm={() =>
        setMemberBanMutation.mutateAsync({
          banned: true,
          userId: member.userId,
        })
      }
      title={_(msg`Ban Member`)}
    >
      <Trans>
        Are you sure you want to ban <strong>{member.name}</strong>? They will
        no longer be able to access the application.
      </Trans>
    </ConfirmDialog>
  );
}
