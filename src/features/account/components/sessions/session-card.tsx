import { Button, Chip, Separator } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import type { AuthSession } from '@/features/account/types/session.types';
import { parseUserAgent } from '@/features/account/utils/parse-user-agent.utils';
import { SessionDeviceIcon } from './session-device-icon';

import 'dayjs/locale/tr';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

type SessionCardProps = {
  isCurrent: boolean;
  isRevoking: boolean;
  onRevoke: () => void;
  session: AuthSession;
};

export function SessionCard({
  isCurrent,
  isRevoking,
  onRevoke,
  session,
}: SessionCardProps) {
  const { _, i18n } = useLingui();
  const { browser, device } = parseUserAgent(session.userAgent);
  const lastActive = dayjs(session.updatedAt).locale(i18n.locale);
  const firstLogin = dayjs(session.createdAt).locale(i18n.locale);
  const ipAddress = session.ipAddress?.trim();

  return (
    <article className='flex items-start gap-4 rounded-xl border border-border bg-surface p-4'>
      <SessionDeviceIcon device={device} />
      <div className='flex min-w-0 grow flex-col gap-1'>
        <h3 className='flex items-center gap-2 font-medium text-foreground text-sm'>
          {device} <Separator orientation='vertical' /> {browser}
        </h3>
        <p className='text-muted text-xs'>
          {`${lastActive.fromNow()}, ${lastActive.format('LT')}`}
        </p>
        <dl className='mt-1 flex flex-col gap-0.5 text-muted text-xs'>
          <div>
            <dt className='inline font-medium text-foreground'>
              {_(msg`First Login`)}:
            </dt>{' '}
            <dd className='inline'>{firstLogin.format('L, LT')}</dd>
          </div>
          <div>
            <dt className='inline font-medium text-foreground'>
              {_(msg`IP Address`)}:
            </dt>{' '}
            <dd className='inline'>
              {ipAddress ? ipAddress : _(msg`Unknown`)}
            </dd>
          </div>
        </dl>
      </div>
      <div className='shrink-0 self-start'>
        {isCurrent ? (
          <Chip color='success' size='sm' variant='soft'>
            {_(msg`Active Session`)}
          </Chip>
        ) : (
          <Button
            isPending={isRevoking}
            onPress={onRevoke}
            size='sm'
            variant='secondary'
          >
            {_(msg`Revoke`)}
          </Button>
        )}
      </div>
    </article>
  );
}
