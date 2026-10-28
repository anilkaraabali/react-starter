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
        'hover:border-accent flex h-16 flex-col items-center justify-center gap-1.5 rounded-xl border transition-all',
        {
          'border-accent bg-accent-soft text-accent-soft-foreground ring-accent-soft ring-2':
            isSelected,
        },
        className
      )}
      onClick={onSelect}
      type='button'
    >
      {preview}
      <span className='text-xs font-medium'>{label}</span>
    </button>
  );
}
