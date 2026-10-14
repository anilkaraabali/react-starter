import { Skeleton } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { Account } from '@/features/account/components/blocks/account';

const MEMBER_ROW_KEYS = ['first', 'second', 'third'] as const;

export function OrganizationSkeleton() {
  const { _ } = useLingui();

  return (
    <Account.Sections>
      <Account.Section>
        <Account.Header titleOnly>
          <Account.HeaderLeadingItems>
            <Account.HeaderLabel>{_(msg`General`)}</Account.HeaderLabel>
          </Account.HeaderLeadingItems>
        </Account.Header>
        <Account.CellList>
          <Account.Cell>
            <Account.CellLeadingItems>
              <Account.CellContent className='gap-1.5'>
                <Skeleton className='h-4 w-32 rounded-md' />
                <Skeleton className='h-4 w-48 rounded-md' />
              </Account.CellContent>
            </Account.CellLeadingItems>
          </Account.Cell>
        </Account.CellList>
      </Account.Section>

      <Account.Section>
        <Account.Header titleOnly>
          <Account.HeaderLeadingItems>
            <Account.HeaderLabel>{_(msg`Members`)}</Account.HeaderLabel>
          </Account.HeaderLeadingItems>
        </Account.Header>
        <Account.CellList>
          {MEMBER_ROW_KEYS.map((key) => (
            <Account.Cell key={key}>
              <Account.CellLeadingItems>
                <Skeleton className='size-10 shrink-0 rounded-full' />
                <Account.CellContent className='gap-1.5'>
                  <Skeleton className='h-4 w-36 rounded-md' />
                  <Skeleton className='h-4 w-52 rounded-md' />
                </Account.CellContent>
              </Account.CellLeadingItems>
              <Account.CellTrailingItems className='items-center'>
                <Skeleton className='h-8 w-28 rounded-lg' />
              </Account.CellTrailingItems>
            </Account.Cell>
          ))}
        </Account.CellList>
      </Account.Section>
    </Account.Sections>
  );
}
