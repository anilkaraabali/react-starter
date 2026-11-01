import { useLingui } from '@lingui/react/macro';
import { useMatches } from '@tanstack/react-router';
import { useContext } from 'react';
import { composePageTitle } from '@/lib/head/head.utils';
import { HeadContext } from '@/lib/head/head-provider';

/**
 * Page title: the deepest route's `staticData.title`, replaced by the loaded
 * entity's name when the page published one via `useDynamicHead`.
 */
export function usePageTitle() {
  const { i18n } = useLingui();
  const { head } = useContext(HeadContext);
  const title = useMatches({
    select: (matches) =>
      matches.findLast((match) => match.staticData.title)?.staticData.title,
  });

  return composePageTitle(title ? i18n._(title) : undefined, head.title);
}
