/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostKeyboardEvent } from "./FingerHostEvents";
import { createEventWrapper } from "./FingerEventWrapper";

export type FingerKeyboardEventDetail<T> = T;

export type FingerKeyboardEvent<
  T extends Element = Element,
  D extends object = {}
  > = HostKeyboardEvent<T> & {
    hostEvent: HostKeyboardEvent;
    fingerType: keyof FingerKeyboardEvents;
    detail: FingerKeyboardEventDetail<D>;
  } & FingerKeyboardEventDetail<D>;

export type FingerKeyboardEventListener<E extends FingerKeyboardEvent> = (
  event: E
) => void;

export type FingerKeyboardEvents<T extends Element = Element> = {
  onShortcut: FingerKeyboardEventListener<FingerKeyboardEvent<T>>;
};

export function FingerKeyboardEvent<
  T extends Element,
  F extends keyof FingerKeyboardEvents<T>
>(
  fingerType: F,
  hostEvent: HostKeyboardEvent,
  detail: Parameters<FingerKeyboardEvents<T>[F]>[0]["detail"]
): FingerKeyboardEvent<T, Parameters<FingerKeyboardEvents<T>[F]>[0]["detail"]> {
  hostEvent.persist?.();
  const fingerEvent = createEventWrapper<any>(hostEvent, {
    ...detail,
    fingerType,
    detail,
  });
  return fingerEvent;
}
