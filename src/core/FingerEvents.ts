/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerPointer } from "./FingerContext";
import { HostPointerEvent } from "./FingerHostEvents";
import { createEventWrapper } from "./FingerEventWrapper";

export type FingerEvent<
  T extends Element = Element,
  D extends object = {}
> = HostPointerEvent<T> & {
  hostEvent: HostPointerEvent;
  fingerType: keyof FingerEvents;
  detail?: D;
} & D;

export type FingerEventListener<E extends FingerEvent> = (event: E) => void;

export type FingerPointerEvent<T extends Element = Element> = FingerEvent<
  T,
  {
    pointers: FingerPointer[];
    changedPointers: FingerPointer[];
  }
>;

export type FingerSwipeEvent<T extends Element = Element> = FingerEvent<
  T,
  {
    direction: "up" | "right" | "down" | "left";
  }
>;

export type FingerPinchEvent<T extends Element = Element> = FingerEvent<
  T,
  {
    scale: number;
    moveX: number;
    moveY: number;
    rotate: number;
  }
>;

export type FingerTapEvent<T extends Element = Element> = FingerEvent<T, {}>;

export type FingerEvents<T extends Element = Element> = {
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

export function FingerEvent<T extends Element, F extends keyof FingerEvents<T>>(
  fingerType: F,
  hostEvent: HostPointerEvent,
  detail?: Parameters<FingerEvents<T>[F]>[0]["detail"]
): FingerEvent<T, Parameters<FingerEvents<T>[F]>[0]["detail"]> {
  hostEvent.persist?.();
  const fingerEvent = createEventWrapper<any>(hostEvent, {
    ...detail,
    fingerType,
    detail,
  });
  return fingerEvent;
}
