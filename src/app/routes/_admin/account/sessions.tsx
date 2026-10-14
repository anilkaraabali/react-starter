import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import type { MetaFunction } from '@/app/router.types';
import { AccountSessionsView } from '@/features/account/components/account-sessions-view';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Sessions`),
  },
];

export const Route = createFileRoute('/_admin/account/sessions')({
  component: AccountSessionsView,
  loader: () => ({ meta }),
});
