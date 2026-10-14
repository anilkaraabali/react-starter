import { LANGUAGES, type Language } from '@/config/language.constants';

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' &&
    LANGUAGES.map((l) => l.key as string).includes(value)
  );
}
