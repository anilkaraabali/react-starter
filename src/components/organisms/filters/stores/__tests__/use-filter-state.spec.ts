import { describe, expect, it, vi } from 'vitest';

import { useFilterState } from '@/components/organisms/filters/stores/use-filter-state';

describe('useFilterState', () => {
  type TestSearch = {
    category?: string;
    page?: number;
    search?: string;
  };

  const initialState: TestSearch = {
    category: undefined,
    page: 1,
    search: '',
  };

  it('retrieves filter value from search or falls back to initialState', () => {
    const navigate = vi.fn();
    const search: TestSearch = { category: 'electronics', search: 'laptop' };

    const { getFilterValue } = useFilterState({
      initialState,
      navigate,
      search,
    });

    expect(getFilterValue('category')).toBe('electronics');
    expect(getFilterValue('search')).toBe('laptop');

    const emptyState = useFilterState({
      initialState,
      navigate,
      search: {},
    });

    expect(emptyState.getFilterValue('category')).toBeUndefined();
    expect(emptyState.getFilterValue('search')).toBe('');
  });

  it('updates filter value, clears empty strings, and resets page', () => {
    const navigate = vi.fn();
    const search: TestSearch = { category: 'books', page: 3 };

    const { setFilterValue } = useFilterState({
      initialState,
      navigate,
      search,
    });

    setFilterValue('category', 'music');

    expect(navigate).toHaveBeenCalledTimes(1);
    const updater = navigate.mock.calls[0][0];
    expect(updater({ category: 'books', page: 3 })).toEqual({
      category: 'music',
      page: undefined,
    });

    // Setting empty string omits the value
    setFilterValue('search', '');
    const updaterEmpty = navigate.mock.calls[1][0];
    expect(updaterEmpty({ category: 'books', search: 'prev' })).toEqual({
      category: 'books',
      page: undefined,
      search: undefined,
    });
  });

  it('clears specific filters back to initial state', () => {
    const navigate = vi.fn();
    const search: TestSearch = { category: 'music', search: 'guitar' };

    const { clearFilter } = useFilterState({
      initialState,
      navigate,
      search,
    });

    clearFilter('category');

    expect(navigate).toHaveBeenCalledTimes(1);
    const updater = navigate.mock.calls[0][0];
    expect(updater(search)).toEqual({
      category: undefined,
      page: undefined,
      search: 'guitar',
    });
  });

  it('sets pagination properly', () => {
    const navigate = vi.fn();
    const search: TestSearch = { page: 1 };

    const { setPage } = useFilterState({
      initialState,
      navigate,
      search,
    });

    setPage(3);
    const updater3 = navigate.mock.calls[0][0];
    expect(updater3({ page: 1 })).toEqual({ page: 3 });

    setPage(1);
    const updater1 = navigate.mock.calls[1][0];
    expect(updater1({ page: 3 })).toEqual({ page: undefined });
  });

  it('checks active state of keys', () => {
    const navigate = vi.fn();
    const search: TestSearch = { category: 'tech' };

    const { isActive } = useFilterState({
      initialState,
      navigate,
      search,
    });

    expect(isActive('category')).toBe(true);
    expect(isActive('search')).toBe(false);
  });
});
