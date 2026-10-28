import { Button, ButtonGroup, Dropdown, Label } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();

  const resolvedItems: FormActionDropdownItem[] = [
    ...dropdownItems,
    ...(onDelete
      ? [
          {
            icon: <Trash2Icon aria-hidden className='text-danger' />,
            id: 'delete',
            label: t`Delete`,
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
      <Button aria-label={t`More options`} isDisabled={isDisabled} isIconOnly>
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
