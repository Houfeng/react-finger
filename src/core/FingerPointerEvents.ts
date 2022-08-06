/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerPointer } from "./FingerContext";
import { HostPointerEvent } from "./FingerHostEvents";
import { createEventWrapper } from "./FingerEventWrapper";

export type FingerPointerEventDetail<T> = {
  pointers: FingerPointer[];
  changedPointers: FingerPointer[];
} & T;

export type FingerPointerEvent<
  T extends Element = Element,
  D extends object = {}
> = HostPointerEvent<T> & {
  hostEvent: HostPointerEvent;
  fingerType: keyof FingerPointerEvents;
  detail: FingerPointerEventDetail<D>;
} & FingerPointerEventDetail<D>;

export type FingerEventListener<E extends FingerPointerEvent> = (
  event: E
) => void;

export type FingerSwipeEvent<T extends Element = Element> = FingerPointerEvent<
  T,
  {
    direction: "up" | "right" | "down" | "left";
  }
>;

export type FingerPinchEvent<T extends Element = Element> = FingerPointerEvent<
  T,
  {
    centerX: number;
    centerY: number;
    scale: number;
    moveX: number;
    moveY: number;
    movementX: number;
    movementY: number;
    rotate: number;
  }
>;

export type FingerTapEvent<T extends Element = Element> = FingerPointerEvent<
  T,
  {}
>;

export type FingerPointerEvents<T extends Element = Element> = {
  onFingerDown: FingerEventListener<FingerPointerEvent<T>>;
  onFingerMove: FingerEventListener<FingerPointerEvent<T>>;
  onFingerUp: FingerEventListener<FingerPointerEvent<T>>;
  onFingerCancel: FingerEventListener<FingerPointerEvent<T>>;
  onTap: FingerEventListener<FingerTapEvent<T>>;
  onTapHold: FingerEventListener<FingerTapEvent<T>>;
  onDoubleTap: FingerEventListener<FingerTapEvent<T>>;
  onSwipe: FingerEventListener<FingerSwipeEvent<T>>;
  onSwipeUp: FingerEventListener<FingerSwipeEvent<T>>;
  onSwipeRight: FingerEventListener<FingerSwipeEvent<T>>;
  onSwipeDown: FingerEventListener<FingerSwipeEvent<T>>;
  onSwipeLeft: FingerEventListener<FingerSwipeEvent<T>>;
  onPinchStart: FingerEventListener<FingerPinchEvent<T>>;
  onPinch: FingerEventListener<FingerPinchEvent<T>>;
  onPinchEnd: FingerEventListener<FingerPinchEvent<T>>;
};

export function FingerPointerEvent<
  T extends Element,
  F extends keyof FingerPointerEvents<T>
>(
  fingerType: F,
  hostEvent: HostPointerEvent,
  detail: Parameters<FingerPointerEvents<T>[F]>[0]["detail"]
): FingerPointerEvent<T, Parameters<FingerPointerEvents<T>[F]>[0]["detail"]> {
  hostEvent.persist?.();
  const fingerEvent = createEventWrapper<any>(hostEvent, {
    ...detail,
    fingerType,
    detail,
  });
  return fingerEvent;
}
