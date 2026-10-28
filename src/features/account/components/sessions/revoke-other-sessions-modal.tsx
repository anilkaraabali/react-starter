import { toast } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

import { ConfirmDialog } from '@/components/molecules/confirm-dialog';
import { useRevokeOtherSessions } from '@/features/account/api/revoke-other-sessions';

type RevokeOtherSessionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RevokeOtherSessionsModal({
  isOpen,
  onClose,
}: RevokeOtherSessionsModalProps) {
  const { t } = useLingui();
  const revokeOtherSessionsMutation = useRevokeOtherSessions({
    mutationConfig: {
      onSuccess: () => {
        toast.success(t`All other sessions revoked.`);
        onClose();
      },
    },
  });

  return (
    <ConfirmDialog
      confirmLabel={t`Sign out`}
      isOpen={isOpen}
      isPending={revokeOtherSessionsMutation.isPending}
      onClose={onClose}
      onConfirm={() => revokeOtherSessionsMutation.mutateAsync()}
      title={t`Sign Out of All Other Devices`}
    >
      {t(
        msg`All devices except this one will be signed out. This action cannot be undone.`
      )}
    </ConfirmDialog>
  );
}
