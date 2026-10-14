import { cn } from '@heroui/react';
import type { ReactNode } from 'react';

type SidebarAccordionCollapseProps = {
  children: ReactNode;
  isOpen: boolean;
};

export function SidebarAccordionCollapse({
  children,
  isOpen,
}: SidebarAccordionCollapseProps) {
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-250 ease-out',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className='overflow-hidden'>{children}</div>
    </div>
  );
}
