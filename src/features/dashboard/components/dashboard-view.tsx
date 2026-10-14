import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { EmptyPagePlaceholder } from '@/components/molecules/empty-page-placeholder';
import { PageHeader } from '@/components/molecules/page-header';
import { useSession } from '@/lib/auth-client';

export function DashboardView() {
  const { _ } = useLingui();
  const { data: session } = useSession();
  const name = session?.user?.name;

  return (
    <>
      <PageHeader
        description={
          name ? _(msg`Welcome back, ${name}.`) : _(msg`Welcome back.`)
        }
      />
      <EmptyPagePlaceholder
        description={_(msg`Your overview will appear here.`)}
        title={_(msg`Dashboard coming soon`)}
      />
    </>
  );
}
