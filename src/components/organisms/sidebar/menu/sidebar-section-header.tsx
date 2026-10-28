import { cn } from '@heroui/react';
import { ChevronRightIcon } from 'lucide-react';

type SidebarSectionHeaderProps = {
  contentId: string;
  isOpen: boolean;
  label: string;
  onToggle: () => void;
};

export function SidebarSectionHeader({
  contentId,
  isOpen,
  label,
  onToggle,
}: SidebarSectionHeaderProps) {
  return (
    <button
      aria-controls={contentId}
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-1.5 font-semibold text-[10px] text-foreground/80 uppercase tracking-widest transition-colors',
        'cursor-pointer hover:text-foreground'
      )}
      onClick={onToggle}
      type='button'
    >
      <span className='flex-1 text-start'>{label}</span>
      <ChevronRightIcon
        aria-hidden
        className={cn(
          'size-3 transition-transform duration-200 motion-reduce:transition-none',
          isOpen && 'rotate-90'
        )}
      />
    </button>
  );
}
