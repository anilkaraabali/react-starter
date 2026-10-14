import type { MessageDescriptor } from '@lingui/core';
import type { LucideIcon } from 'lucide-react';

export const THEMES = ['light', 'dark', 'system'] as const;

export type Theme = (typeof THEMES)[number];

export type ThemeOption = {
  icon: LucideIcon;
  key: Theme;
  label: MessageDescriptor;
};
