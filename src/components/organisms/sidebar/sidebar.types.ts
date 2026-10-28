import type { MessageDescriptor } from '@lingui/core';
import type { LucideIcon } from 'lucide-react';
import type { SidebarVariant } from '@/types/layout.types';

export type { SidebarVariant };

export type SidebarHeaderMode = 'account' | 'default';

/** A link. Leaves cannot have children, so deeper nesting is a type error. */
export type SidebarLeafItem<TPolicy extends string = string> = {
  badge?: number | string;
  icon?: LucideIcon;
  label: MessageDescriptor;
  policy?: TPolicy;
  to: string;
};

/** A collapsible heading. It never navigates, so it has no `to`. */
type SidebarGroupItem<TPolicy extends string = string> = {
  children: readonly SidebarLeafItem<TPolicy>[];
  icon?: LucideIcon;
  label: MessageDescriptor;
  policy?: TPolicy;
  to?: never;
};

/** Top-level entry: a plain link or a group of links. One level only. */
export type SidebarNavItem<TPolicy extends string = string> =
  | (SidebarLeafItem<TPolicy> & { children?: never })
  | SidebarGroupItem<TPolicy>;
