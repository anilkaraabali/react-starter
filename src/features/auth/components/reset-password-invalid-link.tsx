import { Link } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

export function ResetPasswordInvalidLink() {
  const { _ } = useLingui();

  return (
    <>
      <div className='mb-6'>
        <h1 className='font-bold text-xl'>{_(msg`Invalid reset link`)}</h1>
        <p className='mt-1.5 text-muted text-sm'>
          {_(
            msg`This password reset link is invalid or has expired. Request a new one to continue.`
          )}
        </p>
      </div>

      <p className='text-center text-muted text-sm'>
        <Link href='/forgot-password'>{_(msg`Request a new link`)}</Link>
      </p>
    </>
  );
}
