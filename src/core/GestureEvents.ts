/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  GesturePointerEvent,
  GesturePointerEvents,
} from "./GesturePointerEvents";

export type GestureMixEvents = GestureEvents & GesturePointerEvents;

export type GestureEvent<D = any> = GesturePointerEvent<Element> & {
  gesture: keyof GestureEvents;
  detail?: D;
} & D;

export type GestureEventListener<E extends GestureEvent> = (event: E) => void;

export type GestureSwipeEvent = GestureEvent<{
  direction: "up" | "right" | "down" | "left";
}>;

export type GesturePinchEvent = GestureEvent<{
  scale: number;
}>;

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

export function GestureEvent<G extends keyof GestureEvents>(
  gesture: G,
  pointerEvent: GesturePointerEvent,
  detail?: Parameters<GestureEvents[G]>[0]["detail"]
): GestureEvent<Parameters<GestureEvents[G]>[0]["detail"]> {
  const gestureEvent = { ...detail, gesture, detail };
  Object.setPrototypeOf(gestureEvent, pointerEvent);
  return gestureEvent as any;
}
