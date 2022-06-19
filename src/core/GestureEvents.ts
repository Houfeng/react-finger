/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  GesturePointerEvent,
  GesturePointerEvents,
} from "./GesturePointerEvents";

import { toEventWrapper } from "./GestureUtils";

export type GestureMixEvents<T extends Element = Element> = GestureEvents<T> &
  GesturePointerEvents<T>;

export type GestureEvent<
  T extends Element = Element,
  D extends object = Record<string, any>
> = GesturePointerEvent<T> & {
  gesture: keyof GestureEvents;
  detail?: D;
} & D;

export type GestureEventListener<E extends GestureEvent> = (event: E) => void;

export type GestureSwipeEventDetail = {
  direction: "up" | "right" | "down" | "left";
};

export type GesturePinchEventDetail = {
  scale: number;
};

export type GestureEvents<
  T extends Element = Element,
  D extends object = Record<string, any>
> = {
  onTap: GestureEventListener<GestureEvent<T, D>>;
  onTapHold: GestureEventListener<GestureEvent<T>>;
  onDoubleTap: GestureEventListener<GestureEvent<T>>;
  onSwipe: GestureEventListener<GestureEvent<T, GestureSwipeEventDetail>>;
  onSwipeUp: GestureEventListener<GestureEvent<T, GestureSwipeEventDetail>>;
  onSwipeRight: GestureEventListener<GestureEvent<T, GestureSwipeEventDetail>>;
  onSwipeDown: GestureEventListener<GestureEvent<T, GestureSwipeEventDetail>>;
  onSwipeLeft: GestureEventListener<GestureEvent<T, GestureSwipeEventDetail>>;
  onPinchStart: GestureEventListener<GestureEvent<T, GesturePinchEventDetail>>;
  onPinch: GestureEventListener<GestureEvent<T, GesturePinchEventDetail>>;
  onPinchEnd: GestureEventListener<GestureEvent<T, GesturePinchEventDetail>>;
};

export function GestureEvent<
  T extends Element,
  D extends object,
  G extends keyof GestureEvents<T, D>
>(
  gesture: G,
  pointerEvent: GesturePointerEvent,
  detail?: Parameters<GestureEvents<T, D>[G]>[0]["detail"]
): GestureEvent<T, Parameters<GestureEvents<T, D>[G]>[0]["detail"]> {
  pointerEvent.persist?.();
  const gestureEvent = toEventWrapper(pointerEvent);
  Object.assign(gestureEvent, { ...detail, gesture, detail });
  return gestureEvent;
}
