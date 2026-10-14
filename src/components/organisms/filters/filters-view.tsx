import { Disclosure } from '@heroui/react';
import type { ReactNode } from 'react';

import { FilterSearch } from '@/components/organisms/filters/fields/filter-search';
import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';
import { FiltersPanel } from '@/components/organisms/filters/panel/filters-panel';
import { FiltersTriggerButton } from '@/components/organisms/filters/panel/filters-trigger-button';

type FiltersViewProps = {
  activePanelFilterCount?: number;
  endActions?: ReactNode;
  filterFields: readonly FilterFieldConfig[];
  getFilterValue: (key: string) => FilterValue;
  isExpanded: boolean;
  onClearPanelFilters: () => void;
  onExpandedChange: (expanded: boolean) => void;
  onFilterChange: (key: string, value: FilterValue) => void;
  onSearchChange?: (value: string) => void;
  searchField?: FilterFieldConfig;
  searchValue?: FilterValue;
};

export function FiltersView({
  activePanelFilterCount = 0,
  endActions,
  filterFields,
  getFilterValue,
  isExpanded,
  onClearPanelFilters,
  onExpandedChange,
  onFilterChange,
  onSearchChange,
  searchField,
  searchValue,
}: FiltersViewProps) {
  const hasPanelFilters = activePanelFilterCount > 0;

  if (filterFields.length === 0) {
    return (
      <div className='flex w-full flex-wrap items-center gap-2'>
        {searchField && onSearchChange ? (
          <FilterSearch
            className='min-w-48 flex-1 sm:max-w-md'
            config={searchField}
            onChange={onSearchChange}
            value={searchValue}
          />
        ) : null}
        {endActions ? (
          <div className='ml-auto flex shrink-0 items-center gap-2'>
            {endActions}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Disclosure
      className='w-full'
      isExpanded={isExpanded}
      onExpandedChange={onExpandedChange}
    >
      <div className='flex w-full flex-wrap items-center gap-2'>
        <Disclosure.Heading>
          <FiltersTriggerButton
            activeCount={activePanelFilterCount}
            hasActiveFilters={hasPanelFilters}
          />
        </Disclosure.Heading>

        {searchField && onSearchChange ? (
          <FilterSearch
            className='min-w-48 flex-1 sm:max-w-md'
            config={searchField}
            onChange={onSearchChange}
            value={searchValue}
          />
        ) : null}

        {endActions ? (
          <div className='ml-auto flex shrink-0 items-center gap-2'>
            {endActions}
          </div>
        ) : null}
      </div>

      <FiltersPanel
        fields={filterFields}
        getFilterValue={getFilterValue}
        hasActiveFilters={hasPanelFilters}
        onCancel={() => onExpandedChange(false)}
        onClear={onClearPanelFilters}
        onFilterChange={onFilterChange}
      />
    </Disclosure>
  );
}
