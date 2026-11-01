import { FormActionMoreMenu } from './form-action-more-menu';
import type { FormActionsProps } from './form-actions.types';

export function FormActions({
  deleteLabel,
  dropdownItems = [],
  isDisabled = false,
  onDelete,
}: FormActionsProps) {
  if (!onDelete && dropdownItems.length === 0) {
    return null;
  }

  return (
    <FormActionMoreMenu
      deleteLabel={deleteLabel}
      dropdownItems={dropdownItems}
      isDisabled={isDisabled}
      onDelete={onDelete}
    />
  );
}
