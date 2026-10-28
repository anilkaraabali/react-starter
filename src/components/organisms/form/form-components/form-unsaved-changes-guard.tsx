import { AlertDialog, Button } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useBlocker } from '@tanstack/react-router';
import { useFormContext } from '../form-context';

export function FormUnsavedChangesGuard() {
  const { t } = useLingui();
  const form = useFormContext();

  // Submit handlers navigate on success while `isSubmitting` is still true.
  const hasUnsavedChanges = () =>
    !form.state.isDefaultValue && !form.state.isSubmitting;

  const { proceed, reset, status } = useBlocker({
    enableBeforeUnload: hasUnsavedChanges,
    shouldBlockFn: hasUnsavedChanges,
    withResolver: true,
  });

  return (
    <AlertDialog>
      <AlertDialog.Backdrop
        isOpen={status === 'blocked'}
        onOpenChange={(open) => {
          if (!open) reset?.();
        }}
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status='warning' />
              <AlertDialog.Heading>
                {t`Discard unsaved changes?`}
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              {t(
                msg`You have unsaved changes. If you leave this page, they will be lost.`
              )}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot='close' variant='tertiary'>
                {t`Keep editing`}
              </Button>
              <Button onPress={proceed} variant='danger'>
                {t`Discard changes`}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
