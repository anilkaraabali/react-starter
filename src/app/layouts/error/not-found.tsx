import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

import NotFoundIcon from '@/assets/404.svg?react';
import { ErrorActions } from './error-actions';
import { ErrorLayout } from './error-layout';

export function NotFound() {
  const { t } = useLingui();

  return (
    <ErrorLayout
      actions={<ErrorActions />}
      description={t(
        msg`Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved.`
      )}
      icon={<NotFoundIcon className='text-accent' />}
      title={t`You have found a secret place.`}
    />
  );
}
