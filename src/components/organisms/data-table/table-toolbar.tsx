import type { ReactNode } from 'react';

export type TableToolbarSlot =
  | ReactNode
  | ((endActions: ReactNode) => ReactNode);

type TableToolbarProps = {
  actions?: ReactNode;
  columnFilter?: ReactNode;
  toolbar?: TableToolbarSlot;
};

export function TableToolbar({
  actions,
  columnFilter,
  toolbar,
}: TableToolbarProps) {
  if (!toolbar && !columnFilter && !actions) {
    return null;
  }

  const endActions =
    actions || columnFilter ? (
      <>
        {actions}
        {columnFilter}
      </>
    ) : null;

  if (typeof toolbar === 'function') {
    return toolbar(endActions);
  }

  return (
    <div className='flex items-start gap-2'>
      <div className='flex-1'>{toolbar}</div>
      {endActions ? (
        <div className='flex h-9 shrink-0 items-center gap-2'>{endActions}</div>
      ) : null}
    </div>
  );
}
