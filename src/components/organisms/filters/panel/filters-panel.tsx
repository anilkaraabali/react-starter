import { Disclosure } from '@heroui/react';

import { FilterField } from '@/components/organisms/filters/fields/filter-field';
import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';
import { getAwaitedParentField } from '@/components/organisms/filters/utils/filter-state.utils';
import { FiltersPanelActions } from './filters-panel-actions';

type FiltersPanelProps = {
  fields: readonly FilterFieldConfig[];
  getFilterValue: (key: string) => FilterValue;
  hasActiveFilters: boolean;
  onClear: () => void;
  onFilterChange: (key: string, value: FilterValue) => void;
};

export function FiltersPanel({
  fields,
  getFilterValue,
  hasActiveFilters,
  onClear,
  onFilterChange,
}: FiltersPanelProps) {
  return (
    <Disclosure.Content>
      <Disclosure.Body className='bg-surface mt-2 space-y-8 rounded-2xl border p-4'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {fields.map((field) => (
            <FilterField
              field={field}
              isDisabled={
                getAwaitedParentField(fields, field, getFilterValue) !==
                undefined
              }
              key={field.key}
              onChange={(next) => onFilterChange(field.key, next)}
              value={getFilterValue(field.key)}
            />
          ))}
        </div>

        <FiltersPanelActions
          hasActiveFilters={hasActiveFilters}
          onClear={onClear}
        />
      </Disclosure.Body>
    </Disclosure.Content>
  );
}
