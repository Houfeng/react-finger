/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureEvent, GestureEventsMap } from "./GestureEvents";
import {
  PointerEvent,
  PointerEventListener,
  PointerEventsMap,
} from "./PointerEvents";

import { GestureContext } from "./GestureContext";
import { GestureOptions } from "./GestureOptions";
import { calcDistance } from "./GestureUtils";

const { tapMaxDistanceThreshold } = GestureOptions;

type MixEventsMap = GestureEventsMap & PointerEventsMap;

function createPointerDownListener(
  events: Partial<MixEventsMap>,
  context: GestureContext
): PointerEventListener {
  return (pointer: PointerEvent) => {
    events.onPointerDown?.(pointer);
    context.addPointer(pointer);
  };
}

function createPointerMoveListener(
  events: Partial<MixEventsMap>,
  context: GestureContext
): PointerEventListener {
  return (pointer: PointerEvent) => {
    events.onPointerMove?.(pointer);
    context.updatePointer(pointer);
    if (context.getPointers().length < 1) return;
    console.log("drag");
  };
}

function createPointerUpListener(
  events: Partial<MixEventsMap>,
  context: GestureContext
): PointerEventListener {
  return (pointer: PointerEvent) => {
    events.onPointerUp?.(pointer);
    const event = GestureEvent(pointer, context);
    const pointers = context.getPointers();
    const changedPointers = context.getChangedPointers();
    if (
      pointers.length === 1 &&
      calcDistance(pointers[0], changedPointers[0]) < tapMaxDistanceThreshold
    ) {
      events.onTap?.(event);
    }
    context.removePointer(pointer);
  };
}

function createPointerCancelListener(
  events: Partial<MixEventsMap>,
  context: GestureContext
): PointerEventListener {
  return (pointer: PointerEvent) => {
    events.onPointerCancel?.(pointer);
    context.removePointer(pointer);
  };
}

export function composeGestureEvents(
  events: Partial<MixEventsMap>,
  context = GestureContext()
): PointerEventsMap {
  const onPointerDown = createPointerDownListener(events, context);
  const onPointerMove = createPointerMoveListener(events, context);
  const onPointerUp = createPointerUpListener(events, context);
  const onPointerCancel = createPointerCancelListener(events, context);
  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
