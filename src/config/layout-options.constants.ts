import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { SidebarVariant } from '@/types/layout.types';

export type LayoutCardOption = {
  key: SidebarVariant;
  label: MessageDescriptor;
};

export const LAYOUT_OPTIONS: readonly LayoutCardOption[] = [
  {
    key: 'default',
    label: msg`Default`,
  },
  {
    key: 'compact',
    label: msg`Compact`,
  },
  {
    key: 'floating',
    label: msg`Floating`,
  },
];
