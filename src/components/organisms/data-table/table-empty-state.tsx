import { EmptyState } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { InboxIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type TableEmptyStateProps = {
  children?: ReactNode;
};

export function TableEmptyState({ children }: TableEmptyStateProps) {
  const { t } = useLingui();

  return (
    <EmptyState className='table__empty-state'>
      <InboxIcon size={24} />
      <span>{children ?? t`No rows to display.`}</span>
    </EmptyState>
  );
}
