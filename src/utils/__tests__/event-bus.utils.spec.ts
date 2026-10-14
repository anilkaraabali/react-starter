import { afterEach, describe, expect, it, vi } from 'vitest';

import { eventBus } from '@/utils/event-bus.utils';

describe('event-bus.utils', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('emit', () => {
    it('dispatches an event with the given name', () => {
      const spy = vi.spyOn(window, 'dispatchEvent');

      eventBus.emit('auth:unauthorized');

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
      expect((spy.mock.calls[0][0] as CustomEvent).type).toBe(
        'auth:unauthorized'
      );
    });

    it('reaches a listener registered with the native API', () => {
      const listener = vi.fn();

      window.addEventListener('auth:unauthorized', listener);
      eventBus.emit('auth:unauthorized');
      window.removeEventListener('auth:unauthorized', listener);

      expect(listener).toHaveBeenCalledOnce();
    });
  });

  describe('on', () => {
    it('calls the listener with the payload', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.on('auth:unauthorized', listener);

      eventBus.emit('auth:unauthorized');

      // `AppEventMap['auth:unauthorized']` is `undefined`, but CustomEvent
      // normalises an undefined `detail` to null, so that is what arrives.
      expect(listener).toHaveBeenCalledWith(null);
      unsubscribe();
    });

    it('stops calling the listener after unsubscribe', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.on('auth:unauthorized', listener);

      eventBus.emit('auth:unauthorized');
      unsubscribe();
      eventBus.emit('auth:unauthorized');

      expect(listener).toHaveBeenCalledOnce();
    });

    it('supports several independent listeners', () => {
      const first = vi.fn();
      const second = vi.fn();
      const unsubscribeFirst = eventBus.on('auth:unauthorized', first);
      const unsubscribeSecond = eventBus.on('auth:unauthorized', second);

      eventBus.emit('auth:unauthorized');
      unsubscribeFirst();
      eventBus.emit('auth:unauthorized');

      expect(first).toHaveBeenCalledOnce();
      expect(second).toHaveBeenCalledTimes(2);
      unsubscribeSecond();
    });

    it('does not leak the wrapper, so off can remove a raw listener', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.on('auth:unauthorized', listener);

      unsubscribe();
      eventBus.emit('auth:unauthorized');

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('off', () => {
    it('removes a listener added with the native API', () => {
      const listener = vi.fn();

      window.addEventListener('auth:unauthorized', listener);
      eventBus.off('auth:unauthorized', listener);
      eventBus.emit('auth:unauthorized');

      expect(listener).not.toHaveBeenCalled();
    });

    it('is a no-op for a listener that was never added', () => {
      const neverAdded: EventListener = () => undefined;

      expect(() => eventBus.off('auth:unauthorized', neverAdded)).not.toThrow();
    });
  });
});
