import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  getResponsivePageSize,
  useResponsivePageSize,
} from '@/hooks/use-responsive-page-size';

function setViewportHeight(height: number) {
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: height,
    writable: true,
  });
}

function resizeTo(height: number) {
  setViewportHeight(height);
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

describe('use-responsive-page-size', () => {
  const originalHeight = window.innerHeight;

  afterEach(() => {
    setViewportHeight(originalHeight);
    vi.restoreAllMocks();
  });

  it('uses 50 on very tall viewports', () => {
    setViewportHeight(2000);

    const { result } = renderHook(() => useResponsivePageSize());

    expect(result.current).toBe(50);
  });

  it('uses 25 on medium viewports', () => {
    setViewportHeight(1300);

    const { result } = renderHook(() => useResponsivePageSize());

    expect(result.current).toBe(25);
  });

  it('falls back to 25 on short viewports', () => {
    setViewportHeight(800);

    const { result } = renderHook(() => useResponsivePageSize());

    expect(result.current).toBe(25);
  });

  it('treats the breakpoint itself as tall enough', () => {
    setViewportHeight(2000);
    const { result } = renderHook(() => useResponsivePageSize());
    expect(result.current).toBe(50);

    resizeTo(1999);

    expect(result.current).toBe(25);
  });

  it('treats the medium breakpoint itself as tall enough', () => {
    setViewportHeight(1199);
    const { result } = renderHook(() => useResponsivePageSize());
    expect(result.current).toBe(25);

    resizeTo(1200);

    expect(result.current).toBe(25);
  });

  it('grows the page size on resize', () => {
    setViewportHeight(900);
    const { result } = renderHook(() => useResponsivePageSize());
    expect(result.current).toBe(25);

    resizeTo(2100);

    expect(result.current).toBe(50);
  });

  it('shrinks the page size on resize', () => {
    setViewportHeight(2100);
    const { result } = renderHook(() => useResponsivePageSize());
    expect(result.current).toBe(50);

    resizeTo(700);

    expect(result.current).toBe(25);
  });

  it('returns a value from the allowed page sizes', () => {
    setViewportHeight(1500);

    const { result } = renderHook(() => useResponsivePageSize());

    expect([10, 25, 50, 100]).toContain(result.current);
  });

  describe('getResponsivePageSize', () => {
    it('returns the page size directly without hook context', () => {
      setViewportHeight(2000);
      expect(getResponsivePageSize()).toBe(50);

      setViewportHeight(1200);
      expect(getResponsivePageSize()).toBe(25);

      setViewportHeight(800);
      expect(getResponsivePageSize()).toBe(25);
    });
  });
});
