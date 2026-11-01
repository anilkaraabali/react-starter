import { Button, Dropdown, Label, Separator } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';
import type { FormActionDropdownItem } from './form-actions.types';

type FormActionMoreMenuProps = {
  deleteLabel?: string;
  dropdownItems?: FormActionDropdownItem[];
  isDisabled?: boolean;
  onDelete?: () => void;
};

const DELETE_ITEM_ID = 'delete';

export function FormActionMoreMenu({
  deleteLabel,
  dropdownItems = [],
  isDisabled = false,
  onDelete,
}: FormActionMoreMenuProps) {
  const { t } = useLingui();
  const resolvedDeleteLabel = deleteLabel ?? t(msg`Delete`);

  if (dropdownItems.length === 0 && !onDelete) {
    return null;
  }

  return (
    <Dropdown>
      <Button isDisabled={isDisabled} variant='tertiary'>
        {t(msg`Actions`)}
        <ChevronDownIcon aria-hidden />
      </Button>
      <Dropdown.Popover placement='bottom end'>
        <Dropdown.Menu
          onAction={(key) => {
            if (key === DELETE_ITEM_ID) {
              onDelete?.();
              return;
            }
            dropdownItems.find((item) => item.id === key)?.onSelect();
          }}
        >
          {dropdownItems.map((item) => (
            <Dropdown.Item
              id={item.id}
              isDisabled={item.isDisabled}
              key={item.id}
              textValue={item.label}
              variant={item.variant}
            >
              {item.icon}
              <Label>{item.label}</Label>
            </Dropdown.Item>
          ))}
          {onDelete && dropdownItems.length > 0 ? (
            <Separator className='my-1' />
          ) : null}
          {onDelete ? (
            <Dropdown.Item
              id={DELETE_ITEM_ID}
              textValue={resolvedDeleteLabel}
              variant='danger'
            >
              <Trash2Icon aria-hidden className='text-danger' />
              <Label>{resolvedDeleteLabel}</Label>
            </Dropdown.Item>
          ) : null}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
