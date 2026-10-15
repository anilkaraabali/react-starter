import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { EmptyPagePlaceholder } from '@/components/molecules/empty-page-placeholder';
import { ContentLayout } from '@/components/templates/content-layout';
import { useSession } from '@/lib/auth-client';

export function DashboardView() {
  const { _ } = useLingui();
  const { data: session } = useSession();
  const name = session?.user?.name;

  return (
    <ContentLayout
      description={
        name ? _(msg`Welcome back, ${name}.`) : _(msg`Welcome back.`)
      }
    >
      <EmptyPagePlaceholder
        description={_(msg`Your overview will appear here.`)}
        title={_(msg`Dashboard coming soon`)}
      />
    </ContentLayout>
  );
}
