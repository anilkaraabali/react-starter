import { EmptyState } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { InboxIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type TableEmptyStateProps = {
  children?: ReactNode;
};

export function TableEmptyState({ children }: TableEmptyStateProps) {
  const { _ } = useLingui();

  return (
    <EmptyState className='table__empty-state'>
      <InboxIcon size={24} />
      <span>{children ?? _(msg`No rows to display.`)}</span>
    </EmptyState>
  );
}
