import { createRouter, parseSearchWith } from '@tanstack/react-router';
import type { RootRouteContext } from '@/app/router.types';
import type {
  SidebarHeaderMode,
  SidebarNavItem,
} from '@/components/organisms/sidebar/sidebar.types';
import type { APP_ROUTES } from '@/config/app-routes.constants';
import { queryClient } from '@/lib/react-query';
import type { LoaderData } from '@/types/meta.types';
import { stringifySearch } from '@/utils/router-search.utils';
import {
  ADMIN_SCROLL_CONTAINER_ID,
  type ContentPadding,
} from './layouts/admin-layout/admin-layout.constants';
import { ErrorGenericLayout } from './layouts/error/error-generic-layout';
import { routeTree } from './route-tree.gen';

export const router = createRouter({
  basepath: import.meta.env.BASE_URL,
  context: {
    auth: undefined!,
    queryClient,
  } as RootRouteContext,
  defaultErrorComponent: ErrorGenericLayout,
  // Performance optimization: When a user hovers or taps a link (intent),
  // it preloads the route code and fetches the loader data in the background.
  // This makes navigation feel "instant" upon clicking.
  defaultPreload: 'intent',
  parseSearch: parseSearchWith((value) => value),
  routeTree,
  // Automatically restores the user's scroll position when they
  // navigate back or forward through the browser history.
  scrollRestoration: true,
  // New navigations reset these to the top. The admin shell scrolls an inner
  // container (also tagged with `data-scroll-restoration-id` for back/forward).
  scrollToTopSelectors: ['window', `#${ADMIN_SCROLL_CONTAINER_ID}`],
  stringifySearch,
});

declare module '@tanstack/react-router' {
  interface Register {
    routeData: LoaderData;
    router: typeof router;
  }

  interface HistoryState {
    from?: (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
  }

  interface StaticDataRouteOption {
    contentPadding?: ContentPadding;
    hideHeader?: boolean;
    sidebarHeaderMode?: SidebarHeaderMode;
    /** Nav items for this route subtree; the deepest match wins, default `SIDEBAR_ITEMS`. */
    sidebarItems?: readonly SidebarNavItem[];
  }
}
