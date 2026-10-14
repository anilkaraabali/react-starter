import { useEffect, useRef } from 'react';

import {
  type AppEventMap,
  type AppEventName,
  eventBus,
} from '@/utils/event-bus.utils';

/**
 * Hook to listen for global events via the Event Bus within React components.
 * Automatically handles event listener cleanup on unmount.
 *
 * @param eventName The name of the event to listen to
 * @param handler The callback function to execute when the event is emitted
 */
export function useAppEvent<T extends AppEventName>(
  eventName: T,
  handler: (payload: AppEventMap[T]) => void
) {
  // Use a ref to store the latest handler to prevent stale closures
  // and avoid unnecessary event listener teardown/setup on every render.
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const unsubscribe = eventBus.on(eventName, (payload) => {
      if (handlerRef.current) {
        handlerRef.current(payload);
      }
    });

    return unsubscribe;
  }, [eventName]);
}
