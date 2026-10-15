import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountSessionsView } from '@/features/account/components/account-sessions-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Sessions`),
  },
];

export const Route = createFileRoute('/_admin/account/sessions')({
  component: AccountSessionsView,
  loader: () => ({ meta }),
});
