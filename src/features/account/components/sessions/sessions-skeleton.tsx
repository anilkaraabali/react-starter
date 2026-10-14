import { Skeleton } from '@heroui/react';

const SESSION_CARD_KEYS = ['first', 'second'] as const;

export function SessionsSkeleton() {
  return (
    <div className='flex flex-col gap-3 self-stretch'>
      {SESSION_CARD_KEYS.map((key) => (
        <div
          className='flex items-start gap-4 rounded-xl border border-border bg-surface p-4'
          key={key}
        >
          <Skeleton className='size-10 shrink-0 rounded-lg' />
          <div className='flex min-w-0 grow flex-col gap-1.5'>
            <Skeleton className='h-4 w-40 rounded-md' />
            <Skeleton className='h-3 w-28 rounded-md' />
            <Skeleton className='mt-1 h-3 w-48 rounded-md' />
            <Skeleton className='h-3 w-36 rounded-md' />
          </div>
          <Skeleton className='h-6 w-24 shrink-0 rounded-full' />
        </div>
      ))}
    </div>
  );
}
