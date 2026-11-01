import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { ForgotPasswordView } from '@/features/auth/components/forgot-password-view';

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordView,
  staticData: { title: msg`Forgot password` },
});
