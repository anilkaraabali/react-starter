import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { ResetPasswordView } from '@/features/auth/components/reset-password-view';
import { resetPasswordSearchSchema } from '@/features/auth/schemas/reset-password-search-schema';

export const Route = createFileRoute('/_auth/reset-password')({
  component: ResetPasswordView,
  staticData: { title: msg`Reset password` },
  validateSearch: zodValidator(resetPasswordSearchSchema),
});
