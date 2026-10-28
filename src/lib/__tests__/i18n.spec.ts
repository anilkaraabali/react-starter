import { i18n } from '@lingui/core';
import { afterEach, describe, expect, it } from 'vitest';

import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { getSavedLanguage, loadCatalog } from '@/lib/i18n';

describe('lib/i18n', () => {
  afterEach(() => {
    window.localStorage.clear();
    i18n.load('en', {});
    i18n.activate('en');
  });

  describe('getSavedLanguage', () => {
    it('reads the stored language key', () => {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, 'tr');
      expect(getSavedLanguage()).toBe('tr');
    });

    it('falls back to the default for missing or invalid values', () => {
      expect(getSavedLanguage()).toBe('en');
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, '"tr"');
      expect(getSavedLanguage()).toBe('en');
    });
  });

  describe('loadCatalog', () => {
    it('activates the locale and sets the document language', async () => {
      await loadCatalog('tr');
      expect(i18n.locale).toBe('tr');
      expect(document.documentElement.lang).toBe('tr');
    });

    it('falls back to the source locale when a catalog is missing', async () => {
      await loadCatalog('xx');
      expect(i18n.locale).toBe('en');
      expect(document.documentElement.lang).toBe('en');
    });
  });
});
