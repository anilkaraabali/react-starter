import { i18n } from '@lingui/core';
import { vi } from 'vitest';

// 1. Real Lingui macros, no mock. `vitest.config.ts` runs the same macro
// transform as `vite.config.ts`, so `msg` returns a real MessageDescriptor.
// A mock here would shadow the transform and would have to re-implement
// interpolation, which is how the previous one lost `${max}`.

// 1b. Activate i18n with an empty catalog. `i18n._` then falls back to the
// source message, which is what a test wants to assert against: the real
// English text, interpolation included.
i18n.load('en', {});
i18n.activate('en');

// 2. Global window & window.matchMedia mock
const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
  addEventListener: vi.fn(),
  addListener: vi.fn(),
  dispatchEvent: vi.fn(),
  matches: false,
  media: query,
  onchange: null,
  removeEventListener: vi.fn(),
  removeListener: vi.fn(),
}));

if (typeof globalThis.window === 'undefined') {
  Object.defineProperty(globalThis, 'window', {
    value: globalThis,
    writable: true,
  });
}

Object.defineProperty(globalThis.window, 'matchMedia', {
  value: matchMediaMock,
  writable: true,
});

// 3. Global document mock (handles theme/palette class and attribute toggling)
if (typeof globalThis.document === 'undefined') {
  const mockAttributes: Record<string, string> = {};
  const mockClasses = new Set<string>();

  const mockDocumentElement = {
    classList: {
      add: (cls: string) => mockClasses.add(cls),
      contains: (cls: string) => mockClasses.has(cls),
      remove: (cls: string) => mockClasses.delete(cls),
      toggle: (cls: string, force?: boolean) => {
        if (typeof force === 'boolean') {
          if (force) {
            mockClasses.add(cls);
          } else {
            mockClasses.delete(cls);
          }
          return force;
        }
        if (mockClasses.has(cls)) {
          mockClasses.delete(cls);
          return false;
        }
        mockClasses.add(cls);
        return true;
      },
    },
    getAttribute: (attr: string) => mockAttributes[attr],
    lang: '',
    removeAttribute: (attr: string) => {
      delete mockAttributes[attr];
    },
    setAttribute: (attr: string, val: string) => {
      mockAttributes[attr] = val;
    },
  };

  Object.defineProperty(globalThis, 'document', {
    value: {
      documentElement: mockDocumentElement,
    },
    writable: true,
  });
}
