import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import {
  ErrorComponent,
  type ErrorComponentProps,
} from '@tanstack/react-router';
import { AxiosError } from 'axios';

import ServerErrorIcon from '@/assets/500.svg?react';
import { ErrorActions } from './error-actions';
import { ErrorLayout } from './error-layout';

export function ErrorGenericLayout({ error }: ErrorComponentProps) {
  const { _ } = useLingui();

  const getErrorTitle = () =>
    _(
      msg`Oops! That didn’t work as expected. We’ve been notified and will fix it soon.`
    );

  if (error instanceof AxiosError) {
    return (
      <ErrorLayout
        actions={<ErrorActions />}
        description={error.message}
        icon={<ServerErrorIcon className='text-accent' />}
        title={getErrorTitle()}
      />
    );
  }

  if (error instanceof Error) {
    return (
      <ErrorLayout
        actions={<ErrorActions />}
        description={error.message}
        icon={<ServerErrorIcon className='text-accent' />}
        title={getErrorTitle()}
      />
    );
  }

  return <ErrorComponent error={error} />;
}
