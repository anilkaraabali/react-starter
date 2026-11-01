import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { LoginView } from '@/features/auth/components/login-view';

export const Route = createFileRoute('/_auth/login')({
  component: LoginView,
  staticData: { title: msg`Sign in` },
});
