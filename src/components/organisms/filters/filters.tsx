import { type ReactNode, useState } from 'react';

import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';
import { useOptionalFilter } from '@/components/organisms/filters/stores/filter-provider';
import { FiltersView } from './filters-view';

type FiltersProps = {
  activePanelFilterCount?: number;
  endActions?: ReactNode;
  fields?: readonly FilterFieldConfig[];
  getFilterValue?: (key: string) => FilterValue;
  isExpanded?: boolean;
  onClearPanelFilters?: () => void;
  onExpandedChange?: (expanded: boolean) => void;
  onFilterChange?: (key: string, value: FilterValue) => void;
  onSearchChange?: (value: string) => void;
  searchField?: FilterFieldConfig;
  searchValue?: FilterValue;
};

export function Filters({
  activePanelFilterCount: explicitActiveCount,
  endActions,
  fields: explicitFields,
  getFilterValue: explicitGetFilterValue,
  isExpanded: controlledExpanded,
  onClearPanelFilters: explicitOnClearPanelFilters,
  onExpandedChange: controlledOnExpandedChange,
  onFilterChange: explicitOnFilterChange,
  onSearchChange: explicitOnSearchChange,
  searchField: explicitSearchField,
  searchValue: explicitSearchValue,
}: FiltersProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const filterContext = useOptionalFilter();

  const isExpanded = controlledExpanded ?? internalExpanded;
  const onExpandedChange = controlledOnExpandedChange ?? setInternalExpanded;

  // Use props if provided, otherwise context
  const fields = explicitFields ?? filterContext?.fields ?? [];

  const searchField =
    explicitSearchField ?? fields.find((field) => field.type === 'search');
  const filterFields = fields.filter((field) => field.type !== 'search');

  const getFilterValue =
    explicitGetFilterValue ??
    ((key: string) => filterContext?.getFilterValue(key));

  const onFilterChange =
    explicitOnFilterChange ??
    ((key: string, value: FilterValue) =>
      filterContext?.setFilterValue(key, value));

  const onSearchChange =
    explicitOnSearchChange ??
    (searchField
      ? (value: string) => filterContext?.setFilterValue(searchField.key, value)
      : undefined);

  const searchValue =
    explicitSearchValue ??
    (searchField ? getFilterValue(searchField.key) : undefined);

  const activePanelFilterCount =
    explicitActiveCount ??
    filterFields.filter((field) => filterContext?.isActive(field.key)).length;

  const onClearPanelFilters =
    explicitOnClearPanelFilters ??
    (() => {
      if (filterContext) {
        filterContext.clearFilter(...filterFields.map((field) => field.key));
      }
    });

  return (
    <FiltersView
      activePanelFilterCount={activePanelFilterCount}
      endActions={endActions}
      filterFields={filterFields}
      getFilterValue={getFilterValue}
      isExpanded={isExpanded}
      onClearPanelFilters={onClearPanelFilters}
      onExpandedChange={onExpandedChange}
      onFilterChange={onFilterChange}
      onSearchChange={onSearchChange}
      searchField={searchField}
      searchValue={searchValue}
    />
  );
}
