import { GesturePointerEvent } from "./GesturePointerEvents";

export type GestureEvent<D = unknown, T = Element> = React.PointerEvent<T> & D;

export type GestureEventListener<E extends GestureEvent = GestureEvent> = (
  event: E
) => void;

export type GestureSwipeEvent<T = Element> = GestureEvent<
  {
    direction: "up" | "right" | "down" | "left";
  },
  T
>;

export type GesturePinchEvent<T = Element> = GestureEvent<
  {
    scale: number;
  },
  T
>;

export function GestureEvent<D = unknown, T = Element>(
  pointerEvent: GesturePointerEvent,
  data?: D
): GestureEvent<D, T> {
  const gestureEvent = { ...data };
  Object.setPrototypeOf(gestureEvent, pointerEvent);
  return gestureEvent as GestureEvent<D, T>;
}

export type GestureEvents = {
  onTap: GestureEventListener;
  onTapHold: GestureEventListener;
  onDoubleTap: GestureEventListener;
  onSwipe: GestureEventListener<GestureSwipeEvent>;
  onSwipeUp: GestureEventListener<GestureSwipeEvent>;
  onSwipeRight: GestureEventListener<GestureSwipeEvent>;
  onSwipeDown: GestureEventListener<GestureSwipeEvent>;
  onSwipeLeft: GestureEventListener<GestureSwipeEvent>;
  onPinchStart: GestureEventListener<GesturePinchEvent>;
  onPinch: GestureEventListener<GesturePinchEvent>;
  onPinchEnd: GestureEventListener<GesturePinchEvent>;
};
