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
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterField({ field, onChange, value }: FilterFieldProps) {
  const commonProps = {
    label: field.label,
    onChange,
    value,
  };

  switch (field.type) {
    case 'autocomplete':
      return (
        <FilterAutocomplete {...commonProps} options={field.props?.options} />
      );
    case 'select':
      return <FilterSelect {...commonProps} options={field.props?.options} />;
    case 'number':
      return <FilterNumber {...commonProps} prefix={field.props?.prefix} />;
    case 'date':
      return <FilterDate {...commonProps} />;
    default:
      return null;
  }
}
