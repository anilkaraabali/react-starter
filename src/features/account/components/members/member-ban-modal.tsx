import { toast } from '@heroui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useSetMemberBan } from '@/api/endpoints/organizations/set-member-ban';
import type { OrganizationMemberDto } from '@/api/models/organizations/organization-member-dto';
import { ConfirmDialog } from '@/components/molecules/confirm-dialog';

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
  const { t } = useLingui();
  const setMemberBanMutation = useSetMemberBan({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`Member banned.`);
        onClose();
      },
    },
  });

  return (
    <ConfirmDialog
      confirmLabel={t`Ban Member`}
      isOpen={isOpen}
      isPending={setMemberBanMutation.isPending}
      onClose={onClose}
      onConfirm={() =>
        setMemberBanMutation.mutateAsync({
          banned: true,
          userId: member.userId,
        })
      }
      title={t`Ban Member`}
    >
      <Trans>
        Are you sure you want to ban <strong>{member.name}</strong>? They will
        no longer be able to access the application.
      </Trans>
    </ConfirmDialog>
  );
}
