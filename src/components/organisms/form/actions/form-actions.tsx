import { ButtonGroup } from '@heroui/react';
import { FormActionMoreMenu } from './form-action-more-menu';
import type { FormActionsProps } from './form-actions.types';
import { FormPrimaryActionButton } from './form-primary-action-button';

export function FormActions({
  dropdownItems = [],
  formId,
  isSavePending = false,
  onDelete,
  onEdit,
}: FormActionsProps) {
  const hasPrimary = Boolean(formId || onEdit);
  const hasMore = Boolean(onDelete || dropdownItems.length > 0);

  if (!hasPrimary && !hasMore) {
    return null;
  }

  const primaryButton = hasPrimary ? (
    <FormPrimaryActionButton
      formId={formId}
      isSavePending={isSavePending}
      onEdit={onEdit}
    />
  ) : null;

  const moreMenu = hasMore ? (
    <FormActionMoreMenu
      dropdownItems={dropdownItems}
      hasPrimaryAction={hasPrimary}
      isDisabled={isSavePending}
      onDelete={onDelete}
    />
  ) : null;

  if (hasPrimary && hasMore) {
    return (
      <ButtonGroup>
        {primaryButton}
        {moreMenu}
      </ButtonGroup>
    );
  }

  return primaryButton ?? moreMenu;
}
