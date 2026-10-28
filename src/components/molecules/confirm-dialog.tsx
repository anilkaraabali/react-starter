import { AlertDialog, Button, Spinner } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { ComponentProps, ReactNode } from 'react';

type ConfirmDialogProps = {
  children: ReactNode;
  confirmLabel: ReactNode;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => Promise<unknown>;
  status?: ComponentProps<typeof AlertDialog.Icon>['status'];
  title: ReactNode;
};

export function ConfirmDialog({
  children,
  confirmLabel,
  isOpen,
  isPending,
  onClose,
  onConfirm,
  status = 'danger',
  title,
}: ConfirmDialogProps) {
  const { t } = useLingui();

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch {
      // Error toast handled by mutation / global handler
    }
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Backdrop
        isDismissable={!isPending}
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger isDisabled={isPending} />
            <AlertDialog.Header>
              <AlertDialog.Icon status={status} />
              <AlertDialog.Heading>{title}</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>{children}</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button
                isDisabled={isPending}
                onPress={handleClose}
                slot='close'
                variant='tertiary'
              >
                {t`Cancel`}
              </Button>
              <Button
                isPending={isPending}
                onPress={handleConfirm}
                slot='close'
                variant='danger'
              >
                {({ isPending: pending }) => (
                  <>
                    {pending ? <Spinner color='current' size='sm' /> : null}
                    {confirmLabel}
                  </>
                )}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
