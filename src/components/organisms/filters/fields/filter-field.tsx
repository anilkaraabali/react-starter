import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';
import { FilterAutocomplete } from './filter-autocomplete';
import { FilterDate } from './filter-date';
import { FilterNumber } from './filter-number';
import { FilterSelect } from './filter-select';

type FilterFieldProps = {
  field: FilterFieldConfig;
  /** Set when every parent in `dependsOn` is still empty. */
  isDisabled?: boolean;
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterField({
  field,
  isDisabled,
  onChange,
  value,
}: FilterFieldProps) {
  switch (field.type) {
    case 'autocomplete':
      return (
        <FilterAutocomplete
          isDisabled={isDisabled}
          label={field.label}
          onChange={onChange}
          options={field.props?.options}
          value={value}
        />
      );
    case 'select':
      return (
        <FilterSelect
          isDisabled={isDisabled}
          label={field.label}
          onChange={onChange}
          options={field.props?.options}
          value={value}
        />
      );
    case 'number':
      return (
        <FilterNumber
          label={field.label}
          onChange={onChange}
          prefix={field.props?.prefix}
          value={value}
        />
      );
    case 'date':
      return (
        <FilterDate label={field.label} onChange={onChange} value={value} />
      );
    default:
      return null;
  }
}
