import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';
import {
  parseDateFilterValue,
  serializeDateFilterValue,
} from '@/components/organisms/filters/utils/filter-date.utils';
import { FilterAutocomplete } from './filter-autocomplete';
import { FilterDate } from './filter-date';
import { FilterNumber } from './filter-number';
import { FilterSelect } from './filter-select';

type FilterFieldProps = {
  field: FilterFieldConfig;
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterField({ field, onChange, value }: FilterFieldProps) {
  switch (field.type) {
    case 'autocomplete':
      return (
        <FilterAutocomplete config={field} onChange={onChange} value={value} />
      );
    case 'select':
    case 'multiselect':
      return <FilterSelect config={field} onChange={onChange} value={value} />;
    case 'number':
      return <FilterNumber config={field} onChange={onChange} value={value} />;
    case 'date':
      // The URL holds `YYYY-MM-DD`; `FilterDate` works with `CalendarDate | null`.
      return (
        <FilterDate
          config={field}
          onChange={(next) => onChange(serializeDateFilterValue(next))}
          value={parseDateFilterValue(value)}
        />
      );
    default:
      return null;
  }
}
