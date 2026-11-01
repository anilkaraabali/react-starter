import { useEffect, useRef, useState } from 'react';

function getScrollParent(element: HTMLElement): HTMLElement | null {
  let parent = element.parentElement;

  while (parent) {
    const { overflowY } = getComputedStyle(parent);
    if (
      overflowY === 'auto' ||
      overflowY === 'scroll' ||
      overflowY === 'overlay'
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

type StickyEdge = 'bottom' | 'top';

export function useSticky<T extends HTMLElement>(
  enabled = true,
  edge: StickyEdge = 'top'
) {
  const ref = useRef<T>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const root = getScrollParent(element);

    const update = () => {
      const rect = element.getBoundingClientRect();

      if (edge === 'bottom') {
        const rootBottom = root?.getBoundingClientRect().bottom ?? innerHeight;
        const hasOverflowBelow = root
          ? root.scrollTop + root.clientHeight < root.scrollHeight - 1
          : false;
        setIsSticky(rect.bottom >= rootBottom - 1 && hasOverflowBelow);
        return;
      }

      const rootTop = root?.getBoundingClientRect().top ?? 0;
      setIsSticky(rect.top <= rootTop + 1);
    };

    update();
    root?.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const resizeObserver = new ResizeObserver(update);
    if (root) resizeObserver.observe(root.firstElementChild ?? root);

    return () => {
      root?.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
    };
  }, [enabled, edge]);

  return [ref, isSticky] as const;
}
