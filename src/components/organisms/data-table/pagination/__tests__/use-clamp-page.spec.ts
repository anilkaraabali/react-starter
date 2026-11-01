import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useClampPage } from '../use-clamp-page';

const pagination = (
  overrides: Partial<Parameters<typeof useClampPage>[0]['pagination']> = {}
) => ({
  onPageChange: vi.fn(),
  page: 5,
  total: 25,
  totalPages: 3,
  ...overrides,
});

describe('useClampPage', () => {
  it('moves to the last page when the page is past the end', () => {
    const value = pagination();

    renderHook(() => useClampPage({ isLoading: false, pagination: value }));

    expect(value.onPageChange).toHaveBeenCalledExactlyOnceWith(3);
  });

  it('does nothing while data is loading', () => {
    const value = pagination();

    renderHook(() => useClampPage({ isLoading: true, pagination: value }));

    expect(value.onPageChange).not.toHaveBeenCalled();
  });

  it('does nothing when totals are not known yet', () => {
    const value = pagination({ total: 0, totalPages: 1 });

    renderHook(() => useClampPage({ isLoading: false, pagination: value }));

    expect(value.onPageChange).not.toHaveBeenCalled();
  });

  it('does nothing when the page is within range', () => {
    const value = pagination({ page: 3 });

    renderHook(() => useClampPage({ isLoading: false, pagination: value }));

    expect(value.onPageChange).not.toHaveBeenCalled();
  });

  it('does nothing without pagination', () => {
    expect(() =>
      renderHook(() => useClampPage({ isLoading: false }))
    ).not.toThrow();
  });
});
