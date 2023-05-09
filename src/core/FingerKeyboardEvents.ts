/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostElement, HostKeyboardEvent } from "./FingerHostEvents";
import { createEventWrapper } from "./FingerEventWrapper";

export type FingerKeyboardEventDetail<T> = T;

export type FingerKeyboardEvent<
  T extends HostElement = HostElement,
  D extends object = {}
> = HostKeyboardEvent<T> & {
  hostEvent: HostKeyboardEvent<T>;
  fingerType: keyof FingerKeyboardEvents<T>;
  detail: FingerKeyboardEventDetail<D>;
} & FingerKeyboardEventDetail<D>;

export type FingerShortcutEvent<T extends HostElement = HostElement> =
  FingerKeyboardEvent<
    T,
    {
      keys: string[];
      when: (
        keys: string[],
        handler: (event?: HostKeyboardEvent<T>) => void
      ) => void;
    }
  >;

export type FingerKeyboardEventListener<E extends FingerKeyboardEvent> = (
  event: E
) => void;

export type FingerKeyboardEvents<T extends HostElement = HostElement> = {
  onShortcut: FingerKeyboardEventListener<FingerShortcutEvent<T>>;
};

export function FingerKeyboardEvent<
  T extends HostElement,
  F extends keyof FingerKeyboardEvents<T>
>(
  fingerType: F,
  hostEvent: HostKeyboardEvent<T>,
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
