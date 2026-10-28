import { useLingui } from '@lingui/react/macro';
import { useRouterState } from '@tanstack/react-router';

import type { LoaderData } from '@/types/meta.types';

/** Title from the leaf route's `loaderData.meta` (same source as the document `<title>`). */
export function usePageTitle() {
  const { i18n } = useLingui();

  return useRouterState({
    select: (state) => {
      const leafMatch = state.matches[state.matches.length - 1];
      const loaderData = leafMatch?.loaderData as LoaderData | undefined;

      if (!loaderData?.meta) {
        return undefined;
      }

      const titleTag = loaderData
        .meta(i18n, loaderData)
        .find(
          (tag): tag is { title: string } =>
            'title' in tag && Boolean(tag.title)
        );

      return titleTag?.title;
    },
  });
}
