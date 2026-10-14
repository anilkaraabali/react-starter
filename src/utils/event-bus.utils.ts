/**
 * Centralized application event types.
 * To add a new event, define its name and payload type (or undefined) here.
 */
export type AppEventMap = {
  'auth:unauthorized': undefined; // No payload
  // Example for future events:
  // 'notification:toast': { title?: string; message: string; type: 'success' | 'error' };
};

export type AppEventName = keyof AppEventMap;

/**
 * Type-safe native Event Bus.
 * Uses the browser's native EventTarget (window) but provides
 * strict TypeScript type safety (intellisense) for payloads.
 */
export const eventBus = {
  /**
   * Emits an event. Enforces payload type safety based on AppEventMap.
   */
  emit<T extends AppEventName>(
    name: T,
    ...args: AppEventMap[T] extends undefined
      ? [payload?: undefined]
      : [payload: AppEventMap[T]]
  ): void {
    const payload = args[0];
    const event = new CustomEvent(name, { detail: payload });
    window.dispatchEvent(event);
  },

  /**
   * Raw removeEventListener wrapper.
   * (Usually better to use the unsubscribe function returned by on())
   */
  off<T extends AppEventName>(
    name: T,
    listener: EventListenerOrEventListenerObject
  ): void {
    window.removeEventListener(name, listener);
  },

  /**
   * Listens to an event and returns an unsubscribe (cleanup) function.
   */
  on<T extends AppEventName>(
    name: T,
    listener: (payload: AppEventMap[T]) => void
  ): () => void {
    const wrappedListener = (e: Event) => {
      const customEvent = e as CustomEvent<AppEventMap[T]>;
      listener(customEvent.detail);
    };

    window.addEventListener(name, wrappedListener);

    return () => {
      window.removeEventListener(name, wrappedListener);
    };
  },
};
