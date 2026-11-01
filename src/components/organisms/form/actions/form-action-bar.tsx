import { Button, cn, Typography } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { useRouter } from '@tanstack/react-router';
import { CheckIcon, CircleAlertIcon } from 'lucide-react';
import { useSticky } from '@/hooks/use-sticky';
import { formatDate } from '@/utils/format.utils';
import { useFormContext } from '../form-context';
import { FormPrimaryActionButton } from './form-primary-action-button';

type FormActionBarProps = {
  formId: string;
  lastSavedAt?: Date | string;
  onCancel?: () => void;
  submitLabel?: string;
};

export function FormActionBar({
  formId,
  lastSavedAt,
  onCancel,
  submitLabel,
}: FormActionBarProps) {
  const { t } = useLingui();
  const router = useRouter();
  const form = useFormContext();
  const [ref, isSticky] = useSticky<HTMLDivElement>(true, 'bottom');

  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 -mx-4 box-content flex h-(--header-height) items-center justify-between gap-4 px-4 transition-[border-color,background-color] sm:-mx-6 sm:px-6',
        isSticky
          ? 'bg-background shadow-background border-t border-(--header-edge-outline) backdrop-blur-[18px] backdrop-saturate-110'
          : 'border-t border-transparent'
      )}
      ref={ref}
    >
      <form.Subscribe selector={(state) => !state.isDefaultValue}>
        {(isDirty) =>
          isDirty ? (
            <div className='flex items-center gap-2'>
              <CircleAlertIcon aria-hidden className='text-warning' />
              <Typography.Paragraph size='sm'>
                {t(msg`Unsaved changes`)}
              </Typography.Paragraph>
            </div>
          ) : lastSavedAt ? (
            <div className='flex items-center gap-2'>
              <CheckIcon aria-hidden className='text-success' />
              <Typography.Paragraph color='muted' size='sm'>
                {t(msg`All changes saved · ${formatDate(lastSavedAt)}`)}
              </Typography.Paragraph>
            </div>
          ) : (
            <span />
          )
        }
      </form.Subscribe>
      <div className='flex items-center gap-2'>
        <Button
          onPress={onCancel ?? (() => router.history.back())}
          type='button'
          variant='secondary'
        >
          {t(msg`Cancel`)}
        </Button>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <FormPrimaryActionButton
              formId={formId}
              isSavePending={isSubmitting}
              submitLabel={submitLabel}
            />
          )}
        </form.Subscribe>
      </div>
    </div>
  );
}
