import { useLingui } from '@lingui/react';
import { useRouterState } from '@tanstack/react-router';
import { Fragment, type ReactNode } from 'react';

import type { LoaderData } from '@/app/router.types';

type MetaProps = {
  titleTemplate: string;
};

export function Meta({ titleTemplate }: MetaProps) {
  const { i18n } = useLingui();
  const metas = useRouterState({
    select: (state) => {
      const metaMap = state.matches.reduce<Map<string, ReactNode>>(
        (acc, match) => {
          const loaderData = match.loaderData as LoaderData;

          if (!loaderData?.meta) {
            return acc;
          }

          const meta = loaderData.meta(i18n, loaderData);

          for (const tag of meta) {
            if ('title' in tag) {
              const pageTitle = titleTemplate.replace(/%s/g, tag.title);
              acc.set('title', <title>{pageTitle}</title>);
            }

            if ('name' in tag) {
              acc.set(tag.name, <meta content={tag.content} name={tag.name} />);
            }

            if ('property' in tag) {
              acc.set(
                tag.property,
                <meta content={tag.content} property={tag.property} />
              );
            }
          }

          return acc;
        },
        new Map()
      );

      return Array.from(metaMap.entries());
    },
  });

  return (
    <>
      {metas.map(([key, tag]) => (
        <Fragment key={key}>{tag}</Fragment>
      ))}
    </>
  );
}
