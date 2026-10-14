import { Button, ButtonGroup, Dropdown, Label } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
import type { FormActionDropdownItem } from './form-actions.types';

type FormActionMoreMenuProps = {
  dropdownItems?: FormActionDropdownItem[];
  hasPrimaryAction?: boolean;
  isDisabled?: boolean;
  onDelete?: () => void;
};

export function FormActionMoreMenu({
  dropdownItems = [],
  hasPrimaryAction = false,
  isDisabled = false,
  onDelete,
}: FormActionMoreMenuProps) {
  const { _ } = useLingui();

  const resolvedItems: FormActionDropdownItem[] = [
    ...dropdownItems,
    ...(onDelete
      ? [
          {
            icon: <Trash2Icon aria-hidden className='text-danger' />,
            id: 'delete',
            label: _(msg`Delete`),
            onSelect: onDelete,
            variant: 'danger' as const,
          },
        ]
      : []),
  ];

  if (resolvedItems.length === 0) {
    return null;
  }

  return (
    <Dropdown>
      <Button
        aria-label={_(msg`More options`)}
        isDisabled={isDisabled}
        isIconOnly
      >
        {hasPrimaryAction ? <ButtonGroup.Separator /> : null}
        <MoreHorizontalIcon aria-hidden />
      </Button>
      <Dropdown.Popover placement='bottom end'>
        <Dropdown.Menu
          onAction={(key) => {
            resolvedItems.find((item) => item.id === key)?.onSelect();
          }}
        >
          {resolvedItems.map((item) => (
            <Dropdown.Item
              id={item.id}
              key={item.id}
              textValue={item.label}
              variant={item.variant}
            >
              {item.icon}
              <Label>{item.label}</Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
