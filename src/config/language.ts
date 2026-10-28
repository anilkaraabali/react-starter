const userLanguageOptions = [
  { flag: 'gb', key: 'en', label: 'English (UK)', locale: 'en-GB' },
  { flag: 'tr', key: 'tr', label: 'Türkçe', locale: 'tr-TR' },
] as const;

/**
 * Lingui pseudo-locale (`pseudoLocale` in lingui.config.ts) for QA: shows
 * accented source text so untranslated or clipped strings stand out.
 * Development builds only; never offered to users in production.
 */
const pseudoLanguageOption = {
  flag: 'un',
  key: 'pseudo',
  label: 'Pseudo (QA)',
  locale: 'en-GB',
} as const;

export const languageOptions = import.meta.env.DEV
  ? [...userLanguageOptions, pseudoLanguageOption]
  : userLanguageOptions;

export type Language =
  | (typeof userLanguageOptions)[number]['key']
  | (typeof pseudoLanguageOption)['key'];

export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Lookup for `locale` by language key. Indexing with a `Language` is checked at
 * compile time, so a new entry without a locale fails the build here instead
 * of returning undefined at runtime.
 */
export const languageLocales = {
  en: 'en-GB',
  pseudo: 'en-GB',
  tr: 'tr-TR',
} as const satisfies Record<Language, string>;
