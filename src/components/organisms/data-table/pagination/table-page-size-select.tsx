import { ListBox, Select } from '@heroui/react';
import { TABLE_PAGE_SIZE_OPTIONS } from '@/config/pagination';

type TablePageSizeSelectProps = {
  onPageSizeChange: (pageSize: number) => void;
  options?: readonly number[];
  pageSize: number;
};

export function TablePageSizeSelect({
  onPageSizeChange,
  options = TABLE_PAGE_SIZE_OPTIONS,
  pageSize,
}: TablePageSizeSelectProps) {
  return (
    <Select
      className='w-20'
      onChange={(key) => {
        if (key == null) return;
        onPageSizeChange(Number(key));
      }}
      value={pageSize}
    >
      <Select.Trigger>
        <Select.Value>
          {({ isPlaceholder, selectedText }) =>
            isPlaceholder ? pageSize : selectedText
          }
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item id={option} key={option} textValue={String(option)}>
              {option}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
