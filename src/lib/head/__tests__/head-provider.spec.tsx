import { renderHook } from '@testing-library/react';
import { type ReactNode, useContext } from 'react';
import { describe, expect, it } from 'vitest';
import type { Head } from '@/lib/head/head.types';
import {
  HeadContext,
  HeadProvider,
  useDynamicHead,
} from '@/lib/head/head-provider';

function wrapper({ children }: { children: ReactNode }) {
  return <HeadProvider>{children}</HeadProvider>;
}

function renderDynamicHead(initial: Head) {
  return renderHook(
    ({ head }: { head: Head }) => {
      useDynamicHead(head);
      return useContext(HeadContext).head;
    },
    { initialProps: { head: initial }, wrapper }
  );
}

describe('useDynamicHead', () => {
  it('publishes the title and meta to the page head', () => {
    const meta = [{ content: 'Acme', name: 'description' }];
    const { result } = renderDynamicHead({ meta, title: 'Acme' });

    expect(result.current).toEqual({ meta, title: 'Acme' });
  });

  it('follows the title as the entity loads or changes', () => {
    const { rerender, result } = renderDynamicHead({ title: undefined });

    expect(result.current.title).toBeUndefined();

    rerender({ head: { title: 'Acme' } });
    expect(result.current.title).toBe('Acme');

    rerender({ head: { title: 'Globex' } });
    expect(result.current.title).toBe('Globex');
  });

  it('clears the head on unmount', () => {
    const { result, unmount } = renderHook(() => useContext(HeadContext), {
      wrapper,
    });
    const publisher = renderHook(() => useDynamicHead({ title: 'Acme' }), {
      wrapper: ({ children }) => (
        <HeadContext value={result.current}>{children}</HeadContext>
      ),
    });

    publisher.unmount();
    expect(result.current.head).toEqual({});
    unmount();
  });
});
