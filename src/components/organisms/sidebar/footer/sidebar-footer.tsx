import type { ReactNode } from 'react';

type SidebarFooterProps = {
  children?: ReactNode;
  compact?: boolean;
};

export function SidebarFooter({
  children,
  compact = false,
}: SidebarFooterProps) {
  return (
    <div
      className='flex w-full items-center justify-between gap-3'
      data-compact={compact}
    >
      {children}
    </div>
  );
}
