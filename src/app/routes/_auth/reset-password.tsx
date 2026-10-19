import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { ResetPasswordView } from '@/features/auth/components/reset-password-view';
import { resetPasswordSearchSchema } from '@/features/auth/types/reset-password-search.schema';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Reset password`),
  },
];

export const Route = createFileRoute('/_auth/reset-password')({
  component: ResetPasswordView,
  loader: () => ({ meta }),
  validateSearch: zodValidator(resetPasswordSearchSchema),
});
