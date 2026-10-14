import type { ReactNode } from 'react';

type TableToolbarProps = {
  columnFilter?: ReactNode;
  toolbar?: ReactNode;
};

export function TableToolbar({ columnFilter, toolbar }: TableToolbarProps) {
  if (!toolbar && !columnFilter) {
    return null;
  }

  return (
    <div className='flex items-start gap-2'>
      <div className='flex-1'>{toolbar}</div>
      {columnFilter ? (
        <div className='flex h-9 shrink-0 items-center'>{columnFilter}</div>
      ) : null}
    </div>
  );
}
