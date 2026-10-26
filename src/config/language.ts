export const languageOptions = [
  { flag: 'gb', key: 'en', label: 'English (UK)', locale: 'en-GB' },
  { flag: 'tr', key: 'tr', label: 'Türkçe', locale: 'tr-TR' },
] as const;

export type Language = (typeof languageOptions)[number]['key'];

export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Lookup for `locale` by language key. Indexing with a `Language` is checked at
 * compile time, so a new entry in `languageOptions` without a locale fails the
 * build here instead of returning undefined at runtime.
 */
export const languageLocales = {
  en: 'en-GB',
  tr: 'tr-TR',
} as const satisfies Record<Language, string>;
