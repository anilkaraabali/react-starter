import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useAppEvent } from '@/hooks/use-app-event';
import { eventBus } from '@/utils/event-bus.utils';

describe('use-app-event', () => {
  it('calls the handler when the event is emitted', () => {
    const handler = vi.fn();
    renderHook(() => useAppEvent('auth:unauthorized', handler));

    act(() => eventBus.emit('auth:unauthorized'));

    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not call the handler before the event is emitted', () => {
    const handler = vi.fn();
    renderHook(() => useAppEvent('auth:unauthorized', handler));

    expect(handler).not.toHaveBeenCalled();
  });

  it('calls the handler once per emit', () => {
    const handler = vi.fn();
    renderHook(() => useAppEvent('auth:unauthorized', handler));

    act(() => {
      eventBus.emit('auth:unauthorized');
      eventBus.emit('auth:unauthorized');
    });

    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('removes the listener on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() =>
      useAppEvent('auth:unauthorized', handler)
    );

    unmount();
    act(() => eventBus.emit('auth:unauthorized'));

    expect(handler).not.toHaveBeenCalled();
  });

  it('uses the latest handler without re-subscribing', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(
      ({ handler }: { handler: () => void }) =>
        useAppEvent('auth:unauthorized', handler),
      { initialProps: { handler: first } }
    );

    rerender({ handler: second });
    act(() => eventBus.emit('auth:unauthorized'));

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
  });

  it('keeps working across a re-render of the same handler', () => {
    const handler = vi.fn();
    const { rerender } = renderHook(() =>
      useAppEvent('auth:unauthorized', handler)
    );

    rerender();
    act(() => eventBus.emit('auth:unauthorized'));

    expect(handler).toHaveBeenCalledOnce();
  });
});
