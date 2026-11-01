import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountOrganizationView } from '@/features/account/components/account-organization-view';

export const Route = createFileRoute('/_admin/account/organization')({
  component: AccountOrganizationView,
  staticData: { title: msg`Organization` },
});
