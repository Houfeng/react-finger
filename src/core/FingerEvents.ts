/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerPointerEvent,
  FingerPointerEvents,
} from "./FingerPointerEvents";

import { toEventWrapper } from "./FingerUtils";

export type FingerMixEvents<T extends Element = Element> = FingerEvents<T> &
  FingerPointerEvents<T>;

export type FingerEvent<
  T extends Element = Element,
  D extends object = Record<string, any>
> = FingerPointerEvent<T> & {
  gesture: keyof FingerEvents;
  detail?: D;
} & D;

export type FingerEventListener<E extends FingerEvent> = (event: E) => void;

export type FingerSwipeEventDetail = {
  direction: "up" | "right" | "down" | "left";
};

export type FingerPinchEventDetail = {
  scale: number;
};

export type FingerEvents<
  T extends Element = Element,
  D extends object = Record<string, any>
> = {
  onTap: FingerEventListener<FingerEvent<T, D>>;
  onTapHold: FingerEventListener<FingerEvent<T>>;
  onDoubleTap: FingerEventListener<FingerEvent<T>>;
  onSwipe: FingerEventListener<FingerEvent<T, FingerSwipeEventDetail>>;
  onSwipeUp: FingerEventListener<FingerEvent<T, FingerSwipeEventDetail>>;
  onSwipeRight: FingerEventListener<FingerEvent<T, FingerSwipeEventDetail>>;
  onSwipeDown: FingerEventListener<FingerEvent<T, FingerSwipeEventDetail>>;
  onSwipeLeft: FingerEventListener<FingerEvent<T, FingerSwipeEventDetail>>;
  onPinchStart: FingerEventListener<FingerEvent<T, FingerPinchEventDetail>>;
  onPinch: FingerEventListener<FingerEvent<T, FingerPinchEventDetail>>;
  onPinchEnd: FingerEventListener<FingerEvent<T, FingerPinchEventDetail>>;
};

export function FingerEvent<
  T extends Element,
  D extends object,
  G extends keyof FingerEvents<T, D>
>(
  gesture: G,
  pointerEvent: FingerPointerEvent,
  detail?: Parameters<FingerEvents<T, D>[G]>[0]["detail"]
): FingerEvent<T, Parameters<FingerEvents<T, D>[G]>[0]["detail"]> {
  pointerEvent.persist?.();
  const fingerEvent = toEventWrapper(pointerEvent);
  Object.assign(fingerEvent, { ...detail, gesture, detail });
  return fingerEvent;
}
