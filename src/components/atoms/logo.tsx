import { cn } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { HTMLAttributes } from 'react';

import Brandmark from '@/assets/brandmark.svg?react';

type LogoProps = HTMLAttributes<HTMLDivElement> & {
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true, ...props }: LogoProps) {
  const { t } = useLingui();

  return (
    <div
      aria-label={t`Admin Starter logo`}
      className={cn('flex items-center gap-2', className)}
      role='img'
      {...props}
    >
      <Brandmark aria-hidden className='size-8 shrink-0' />
      {showWordmark ? (
        <span className='font-serif text-xl font-semibold tracking-tight'>
          Admin
        </span>
      ) : null}
    </div>
  );
}
