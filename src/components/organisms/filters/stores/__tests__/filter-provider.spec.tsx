import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';
import {
  FilterProvider,
  useFilter,
} from '@/components/organisms/filters/stores/filter-provider';
import { useFilterState } from '@/components/organisms/filters/stores/use-filter-state';

type TestFilters = {
  makeId?: string;
  modelId?: string;
  page?: number;
};

const fields: FilterFieldConfig<TestFilters>[] = [
  { key: 'makeId', label: 'Make', type: 'select' },
  {
    dependsOn: ['makeId'],
    key: 'modelId',
    label: 'Model',
    type: 'select',
  },
];

function TestProvider({
  children,
  navigate,
  search,
}: {
  children: ReactNode;
  navigate: (updater: (prev: TestFilters) => TestFilters) => void;
  search: TestFilters;
}) {
  const state = useFilterState<TestFilters>({
    initialState: { makeId: undefined, modelId: undefined, page: 1 },
    navigate,
    search,
  });

  return (
    <FilterProvider fields={fields} value={state}>
      {children}
    </FilterProvider>
  );
}

function setup(search: TestFilters) {
  const navigate = vi.fn();
  const { result } = renderHook(() => useFilter<TestFilters>(), {
    wrapper: ({ children }) => (
      <TestProvider navigate={navigate} search={search}>
        {children}
      </TestProvider>
    ),
  });

  return { navigate, result };
}

function lastUpdate(navigate: ReturnType<typeof vi.fn>, prev: TestFilters) {
  const updater = navigate.mock.calls.at(-1)?.[0];
  return updater(prev);
}

describe('FilterProvider', () => {
  it('applies a field change immediately and resets the page', () => {
    const { navigate, result } = setup({});

    result.current.setFilterValue('makeId', 'm1');

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(lastUpdate(navigate, { page: 3 })).toEqual({
      makeId: 'm1',
      page: undefined,
    });
  });

  it('clears dependent fields in the same update', () => {
    const { navigate, result } = setup({ makeId: 'm1', modelId: 'mo1' });

    result.current.setFilterValue('makeId', 'm2');

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(lastUpdate(navigate, { makeId: 'm1', modelId: 'mo1' })).toEqual({
      makeId: 'm2',
      modelId: undefined,
      page: undefined,
    });
  });

  it('does not clear dependents when changing a child field', () => {
    const { navigate, result } = setup({ makeId: 'm1', modelId: 'mo1' });

    result.current.setFilterValue('modelId', 'mo2');

    expect(lastUpdate(navigate, { makeId: 'm1', modelId: 'mo1' })).toEqual({
      makeId: 'm1',
      modelId: 'mo2',
      page: undefined,
    });
  });
});
