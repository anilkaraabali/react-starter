import { AppProvider } from './provider';
import { AppRouter } from './router';

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const registration of registrations) {
        // Keep the MSW worker: mocking starts before this module is imported.
        if (registration.active?.scriptURL.endsWith('/mockServiceWorker.js')) {
          continue;
        }
        registration.unregister().catch(console.error);
      }
    })
    .catch(console.error);
}

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
