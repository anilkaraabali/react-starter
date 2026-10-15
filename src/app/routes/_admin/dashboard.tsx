import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Dashboard`),
  },
];

export const Route = createFileRoute('/_admin/dashboard')({
  component: DashboardView,
  loader: () => ({ meta }),
});
