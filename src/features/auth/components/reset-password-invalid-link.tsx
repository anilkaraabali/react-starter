import { Link } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

export function ResetPasswordInvalidLink() {
  const { t } = useLingui();

  return (
    <>
      <div className='mb-6'>
        <h1 className='text-xl font-bold'>{t`Invalid reset link`}</h1>
        <p className='text-muted mt-1.5 text-sm'>
          {t(
            msg`This password reset link is invalid or has expired. Request a new one to continue.`
          )}
        </p>
      </div>

      <p className='text-muted text-center text-sm'>
        <Link href='/forgot-password'>{t`Request a new link`}</Link>
      </p>
    </>
  );
}
