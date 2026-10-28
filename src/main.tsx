import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@/lib/error-boundary';
import { getSavedLanguage, loadCatalog } from '@/lib/i18n';
import { setupZodErrorMap } from '@/lib/zod/zod-error-map';
import { enableMocking } from '@/testing/mocks';
import '@/styles/globals.css';

setupZodErrorMap();

async function main() {
  await enableMocking();

  // Activate the saved locale before the first render (no flash of source
  // text) and before any app module is evaluated: some build zod schemas and
  // option lists on import, so `App` is imported only after activation.
  await loadCatalog(getSavedLanguage());
  const { App } = await import('@/app/app');

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <I18nProvider i18n={i18n}>
          <App />
        </I18nProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

void main();
