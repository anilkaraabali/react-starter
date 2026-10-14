import { cn, SearchField } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';

const SEARCH_DEBOUNCE_MS = 300;

type FilterSearchProps = {
  className?: string;
  config: FilterFieldConfig;
  onChange: (value: string) => void;
  value: FilterValue;
};

export function FilterSearch({
  className,
  config,
  onChange,
  value,
}: FilterSearchProps) {
  const { _ } = useLingui();
  const urlValue = typeof value === 'string' ? value : '';
  const [localValue, setLocalValue] = useState(urlValue);
  const debouncedOnChange = useDebounceCallback(onChange, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setLocalValue(urlValue);
  }, [urlValue]);

  return (
    <SearchField
      aria-label={_(msg`Search`)}
      className={cn('min-w-48 flex-1 sm:max-w-md', className)}
      name='search'
      onChange={(next) => {
        setLocalValue(next);

        if (next === '') {
          debouncedOnChange.cancel();
          onChange('');
          return;
        }

        debouncedOnChange(next);
      }}
      value={localValue}
    >
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder={config.label} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
