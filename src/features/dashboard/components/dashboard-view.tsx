import { useLingui } from '@lingui/react/macro';
import { EmptyPagePlaceholder } from '@/components/molecules/empty-page-placeholder';
import { ContentLayout } from '@/components/templates/content-layout';
import { useSession } from '@/lib/auth-client';

export function DashboardView() {
  const { t } = useLingui();
  const { data: session } = useSession();
  const name = session?.user?.name;

  return (
    <ContentLayout
      description={name ? t`Welcome back, ${name}.` : t`Welcome back.`}
    >
      <EmptyPagePlaceholder
        description={t`Your overview will appear here.`}
        title={t`Dashboard coming soon`}
      />
    </ContentLayout>
  );
}
