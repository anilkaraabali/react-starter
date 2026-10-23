import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import NotFoundIcon from '@/assets/404.svg?react';
import { ErrorActions } from './error-actions';
import { ErrorLayout } from './error-layout';

export function NotFound() {
  const { _ } = useLingui();

  return (
    <ErrorLayout
      actions={<ErrorActions />}
      description={_(
        msg`Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved.`
      )}
      icon={<NotFoundIcon className='text-accent' />}
      title={_(msg`You have found a secret place.`)}
    />
  );
}
