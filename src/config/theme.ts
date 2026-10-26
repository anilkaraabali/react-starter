import { msg } from '@lingui/core/macro';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import type { Theme, ThemeOption } from '@/types/theme.types';

export const DEFAULT_THEME: Theme = 'light';

export const THEME_COLOR_SCHEME = '(prefers-color-scheme: dark)';

export const themeOptions: readonly ThemeOption[] = [
  { icon: SunIcon, key: 'light', label: msg`Light` },
  { icon: MoonIcon, key: 'dark', label: msg`Dark` },
  { icon: MonitorIcon, key: 'system', label: msg`System` },
];
