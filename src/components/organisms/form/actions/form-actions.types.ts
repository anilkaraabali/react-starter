import type { ReactNode } from 'react';

export type FormActionDropdownItem = {
  icon?: ReactNode;
  id: string;
  label: string;
  onSelect: () => void;
  variant?: 'danger';
};

export type FormActionsProps = {
  dropdownItems?: FormActionDropdownItem[];
  /** Id of the `<form>` the Save button submits; the header renders outside it. */
  formId?: string;
  isSavePending?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};
