import { useLingui } from '@lingui/react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Meta } from '@/app/meta';
import type { RootRouteContext } from '@/app/router.types';
import { RouterNavigationProgress } from '@/app/router-navigation-progress';
import { getPageTitleTemplate } from '@/utils/page-title.utils';

function RootComponent() {
  const { i18n } = useLingui();
  const titleTemplate = getPageTitleTemplate(i18n);

  return (
    <>
      <Meta titleTemplate={titleTemplate} />
      <RouterNavigationProgress />
      <Outlet />
    </>
  );
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
});
