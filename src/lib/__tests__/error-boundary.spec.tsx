import { Component, type ReactNode } from 'react';
import { expect, it, vi } from 'vitest';
import { ErrorBoundary } from '@/lib/error-boundary';
import { renderWithI18n } from '@/testing/render';

/** A class, because a function whose body only throws infers `never`, and
 * TypeScript will not accept that as a JSX component. */
class Crash extends Component {
  render(): ReactNode {
    throw new Error('kaboom');
  }
}

function renderFallback() {
  // React logs the caught error to console.error; the boundary handled it.
  const consoleError = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);

  const { container } = renderWithI18n(
    <ErrorBoundary>
      <Crash />
    </ErrorBoundary>
  );
  consoleError.mockRestore();

  return container.textContent?.trim();
}

it('shows the static fallback message when an error occurs', () => {
  const content = renderFallback();
  expect(content).toContain('Oops! That didn’t work as expected.');
  expect(content).toContain('We’ve been notified and will fix it soon.');
});
