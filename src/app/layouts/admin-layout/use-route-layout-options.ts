import { useRouterState } from '@tanstack/react-router';

/**
 * Layout flags from route `staticData`. Each flag is its own primitive selector,
 * so the shell only re-renders when a flag actually changes.
 */
export function useRouteLayoutOptions() {
  const contentPadding = useRouterState({
    select: (s) =>
      s.matches.findLast((m) => m.staticData.contentPadding !== undefined)
        ?.staticData.contentPadding ?? 'default',
  });
  const hideHeader = useRouterState({
    select: (s) => s.matches.some((m) => m.staticData.hideHeader),
  });

  return { contentPadding, hideHeader };
}
