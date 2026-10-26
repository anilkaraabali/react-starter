import { Disclosure } from '@heroui/react';
import type { ReactNode } from 'react';
import { FilterSearch } from '@/components/organisms/filters/fields/filter-search';
import type { FilterValue } from '@/components/organisms/filters/filters.types';
import { FiltersTriggerButton } from '@/components/organisms/filters/panel/filters-trigger-button';

type FiltersToolbarProps = {
  activeCount: number;
  endActions?: ReactNode;
  hasPanelFilters: boolean;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchValue?: FilterValue;
  showFilterTrigger: boolean;
};

export function FiltersToolbar({
  activeCount,
  endActions,
  hasPanelFilters,
  onSearchChange,
  searchPlaceholder,
  searchValue,
  showFilterTrigger,
}: FiltersToolbarProps) {
  return (
    <div className='flex w-full flex-wrap items-center gap-2'>
      {showFilterTrigger ? (
        <Disclosure.Heading>
          <FiltersTriggerButton
            activeCount={activeCount}
            hasActiveFilters={hasPanelFilters}
          />
        </Disclosure.Heading>
      ) : null}

      {searchPlaceholder && onSearchChange ? (
        <FilterSearch
          className='min-w-48 flex-1 sm:max-w-md'
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          value={searchValue}
        />
      ) : null}

      {endActions ? (
        <div className='ml-auto flex shrink-0 items-center gap-2'>
          {endActions}
        </div>
      ) : null}
    </div>
  );
}
