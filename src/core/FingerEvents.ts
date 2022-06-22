/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostPointerEvent } from "./FingerHostEvents";
import { toFingerEventWrapper } from "./FingerEventWrapper";

export type FingerEvent<
  T extends Element = Element,
  D extends object = Record<string, any>
> = HostPointerEvent<T> & {
  finger: keyof FingerEvents;
  detail?: D;
} & D;

export type FingerEventListener<E extends FingerEvent> = (event: E) => void;

export type FingerSwipeEventDetail = {
  direction: "up" | "right" | "down" | "left";
};

export type FingerPinchEventDetail = {
  scale: number;
  moveX: number;
  moveY: number;
  rotate: number;
};

export type FingerEvents<
  T extends Element = Element,
  D extends object = Record<string, any>
> = {
  onPointerDown: FingerEventListener<FingerEvent<T, D>>;
  onPointerMove: FingerEventListener<FingerEvent<T, D>>;
  onPointerUp: FingerEventListener<FingerEvent<T, D>>;
  onPointerCancel: FingerEventListener<FingerEvent<T, D>>;
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
  finger: G,
  pointerEvent: HostPointerEvent,
  detail?: Parameters<FingerEvents<T, D>[G]>[0]["detail"]
): FingerEvent<T, Parameters<FingerEvents<T, D>[G]>[0]["detail"]> {
  pointerEvent.persist?.();
  const fingerEvent = toFingerEventWrapper(pointerEvent);
  Object.assign(fingerEvent, { ...detail, finger, detail });
  return fingerEvent;
}
