import { Button, Spinner } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { PencilLineIcon, SaveIcon } from 'lucide-react';

type FormPrimaryActionButtonProps = {
  formId?: string;
  isSavePending?: boolean;
  onEdit?: () => void;
};

export function FormPrimaryActionButton({
  formId,
  isSavePending = false,
  onEdit,
}: FormPrimaryActionButtonProps) {
  const { _ } = useLingui();

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
            {_(msg`Save`)}
          </>
        )}
      </Button>
    );
  }

  if (onEdit) {
    return (
      <Button onPress={onEdit} type='button'>
        <PencilLineIcon aria-hidden />
        {_(msg`Edit`)}
      </Button>
    );
  }

  return null;
}
