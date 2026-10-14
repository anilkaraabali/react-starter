import { cn } from '@heroui/styles';
import type { ReactNode } from 'react';

type PreferenceOptionCardProps = {
  className?: string;
  isSelected: boolean;
  label: string;
  onSelect: () => void;
  preview: ReactNode;
};

export function PreferenceOptionCard({
  className,
  isSelected,
  label,
  onSelect,
  preview,
}: PreferenceOptionCardProps) {
  return (
    <button
      className={cn(
        'flex h-16 flex-col items-center justify-center gap-1.5 rounded-xl border transition-all hover:border-accent',
        {
          'border-accent bg-accent-soft text-accent-soft-foreground ring-2 ring-accent-soft':
            isSelected,
        },
        className
      )}
      onClick={onSelect}
      type='button'
    >
      {preview}
      <span className='font-medium text-xs'>{label}</span>
    </button>
  );
}
