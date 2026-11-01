import { useLingui } from '@lingui/react/macro';
import { useMatches } from '@tanstack/react-router';
import { useContext } from 'react';
import {
  getMetaTagKey,
  mergeMetaTags,
  resolveMetaTag,
} from '@/lib/head/head.utils';
import { HeadContext } from '@/lib/head/head-provider';
import { usePageTitle } from '@/lib/head/use-page-title';

type MetaProps = {
  titleTemplate: string;
};

export function Meta({ titleTemplate }: MetaProps) {
  const { i18n } = useLingui();
  const { head } = useContext(HeadContext);
  const title = usePageTitle();
  const staticTags = useMatches({
    select: (matches) =>
      mergeMetaTags(matches.flatMap((match) => match.staticData.meta ?? [])),
  });
  const tags = mergeMetaTags([
    ...staticTags.map((tag) => resolveMetaTag(tag, i18n)),
    ...(head.meta ?? []),
  ]);

  return (
    <>
      {title ? <title>{titleTemplate.replace(/%s/g, title)}</title> : null}
      {tags.map((tag) =>
        'name' in tag ? (
          <meta
            content={tag.content}
            key={getMetaTagKey(tag)}
            name={tag.name}
          />
        ) : (
          <meta
            content={tag.content}
            key={getMetaTagKey(tag)}
            property={tag.property}
          />
        )
      )}
    </>
  );
}
