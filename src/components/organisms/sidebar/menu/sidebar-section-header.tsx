import { cn } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';

type SidebarSectionHeaderProps = {
  isOpen: boolean;
  label: string;
  onToggle: () => void;
};

export function SidebarSectionHeader({
  isOpen,
  label,
  onToggle,
}: SidebarSectionHeaderProps) {
  return (
    <button
      className='flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 font-semibold text-[10px] text-foreground/80 uppercase tracking-widest transition-colors hover:text-foreground'
      onClick={onToggle}
      type='button'
    >
      <span className='flex-1 text-start'>{label}</span>
      <ChevronDownIcon
        className={cn(
          'size-3 transition-transform duration-200',
          !isOpen && '-rotate-90'
        )}
      />
    </button>
  );
}
