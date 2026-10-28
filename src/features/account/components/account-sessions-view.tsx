import {
  Alert,
  Button,
  EmptyState,
  toast,
  useOverlayState,
} from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { MonitorOffIcon } from 'lucide-react';
import { useState } from 'react';

import { useSessions } from '@/features/account/api/get-sessions';
import { useRevokeSession } from '@/features/account/api/revoke-session';
import { Account } from '@/features/account/components/blocks/account';
import type { AuthSession } from '@/features/account/types/session.types';
import { signOut, useSession } from '@/lib/auth-client';
import { RevokeOtherSessionsModal } from './sessions/revoke-other-sessions-modal';
import { SessionCard } from './sessions/session-card';
import { SessionsSkeleton } from './sessions/sessions-skeleton';

export function AccountSessionsView() {
  const { t } = useLingui();
  const { data: currentSession } = useSession();
  const {
    data: sessions = [],
    error,
    isError,
    isPending,
    refetch,
  } = useSessions();
  const revokeSessionMutation = useRevokeSession();
  const [revokingToken, setRevokingToken] = useState<null | string>(null);
  const revokeOthersModal = useOverlayState();

  const currentToken = currentSession?.session?.token;
  const isSessionNotFresh = error?.code === 'SESSION_NOT_FRESH';
  const hasOtherSessions =
    !isPending &&
    !isError &&
    sessions.some((session) => session.token !== currentToken);

  const handleSignInAgain = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/login';
        },
      },
    });
  };

  const handleRevoke = async (session: AuthSession) => {
    const isCurrent = session.token === currentToken;
    setRevokingToken(session.token);
    try {
      await revokeSessionMutation.mutateAsync({
        data: {
          isCurrent,
          token: session.token,
        },
      });
      if (isCurrent) {
        toast.success(t`Signed out.`);
      } else {
        toast.success(t`Session revoked.`);
      }
    } finally {
      setRevokingToken(null);
    }
  };

  return (
    <Account.SettingsChunk>
      <Account.PageHeader
        description={t(
          msg`This is a list of devices logged into your account. Cancel any sessions you do not recognize.`
        )}
        title={t`Sessions`}
      />

      <Account.Sections>
        <Account.Section id='sessions'>
          <Account.SectionHeader
            actions={
              hasOtherSessions ? (
                <Button
                  onPress={revokeOthersModal.open}
                  size='sm'
                  variant='secondary'
                >
                  {t`Sign out of all other devices`}
                </Button>
              ) : null
            }
            title={t`Connected Devices`}
          />
          {isPending ? (
            <SessionsSkeleton />
          ) : isSessionNotFresh ? (
            <Alert status='warning'>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>{t`Sign in again to view sessions`}</Alert.Title>
                <Alert.Description>
                  {t(
                    msg`For your security, the session list is only available shortly after signing in.`
                  )}
                </Alert.Description>
                <Button
                  className='mt-2'
                  onPress={handleSignInAgain}
                  size='sm'
                  variant='secondary'
                >
                  {t`Sign in again`}
                </Button>
              </Alert.Content>
            </Alert>
          ) : isError ? (
            <Alert status='danger'>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>{t`Unable to load sessions`}</Alert.Title>
                <Alert.Description>
                  {t(
                    msg`Something went wrong while loading sessions. Please try again.`
                  )}
                </Alert.Description>
                <Button
                  className='mt-2'
                  onPress={() => refetch()}
                  size='sm'
                  variant='danger'
                >
                  {t`Retry`}
                </Button>
              </Alert.Content>
            </Alert>
          ) : sessions.length === 0 ? (
            <EmptyState className='flex flex-col items-center justify-center gap-3 rounded-xl border bg-surface px-4 py-10 text-center'>
              <MonitorOffIcon size={24} />
              <span className='text-sm'>{t`No active sessions.`}</span>
            </EmptyState>
          ) : (
            <div className='flex flex-col gap-3 self-stretch'>
              {sessions.map((session) => {
                const isCurrent = session.token === currentToken;
                const isRevoking =
                  revokingToken === session.token &&
                  revokeSessionMutation.isPending;

                return (
                  <SessionCard
                    isCurrent={isCurrent}
                    isRevoking={isRevoking}
                    key={session.id}
                    onRevoke={() => handleRevoke(session)}
                    session={session}
                  />
                );
              })}
            </div>
          )}
        </Account.Section>
      </Account.Sections>

      <RevokeOtherSessionsModal
        isOpen={revokeOthersModal.isOpen}
        onClose={revokeOthersModal.close}
      />
    </Account.SettingsChunk>
  );
}
