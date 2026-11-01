import { Button, Spinner } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { PencilLineIcon, SaveIcon } from 'lucide-react';

type FormPrimaryActionButtonProps = {
  editLabel?: string;
  formId?: string;
  isSavePending?: boolean;
  onEdit?: () => void;
  submitLabel?: string;
};

export function FormPrimaryActionButton({
  editLabel,
  formId,
  isSavePending = false,
  onEdit,
  submitLabel,
}: FormPrimaryActionButtonProps) {
  const { t } = useLingui();

  if (formId) {
    return (
      <Button form={formId} isPending={isSavePending} type='submit'>
        {({ isPending }) => (
          <>
            {isPending ? (
              <Spinner color='current' size='sm' />
            ) : (
              <SaveIcon aria-hidden />
            )}
            {submitLabel ?? t`Save changes`}
          </>
        )}
      </Button>
    );
  }

  if (onEdit) {
    return (
      <Button onPress={onEdit} type='button'>
        <PencilLineIcon aria-hidden />
        {editLabel ?? t`Edit`}
      </Button>
    );
  }

  return null;
}
