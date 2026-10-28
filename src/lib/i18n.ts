import { i18n } from '@lingui/core';
import { DEFAULT_LANGUAGE, type Language } from '@/config/language';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { isLanguage } from '@/utils/language.utils';

/**
 * Saved language, read before React renders. Falls back to the default when
 * storage is missing, blocked (sandboxed iframe) or holds an unknown value.
 */
export function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
    return isLanguage(saved) ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

/**
 * Loads one locale's catalog (Vite emits a lazy chunk per locale) and
 * activates it. Falls back to the source locale if the chunk fails to load,
 * so the app never stays without an active locale.
 */
export async function loadCatalog(locale: string) {
  try {
    const { messages } = await import(`../locales/${locale}/messages.po`);
    i18n.loadAndActivate({ locale, messages });
  } catch (error) {
    console.error(
      `Catalog for "${locale}" failed to load, using "${DEFAULT_LANGUAGE}"`,
      error
    );
    const { messages } = await import(
      `../locales/${DEFAULT_LANGUAGE}/messages.po`
    );
    i18n.loadAndActivate({ locale: DEFAULT_LANGUAGE, messages });
  }
  document.documentElement.lang = i18n.locale;
}
