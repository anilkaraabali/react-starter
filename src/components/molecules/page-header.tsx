import { cn } from '@heroui/react';
import type { ReactNode } from 'react';
import { usePageTitle } from '@/hooks/use-page-title';

export type PageHeaderProps = {
  actions?: ReactNode;
  className?: string;
  description?: ReactNode;
  title?: ReactNode;
};

export function PageHeader({
  actions,
  className,
  description,
  title,
}: PageHeaderProps) {
  const defaultTitle = usePageTitle();
  const resolvedTitle = title ?? defaultTitle;

  if (!resolvedTitle && !description && !actions) {
    return null;
  }

  return (
    <div
      className={cn(
        'mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div className='flex flex-col gap-1'>
        {resolvedTitle && (
          <h1 className='font-bold text-2xl text-foreground'>
            {resolvedTitle}
          </h1>
        )}
        {description && <p className='text-muted text-sm'>{description}</p>}
      </div>
      {actions && <div className='flex items-center gap-2'>{actions}</div>}
    </div>
  );
}
