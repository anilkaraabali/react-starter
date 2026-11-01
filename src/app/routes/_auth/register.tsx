import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { RegisterView } from '@/features/auth/components/register-view';

export const Route = createFileRoute('/_auth/register')({
  component: RegisterView,
  staticData: { title: msg`Sign up` },
});
