import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { loadCatalog } from '@/lib/i18n';
import { AppProvider } from './provider';
import { AppRouter } from './router';

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(console.error);
      }
    })
    .catch(console.error);
}

export function App() {
  const { language } = useLanguage();
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    loadCatalog(language).then(() => setLanguageLoaded(true));
  }, [language]);

  return (
    <AppProvider>
      <AppRouter isLanguageLoaded={languageLoaded} />
    </AppProvider>
  );
}
