import { Skeleton } from '@heroui/react';
import type { SidebarVariant } from '@/types/layout.types';

type LayoutPreviewProps = {
  variant: SidebarVariant;
};

export function LayoutPreview({ variant }: LayoutPreviewProps) {
  if (variant === 'compact') {
    return (
      <div className='flex h-12 w-full overflow-hidden rounded-md border'>
        <div className='flex h-full w-4 shrink-0 flex-col justify-between border-r px-0.5 py-1.5'>
          <div className='flex flex-col items-center gap-1'>
            <div className='size-1.5 rounded-full bg-accent' />
            <div className='size-1.5 rounded-full bg-accent' />
          </div>
        </div>
        <div className='flex h-full flex-1 flex-col justify-center gap-1.5 p-1.5'>
          <Skeleton className='h-1.5 w-2/3 rounded-full' />
          <Skeleton className='h-4 w-full rounded-sm' />
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className='flex h-12 w-full items-center gap-1.5 overflow-hidden rounded-md border p-1'>
        <div className='flex h-full w-6 shrink-0 flex-col justify-between rounded-md border p-1 shadow-surface'>
          <div className='h-1 w-full rounded-full bg-accent' />
          <div className='h-1 w-full rounded-full bg-accent' />
          <div className='h-1 w-full rounded-full bg-accent' />
        </div>
        <div className='flex h-full flex-1 flex-col justify-center gap-1.5'>
          <Skeleton className='h-1.5 w-2/3 rounded-full' />
          <Skeleton className='h-4 w-full rounded-sm' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-12 w-full overflow-hidden rounded-md border'>
      <div className='flex h-full w-6.5 shrink-0 flex-col justify-between border-r p-1'>
        <div className='h-1 w-full rounded-full bg-accent' />
        <div className='h-1 w-full rounded-full bg-accent' />
        <div className='h-1 w-full rounded-full bg-accent' />
        <div className='h-1 w-full rounded-full bg-accent' />
      </div>
      <div className='flex h-full flex-1 flex-col justify-center gap-1.5 p-1.5'>
        <Skeleton className='h-1.5 w-2/3 rounded-full' />
        <Skeleton className='h-4 w-full rounded-sm' />
      </div>
    </div>
  );
}
