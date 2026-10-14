import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import type { MetaFunction } from '@/app/router.types';
import { RegisterView } from '@/features/auth/components/register-view';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Sign up`),
  },
];

export const Route = createFileRoute('/_auth/register')({
  component: RegisterView,
  loader: () => ({ meta }),
});
