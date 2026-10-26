import { Disclosure } from '@heroui/react';
import { type ReactNode, useState } from 'react';
import type {
  FilterState,
  FilterValue,
  SearchFilterFieldConfig,
} from '@/components/organisms/filters/filters.types';
import { FiltersToolbar } from '@/components/organisms/filters/filters-toolbar';
import { FiltersPanel } from '@/components/organisms/filters/panel/filters-panel';
import { useFilter } from '@/components/organisms/filters/stores/filter-provider';

type FiltersProps = {
  endActions?: ReactNode;
};

export function Filters({ endActions }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { fields, getFilterValue, isActive, setFilterValue, setFilters } =
    useFilter<FilterState>();

  const searchField = fields.find(
    (field): field is SearchFilterFieldConfig => field.type === 'search'
  );
  const filterFields = fields.filter((field) => field.type !== 'search');

  const [draftValues, setDraftValues] = useState<Record<string, FilterValue>>(
    () =>
      Object.fromEntries(
        filterFields.map((field) => [field.key, getFilterValue(field.key)])
      )
  );

  const handleExpandedChange = (expanded: boolean) => {
    if (expanded) {
      setDraftValues(
        Object.fromEntries(
          filterFields.map((field) => [field.key, getFilterValue(field.key)])
        )
      );
    }
    setIsExpanded(expanded);
  };

  const handleApplyPanelFilters = () => {
    setFilters(draftValues);
    setIsExpanded(false);
  };

  const handleDraftFilterChange = (key: string, value: FilterValue) => {
    setDraftValues((current) => ({ ...current, [key]: value }));
  };

  const handleClearPanelFilters = () => {
    setDraftValues(
      Object.fromEntries(filterFields.map((field) => [field.key, undefined]))
    );
  };

  const activePanelFilterCount = filterFields.filter((field) =>
    isActive(field.key)
  ).length;
  const hasPanelFilters = activePanelFilterCount > 0;

  if (filterFields.length === 0) {
    return null;
  }

  return (
    <Disclosure
      className='w-full'
      isExpanded={isExpanded}
      onExpandedChange={handleExpandedChange}
    >
      <FiltersToolbar
        activeCount={activePanelFilterCount}
        endActions={endActions}
        hasPanelFilters={hasPanelFilters}
        onSearchChange={
          searchField
            ? (value: string) => setFilterValue(searchField.key, value)
            : undefined
        }
        searchPlaceholder={
          searchField?.props?.placeholder ?? searchField?.label
        }
        searchValue={searchField ? getFilterValue(searchField.key) : undefined}
        showFilterTrigger
      />

      <FiltersPanel
        fields={filterFields}
        getFilterValue={(key) => draftValues[key]}
        hasActiveFilters={hasPanelFilters}
        onApply={handleApplyPanelFilters}
        onCancel={() => setIsExpanded(false)}
        onClear={handleClearPanelFilters}
        onFilterChange={handleDraftFilterChange}
      />
    </Disclosure>
  );
}
