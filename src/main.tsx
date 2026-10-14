import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/app';
import { ErrorBoundary } from '@/lib/error-boundary';
import { setupZodErrorMap } from '@/lib/zod/zod-error-map';
import { enableMocking } from '@/testing/mocks';
import '@/styles/globals.css';

setupZodErrorMap();

async function main() {
  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}

void main();
