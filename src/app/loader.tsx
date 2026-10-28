import { Spinner } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';

export function Loader() {
  const { t } = useLingui();

  return (
    <div
      className='size-screen fixed inset-0 z-9999 flex flex-col items-center justify-center gap-2'
      tabIndex={-1}
    >
      <Spinner color='accent' />
      <span className='text-muted text-xs'>{t`Loading`}...</span>
    </div>
  );
}
