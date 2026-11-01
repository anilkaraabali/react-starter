import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Head } from '@/lib/head/head.types';

type HeadContextValue = {
  head: Head;
  setHead: (head: Head) => void;
};

export const HeadContext = createContext<HeadContextValue>({
  head: {},
  setHead: () => undefined,
});

export function HeadProvider({ children }: { children: ReactNode }) {
  const [head, setHead] = useState<Head>({});
  const value = useMemo(() => ({ head, setHead }), [head]);

  return <HeadContext value={value}>{children}</HeadContext>;
}

/**
 * Publishes data-dependent head info (`title`, `meta`) from the page that
 * loaded the entity; cleared on unmount. Pass a memoised `meta` array.
 */
export function useDynamicHead({ meta, title }: Head) {
  const { setHead } = useContext(HeadContext);

  useEffect(() => {
    setHead({ meta, title });

    return () => setHead({});
  }, [meta, setHead, title]);
}
