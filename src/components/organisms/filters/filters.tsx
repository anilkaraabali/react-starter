import { Disclosure } from '@heroui/react';
import type { ReactNode } from 'react';
import type {
  FilterState,
  SearchFilterFieldConfig,
} from '@/components/organisms/filters/filters.types';
import { FiltersToolbar } from '@/components/organisms/filters/filters-toolbar';
import { FiltersPanel } from '@/components/organisms/filters/panel/filters-panel';
import { useFilter } from '@/components/organisms/filters/stores/filter-provider';

type FiltersProps = {
  endActions?: ReactNode;
};

export function Filters({ endActions }: FiltersProps) {
  const { fields, getFilterValue, isActive, setFilterValue, setFilters } =
    useFilter<FilterState>();

  const searchField = fields.find(
    (field): field is SearchFilterFieldConfig => field.type === 'search'
  );
  const filterFields = fields.filter((field) => field.type !== 'search');

  const handleClearPanelFilters = () => {
    setFilters(
      Object.fromEntries(filterFields.map((field) => [field.key, undefined]))
    );
  };

  const activePanelFilterCount = filterFields.filter((field) =>
    isActive(field.key)
  ).length;
  const hasPanelFilters = activePanelFilterCount > 0;

  if (!searchField && filterFields.length === 0) {
    return null;
  }

  const searchProps = {
    onSearchChange: searchField
      ? (value: string) => setFilterValue(searchField.key, value)
      : undefined,
    searchPlaceholder: searchField?.props?.placeholder ?? searchField?.label,
    searchValue: searchField ? getFilterValue(searchField.key) : undefined,
  };

  // Search-only lists have no panel fields, so no trigger or panel is rendered.
  if (filterFields.length === 0) {
    return (
      <FiltersToolbar
        activeCount={0}
        endActions={endActions}
        hasPanelFilters={false}
        {...searchProps}
        showFilterTrigger={false}
      />
    );
  }

  return (
    <Disclosure className='w-full'>
      <FiltersToolbar
        activeCount={activePanelFilterCount}
        endActions={endActions}
        hasPanelFilters={hasPanelFilters}
        {...searchProps}
        showFilterTrigger
      />

      <FiltersPanel
        fields={filterFields}
        getFilterValue={getFilterValue}
        hasActiveFilters={hasPanelFilters}
        onClear={handleClearPanelFilters}
        onFilterChange={setFilterValue}
      />
    </Disclosure>
  );
}
