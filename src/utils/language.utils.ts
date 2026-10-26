import { type Language, languageOptions } from '@/config/language';

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' &&
    languageOptions.map((l) => l.key as string).includes(value)
  );
}
