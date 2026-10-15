import { Button, Popover, Switch, Typography } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Columns3CogIcon } from 'lucide-react';
import type {
  TableColumnDef,
  TableColumnVisibility,
} from '../data-table.types';
import { isTableColumnHideable } from './table-columns.utils';

type TableColumnFilterProps<TRow, TColumnId extends string> = {
  columns: readonly TableColumnDef<TRow, TColumnId>[];
  onColumnVisibleChange: (id: TColumnId, visible: boolean) => void;
  visibility: TableColumnVisibility<TColumnId>;
};

export function TableColumnFilter<TRow, TColumnId extends string>({
  columns,
  onColumnVisibleChange,
  visibility,
}: TableColumnFilterProps<TRow, TColumnId>) {
  const { _ } = useLingui();

  return (
    <Popover>
      <Button
        aria-label={_(msg`Edit columns`)}
        isIconOnly
        size='sm'
        variant='tertiary'
      >
        <Columns3CogIcon aria-hidden />
      </Button>
      <Popover.Content className='w-56' placement='bottom end'>
        <Popover.Dialog className='p-3'>
          <Popover.Arrow />
          <Popover.Heading className='pb-2'>{_(msg`Columns`)}</Popover.Heading>
          <ul className='flex flex-col gap-2'>
            {columns.map((column) => {
              const label = column.label ? column.label() : column.header();

              return (
                <li
                  className='flex items-center justify-between gap-4'
                  key={column.id}
                >
                  <Typography.Paragraph size='sm' weight='medium'>
                    {label}
                  </Typography.Paragraph>
                  <Switch
                    aria-label={label}
                    isDisabled={!isTableColumnHideable(column)}
                    isSelected={visibility[column.id]}
                    onChange={(selected) =>
                      onColumnVisibleChange(column.id, selected)
                    }
                  >
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </li>
              );
            })}
          </ul>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
