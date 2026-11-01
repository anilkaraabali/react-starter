import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';

export const Route = createFileRoute('/_admin/dashboard')({
  component: DashboardView,
  staticData: { title: msg`Dashboard` },
});
