import { cn, SearchField } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import type { FilterValue } from '@/components/organisms/filters/filters.types';

const SEARCH_DEBOUNCE_MS = 300;

type FilterSearchProps = {
  className?: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: FilterValue;
};

export function FilterSearch({
  className,
  onChange,
  placeholder,
  value,
}: FilterSearchProps) {
  const { t } = useLingui();
  const urlValue = typeof value === 'string' ? value : '';
  const [localValue, setLocalValue] = useState(urlValue);
  const debouncedOnChange = useDebounceCallback(onChange, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setLocalValue(urlValue);
  }, [urlValue]);

  return (
    <SearchField
      aria-label={t`Search`}
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
        <SearchField.Input placeholder={placeholder} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
