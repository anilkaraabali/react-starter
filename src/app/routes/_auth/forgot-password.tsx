import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { ForgotPasswordView } from '@/features/auth/components/forgot-password-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Forgot password`),
  },
];

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordView,
  loader: () => ({ meta }),
});
