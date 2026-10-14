import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import {
  type RenderOptions,
  type RenderResult,
  render,
} from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

/**
 * `render` with the i18n provider attached.
 *
 * `setup-tests.ts` activates the real i18n with an empty catalog, so a
 * component that reads through `useLingui` re-renders on locale change and
 * falls back to its source text.
 */
export function renderWithI18n(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult & { rerenderWithI18n: (next: ReactElement) => void } {
  function Wrapper({ children }: { children: ReactNode }) {
    return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
  }

  const result = render(ui, { ...options, wrapper: Wrapper });

  return {
    ...result,
    rerenderWithI18n: (next: ReactElement) => result.rerender(next),
  };
}
