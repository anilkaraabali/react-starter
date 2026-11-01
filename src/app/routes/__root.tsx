import { useLingui } from '@lingui/react/macro';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { HeadProvider } from '@/lib/head/head-provider';
import { GlobalError } from '@/app/layouts/error/global-error';
import { NotFound } from '@/app/layouts/error/not-found';
import { Meta } from '@/app/meta';
import { NavigationProgress } from '@/app/navigation-progress';
import type { RootRouteContext } from '@/app/router.types';
import { getPageTitleTemplate } from '@/utils/page-title.utils';

function RootComponent() {
  const { i18n } = useLingui();
  const titleTemplate = getPageTitleTemplate(i18n);

  return (
    <HeadProvider>
      <Meta titleTemplate={titleTemplate} />
      <NavigationProgress />
      <Outlet />
    </HeadProvider>
  );
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  errorComponent: GlobalError,
  notFoundComponent: NotFound,
});
