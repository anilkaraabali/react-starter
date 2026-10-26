import { Disclosure } from '@heroui/react';

import { FilterField } from '@/components/organisms/filters/fields/filter-field';
import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';
import { FiltersPanelActions } from './filters-panel-actions';

type FiltersPanelProps = {
  fields: readonly FilterFieldConfig[];
  getFilterValue: (key: string) => FilterValue;
  hasActiveFilters: boolean;
  onApply: () => void;
  onCancel: () => void;
  onClear: () => void;
  onFilterChange: (key: string, value: FilterValue) => void;
};

export function FiltersPanel({
  fields,
  getFilterValue,
  hasActiveFilters,
  onApply,
  onCancel,
  onClear,
  onFilterChange,
}: FiltersPanelProps) {
  return (
    <Disclosure.Content>
      <Disclosure.Body className='mt-2 space-y-8 rounded-2xl border bg-surface p-4'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {fields.map((field) => (
            <FilterField
              field={field}
              key={field.key}
              onChange={(next) => onFilterChange(field.key, next)}
              value={getFilterValue(field.key)}
            />
          ))}
        </div>

        <FiltersPanelActions
          hasActiveFilters={hasActiveFilters}
          onApply={onApply}
          onCancel={onCancel}
          onClear={onClear}
        />
      </Disclosure.Body>
    </Disclosure.Content>
  );
}
