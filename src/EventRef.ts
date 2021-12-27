import { RefObject, createRef, useMemo } from "react";

import { isFunction } from "ntils";

type AnyFunction = (...args: any) => any;

export type EventRefComposeHandler = AnyFunction & {
  handlers?: AnyFunction[];
};

export type EventRefHandlers = Map<string, EventRefComposeHandler>;

export type EventRefObject = RefObject<EventTarget> & {
  events?: EventRefHandlers;
};

export const createEventRef = (): EventRefObject => {
  const events = new Map<string, EventRefComposeHandler>();
  const addEventListener = (
    name: string,
    listener: EventListenerOrEventListenerObject
  ) => {
    if (!events.has(name)) {
      events.set(name, (...args: any) =>
        events.get(name).handlers.forEach(item => item(...args))
      );
      events.get(name).handlers = [];
    }
    const composeHandler = events.get(name);
    const handler = isFunction(listener) ? listener : listener.handleEvent;
    composeHandler.handlers.push(handler);
  };
  const removeEventListener = (name: string) => !!name;
  const dispatchEvent = (event: Event) => !!event;
  const target = { addEventListener, removeEventListener, dispatchEvent };
  const eventProxyRef: EventRefObject = createRef();
  Object.defineProperty(eventProxyRef, "current", { get: () => target });
  Object.defineProperty(eventProxyRef, "events", { get: () => events });
  return eventProxyRef;
};

export const useEventRef = () => useMemo(() => createEventRef(), []);
