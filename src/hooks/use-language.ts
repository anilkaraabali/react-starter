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

export function useLanguage() {
  const [language, setLanguage] = useLocalStorage<Language>(
    LOCAL_STORAGE_KEYS.LANGUAGE,
    DEFAULT_LANGUAGE,
    {
      deserializer: (v) => (isLanguage(v) ? v : DEFAULT_LANGUAGE),
      serializer: (v) => v,
    }
  );

  const locale = languageLocales[language];

  const _setLanguage = (language: Language) => {
    setLanguage(language);
    loadCatalog(language);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    dayjs.locale(language);
  }, [language]);

  return { language, locale, setLanguage: _setLanguage };
}
