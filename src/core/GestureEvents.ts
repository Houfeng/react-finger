/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  GesturePointerEvent,
  GesturePointerEvents,
} from "./GesturePointerEvents";

export type GestureMixEvents = GestureEvents & GesturePointerEvents;

export type GestureEvent<
  T extends Element = Element,
  D = unknown
> = React.PointerEvent<T> & {
  gesture: keyof GestureEvents;
  detail: D;
} & D;

export type GestureEventListener<E extends GestureEvent> = (event: E) => void;

export type GestureSwipeEvent<T extends Element = Element> = GestureEvent<
  T,
  {
    direction: "up" | "right" | "down" | "left";
  }
>;

export type GesturePinchEvent<T extends Element = Element> = GestureEvent<
  T,
  {
    scale: number;
  }
>;

export type GestureEvents = {
  onTap: GestureEventListener<GestureEvent>;
  onTapHold: GestureEventListener<GestureEvent>;
  onDoubleTap: GestureEventListener<GestureEvent>;
  onSwipe: GestureEventListener<GestureSwipeEvent>;
  onSwipeUp: GestureEventListener<GestureSwipeEvent>;
  onSwipeRight: GestureEventListener<GestureSwipeEvent>;
  onSwipeDown: GestureEventListener<GestureSwipeEvent>;
  onSwipeLeft: GestureEventListener<GestureSwipeEvent>;
  onPinchStart: GestureEventListener<GesturePinchEvent>;
  onPinch: GestureEventListener<GesturePinchEvent>;
  onPinchEnd: GestureEventListener<GesturePinchEvent>;
};

export function GestureEvent<
  T extends Element = Element,
  G extends keyof GestureEvents = keyof GestureEvents
>(
  gesture: keyof GestureEvents,
  pointerEvent: GesturePointerEvent,
  detail?: Parameters<GestureEvents[G]>[0]
): GestureEvent<T> {
  const gestureEvent = { gesture, detail };
  Object.setPrototypeOf(gestureEvent, pointerEvent);
  return gestureEvent as GestureEvent<T, Parameters<GestureEvents[G]>[0]>;
}
