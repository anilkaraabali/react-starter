import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import type { MetaFunction } from '@/app/router.types';
import { ForgotPasswordView } from '@/features/auth/components/forgot-password-view';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Forgot password`),
  },
];

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordView,
  loader: () => ({ meta }),
});
