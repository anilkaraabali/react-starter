import { cn } from '@heroui/react';
import type { ReactNode } from 'react';

type SidebarAccordionCollapseProps = {
  children: ReactNode;
  id: string;
  isOpen: boolean;
};

export function SidebarAccordionCollapse({
  children,
  id,
  isOpen,
}: SidebarAccordionCollapseProps) {
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-200 ease-in-out motion-reduce:transition-none',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
      id={id}
      inert={!isOpen}
    >
      <div className='overflow-hidden'>{children}</div>
    </div>
  );
}
