import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { LoginView } from '@/features/auth/components/login-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Sign in`),
  },
];

export const Route = createFileRoute('/_auth/login')({
  component: LoginView,
  loader: () => ({ meta }),
});
