import { Label, NumberField } from '@heroui/react';
import { NumberFieldGroup } from '@/components/molecules/number-field-group';
import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';

type FilterNumberProps = {
  config: FilterFieldConfig;
  onChange: (value: FilterValue) => void;
  value: FilterValue;
};

export function FilterNumber({ config, onChange, value }: FilterNumberProps) {
  return (
    <NumberField
      formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 0 }}
      minValue={0}
      onChange={onChange}
      value={value as number | undefined}
      variant='secondary'
    >
      <Label>{config.label}</Label>
      <NumberFieldGroup prefix={config.prefix} />
    </NumberField>
  );
}
