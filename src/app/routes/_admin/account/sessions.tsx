import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountSessionsView } from '@/features/account/components/account-sessions-view';

export const Route = createFileRoute('/_admin/account/sessions')({
  component: AccountSessionsView,
  staticData: { title: msg`Sessions` },
});
