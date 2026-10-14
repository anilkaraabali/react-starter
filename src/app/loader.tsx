import { Spinner } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

export function Loader() {
  const { _ } = useLingui();

  return (
    <div
      className='fixed inset-0 z-9999 flex size-screen flex-col items-center justify-center gap-2'
      tabIndex={-1}
    >
      <Spinner color='accent' />
      <span className='text-muted text-xs'>{_(msg`Loading`)}...</span>
    </div>
  );
}
