import type { MessageDescriptor } from '@lingui/core';
import type { LucideIcon } from 'lucide-react';
import type { SidebarVariant } from '@/types/layout.types';

export type { SidebarVariant };

export type SidebarHeaderMode = 'account' | 'default';

type SidebarNavItemBase<TPolicy extends string> = {
  badge?: number | string;
  icon?: LucideIcon;
  label: MessageDescriptor;
  policy?: TPolicy;
  to: string;
};

export type SidebarNavItem<TPolicy extends string = string> =
  SidebarNavItemBase<TPolicy> &
    (
      | { children?: readonly SidebarNavItem<TPolicy>[]; sections?: never }
      | { children?: never; sections?: readonly SidebarNavSection<TPolicy>[] }
    );

type SidebarNavSection<TPolicy extends string = string> = {
  items: readonly SidebarNavItem<TPolicy>[];
  title: MessageDescriptor;
};
