import { beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_COLOR_SCHEME } from '@/config/theme';
import { applyDocumentTheme, isTheme, resolveTheme } from '@/utils/theme.utils';

describe('theme.utils', () => {
  describe('isTheme', () => {
    it('returns true for valid themes', () => {
      expect(isTheme('light')).toBe(true);
      expect(isTheme('dark')).toBe(true);
      expect(isTheme('system')).toBe(true);
    });

    it('returns false for invalid values', () => {
      expect(isTheme('invalid')).toBe(false);
      expect(isTheme('')).toBe(false);
      expect(isTheme(null)).toBe(false);
      expect(isTheme(undefined)).toBe(false);
      expect(isTheme(123)).toBe(false);
    });
  });

  describe('resolveTheme', () => {
    it('returns light when theme is light', () => {
      expect(resolveTheme('light')).toBe('light');
    });

    it('returns dark when theme is dark', () => {
      expect(resolveTheme('dark')).toBe('dark');
    });

    it('resolves system theme based on matchMedia', () => {
      const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
        addEventListener: vi.fn(),
        matches: query === THEME_COLOR_SCHEME,
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
      }));

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = matchMediaMock;

      expect(resolveTheme('system')).toBe('dark');

      window.matchMedia = originalMatchMedia;
    });
  });

  describe('applyDocumentTheme', () => {
    beforeEach(() => {
      document.documentElement.className = '';
      document.documentElement.removeAttribute('data-theme');
    });

    it('applies light theme to document element', () => {
      applyDocumentTheme('light');

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('applies dark theme to document element', () => {
      applyDocumentTheme('dark');

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });
  });
});
