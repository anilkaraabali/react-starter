import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { RegisterView } from '@/features/auth/components/register-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Sign up`),
  },
];

export const Route = createFileRoute('/_auth/register')({
  component: RegisterView,
  loader: () => ({ meta }),
});
