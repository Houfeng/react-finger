import { GestureContext } from "./GestureContext";
import { PointerEvent } from "./PointerEvents";

export type GestureEvent<T = Element> = React.PointerEvent<T> & {
  readonly context: GestureContext;
};

export type GestureEventListener<T = Element> = (
  event: GestureEvent<T>
) => void;

export type GestureEventsMap = {
  onTap: GestureEventListener;
  onTapHold: GestureEventListener;
  onDoubleTap: GestureEventListener;
  onSwipe: GestureEventListener;
  onSwipeUp: GestureEventListener;
  onSwipeRight: GestureEventListener;
  onSwipeDown: GestureEventListener;
  onSwipeLeft: GestureEventListener;
  onPinchStart: GestureEventListener;
  onPinch: GestureEventListener;
  onPinchEnd: GestureEventListener;
};

export function GestureEvent(
  pointerEvent: PointerEvent,
  context: GestureContext
): GestureEvent {
  const gestureEvent = { context };
  Object.setPrototypeOf(gestureEvent, pointerEvent);
  return gestureEvent as GestureEvent;
}
