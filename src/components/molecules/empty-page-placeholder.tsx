import { Button, cn, EmptyState, Typography } from '@heroui/react';
import type { ReactNode } from 'react';

import PlaceholderImage from '@/assets/add-placeholder.svg?react';

type EmptyPagePlaceholderProps = {
  actionLabel?: ReactNode;
  className?: string;
  description?: ReactNode;
  illustration?: ReactNode;
  onAction?: () => void;
  title: ReactNode;
};

export function EmptyPagePlaceholder({
  actionLabel,
  className,
  description,
  illustration,
  onAction,
  title,
}: EmptyPagePlaceholderProps) {
  return (
    <EmptyState
      className={cn(
        'mx-auto mt-6 max-w-lg justify-items-center space-y-6 p-6 text-center',
        className
      )}
    >
      {illustration ?? <PlaceholderImage className='h-auto w-39' />}
      <div className='space-y-1'>
        <Typography.Paragraph align='center' size='base' weight='medium'>
          {title}
        </Typography.Paragraph>
        {description ? (
          <Typography.Paragraph align='center' color='muted' size='sm'>
            {description}
          </Typography.Paragraph>
        ) : null}
      </div>
      {actionLabel && onAction ? (
        <Button onPress={onAction}>{actionLabel}</Button>
      ) : null}
    </EmptyState>
  );
}
