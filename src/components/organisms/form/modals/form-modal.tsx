import { Button, Modal, Spinner } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { ReactNode } from 'react';

type FormModalProps = {
  children: ReactNode;
  /** Id of the `<form>` rendered in `children`; the submit button sits in the footer. */
  formId: string;
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  submitLabel: ReactNode;
  title: ReactNode;
};

export function FormModal({
  children,
  formId,
  isOpen,
  isPending,
  onClose,
  submitLabel,
  title,
}: FormModalProps) {
  const { _ } = useLingui();

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Modal>
      <Modal.Backdrop
        isDismissable={!isPending}
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger isDisabled={isPending} />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
              <Button isDisabled={isPending} slot='close' variant='secondary'>
                {_(msg`Cancel`)}
              </Button>
              <Button form={formId} isPending={isPending} type='submit'>
                {({ isPending: pending }) => (
                  <>
                    {pending ? <Spinner color='current' size='sm' /> : null}
                    {submitLabel}
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
