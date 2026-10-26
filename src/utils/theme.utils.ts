import { THEME_COLOR_SCHEME } from '@/config/theme';
import { THEMES, type Theme } from '@/types/theme.types';

export function isTheme(value: unknown): value is Theme {
  return (
    typeof value === 'string' && (THEMES as readonly string[]).includes(value)
  );
}

export function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') {
    return window.matchMedia(THEME_COLOR_SCHEME).matches ? 'dark' : 'light';
  }
  return theme;
}

export function applyDocumentTheme(theme: Theme) {
  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  root.setAttribute('data-theme', resolved);
  root.classList.toggle('dark', resolved === 'dark');
  root.classList.toggle('light', resolved === 'light');
}
