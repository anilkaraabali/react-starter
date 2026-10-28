import { Button, Spinner } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
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
            {t`Save`}
          </>
        )}
      </Button>
    );
  }

  if (onEdit) {
    return (
      <Button onPress={onEdit} type='button'>
        <PencilLineIcon aria-hidden />
        {t`Edit`}
      </Button>
    );
  }

  return null;
}
