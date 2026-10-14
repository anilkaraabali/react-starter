import type { ReactNode } from 'react';

type AuthFormShellProps = {
  /** The form itself: the owner supplies `<form.AppForm>` and its fields. */
  children: ReactNode;
  description: string;
  /** Optional navigation line below the form, e.g. a `<Trans>` with a link. */
  footer?: ReactNode;
  title: string;
};

/** Card content shared by the `/_auth` views: heading, form, footer. */
export function AuthFormShell({
  children,
  description,
  footer,
  title,
}: AuthFormShellProps) {
  return (
    <>
      <div className='mb-6'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <p className='mt-1.5 text-muted text-sm'>{description}</p>
      </div>

      <div className='flex flex-col gap-3 sm:gap-4'>
        {children}
        {footer ? (
          <p className='-mt-2 text-center text-muted text-sm'>{footer}</p>
        ) : null}
      </div>
    </>
  );
}
