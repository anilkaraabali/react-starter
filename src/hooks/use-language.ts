import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  DEFAULT_LANGUAGE,
  type Language,
  languageLocales,
} from '@/config/language';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { loadCatalog } from '@/lib/i18n';
import { isLanguage } from '@/utils/language.utils';

import 'dayjs/locale/tr';

/** Stored as the plain language key; anything else falls back to the default. */
function deserializeLanguage(value: string): Language {
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export function useLanguage() {
  const [language, setLanguage] = useLocalStorage<Language>(
    LOCAL_STORAGE_KEYS.LANGUAGE,
    DEFAULT_LANGUAGE,
    {
      deserializer: deserializeLanguage,
      serializer: (v) => v,
    }
  );

  const locale = languageLocales[language];

  const _setLanguage = (language: Language) => {
    setLanguage(language);
    loadCatalog(language);
  };

  // `<html lang>` is set by `loadCatalog`, the single place that activates a locale.
  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

  return { language, locale, setLanguage: _setLanguage };
}
