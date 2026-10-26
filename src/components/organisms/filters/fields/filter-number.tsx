import { Label, NumberField } from '@heroui/react';
import { NumberFieldGroup } from '@/components/molecules/number-field-group';
import type { FilterValue } from '@/components/organisms/filters/filters.types';

type FilterNumberProps = {
  formatOptions?: Intl.NumberFormatOptions;
  label: string;
  onChange: (value: FilterValue) => void;
  prefix?: string;
  value: FilterValue;
};

export function FilterNumber({
  formatOptions = { maximumFractionDigits: 2, minimumFractionDigits: 0 },
  label,
  onChange,
  prefix,
  value,
}: FilterNumberProps) {
  return (
    <NumberField
      formatOptions={formatOptions}
      minValue={0}
      onChange={onChange}
      value={value as number | undefined}
      variant='secondary'
    >
      <Label>{label}</Label>
      <NumberFieldGroup prefix={prefix} />
    </NumberField>
  );
}
