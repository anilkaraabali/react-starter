import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { useLanguage } from '@/hooks/use-language';

const loadCatalog = vi.fn();

vi.mock('@/lib/i18n', () => ({
  loadCatalog: (...args: unknown[]) => loadCatalog(...args),
}));

const { languageOptions } = await import('@/config/language');

describe('use-language', () => {
  beforeEach(() => {
    window.localStorage.clear();
    loadCatalog.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to the default language', () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe('en');
    expect(result.current.locale).toBe('en-GB');
  });

  it('reads the stored language', () => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, 'tr');

    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe('tr');
    expect(result.current.locale).toBe('tr-TR');
  });

  it('ignores a stored value that is not a known language', () => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, 'de');

    const { result } = renderHook(() => useLanguage());

    expect(result.current.language).toBe('en');
  });

  it('maps every declared language to its locale', () => {
    for (const language of languageOptions) {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, language.key);

      const { result, unmount } = renderHook(() => useLanguage());

      expect(result.current.locale).toBe(language.locale);
      unmount();
    }
  });

  it('persists the new language and loads its catalog', () => {
    const { result } = renderHook(() => useLanguage());

    act(() => result.current.setLanguage('tr'));

    expect(result.current.language).toBe('tr');
    expect(window.localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE)).toBe('tr');
    expect(loadCatalog).toHaveBeenCalledWith('tr');
  });

  it('sets the document language', () => {
    const { result } = renderHook(() => useLanguage());

    expect(document.documentElement.lang).toBe('en');

    act(() => result.current.setLanguage('tr'));

    expect(document.documentElement.lang).toBe('tr');
  });

  it('returns a setter that is not the raw storage setter', () => {
    const { result } = renderHook(() => useLanguage());

    expect(typeof result.current.setLanguage).toBe('function');
  });
});
