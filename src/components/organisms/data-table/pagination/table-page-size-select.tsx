import { ListBox, Select } from '@heroui/react';
import { plural } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';

import { tablePageSizeOptions } from './table-page-size-options';

type TablePageSizeSelectProps = {
  onPageSizeChange: (pageSize: number) => void;
  options?: readonly number[];
  pageSize: number;
};

export function TablePageSizeSelect({
  onPageSizeChange,
  options = tablePageSizeOptions,
  pageSize,
}: TablePageSizeSelectProps) {
  const { t } = useLingui();

  const formatOption = (size: number) =>
    t({
      comment: 'Table page size option, e.g. "10 / page"',
      message: plural(size, { one: '# / page', other: '# / page' }),
    });

  return (
    <Select
      aria-label={t`Rows per page`}
      className='w-32'
      onChange={(key) => {
        if (key == null) return;
        onPageSizeChange(Number(key));
      }}
      value={pageSize}
    >
      <Select.Trigger>
        <Select.Value>{formatOption(pageSize)}</Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              id={option}
              key={option}
              textValue={formatOption(option)}
            >
              {formatOption(option)}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
