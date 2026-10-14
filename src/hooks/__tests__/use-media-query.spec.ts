import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * The global setup installs a matchMedia stub that always reports
 * `matches: false`. These tests replace it per case and restore it afterwards.
 */
type Listener = () => void;

function stubMatchMedia(initialMatching: readonly string[]) {
  const listeners = new Set<Listener>();
  let matching = new Set(initialMatching);

  const matchMedia = vi.fn((query: string) => ({
    addEventListener: (_type: string, listener: Listener) => {
      listeners.add(listener);
    },
    dispatchEvent: vi.fn(),
    matches: matching.has(query),
    media: query,
    onchange: null,
    removeEventListener: (_type: string, listener: Listener) => {
      listeners.delete(listener);
    },
  }));

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: matchMedia,
    writable: true,
  });

  return {
    change(nextMatching: readonly string[]) {
      matching = new Set(nextMatching);
      for (const listener of listeners) {
        listener();
      }
    },
    matchMedia,
    size: () => listeners.size,
  };
}

describe('use-media-query', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reports whether the query currently matches', () => {
    stubMatchMedia(['(min-width: 768px)']);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(true);
  });

  it('reports false when the query does not match', () => {
    stubMatchMedia(['(min-width: 1200px)']);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);
  });

  it('passes the query through to matchMedia', () => {
    const stub = stubMatchMedia([]);

    renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(stub.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
  });

  it('re-renders when the query starts matching', () => {
    const stub = stubMatchMedia([]);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => stub.change(['(min-width: 768px)']));

    expect(result.current).toBe(true);
  });

  it('re-renders when the query stops matching', () => {
    const stub = stubMatchMedia(['(min-width: 768px)']);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);

    act(() => stub.change([]));

    expect(result.current).toBe(false);
  });

  it('registers one listener and removes it on unmount', () => {
    const stub = stubMatchMedia([]);

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(stub.size()).toBe(1);

    unmount();

    expect(stub.size()).toBe(0);
  });
});
