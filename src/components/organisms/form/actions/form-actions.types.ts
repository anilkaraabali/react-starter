import type { ReactNode } from 'react';

export type FormActionDropdownItem = {
  icon?: ReactNode;
  id: string;
  isDisabled?: boolean;
  label: string;
  onSelect: () => void;
  variant?: 'danger';
};

export type FormActionsProps = {
  dropdownItems?: FormActionDropdownItem[];
  /** Overrides the default "Delete" label in the actions menu. */
  deleteLabel?: string;
  isDisabled?: boolean;
  onDelete?: () => void;
};
