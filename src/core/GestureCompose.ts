/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  GesturePointerEvent,
  GesturePointerEventListener,
  GesturePointerEvents,
} from "./GesturePointerEvents";

import { GestureContext } from "./GestureContext";
import { GestureMixEvents } from "./GestureEvents";
import { getAllGestureProviders } from "./GestureProviders";

const providers = getAllGestureProviders();

/**
 * 创建包含合成处理逻辑的 PointerDown Listener
 * @param events
 * @param context
 * @returns
 */
function createPointerDownListener(
  events: Partial<GestureMixEvents>,
  context: GestureContext
): GesturePointerEventListener {
  return (pointer: GesturePointerEvent) => {
    events.onPointerDown?.(pointer);
    providers.forEach((it) =>
      it.handlePointerWillDown?.({ events, context, pointer })
    );
    context.addPointer(pointer);
    providers.forEach((it) =>
      it.handlePointerDown?.({ events, context, pointer })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 PointerMove Listener
 * @param events
 * @param context
 * @returns
 */
function createPointerMoveListener(
  events: Partial<GestureMixEvents>,
  context: GestureContext
): GesturePointerEventListener {
  return (pointer: GesturePointerEvent) => {
    events.onPointerMove?.(pointer);
    if (context.getPointers().length < 1) return;
    providers.forEach((it) =>
      it.handlePointerWillMove?.({ events, context, pointer })
    );
    context.updatePointer(pointer);
    providers.forEach((it) =>
      it.handlePointerMove?.({ events, context, pointer })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 PointerUp Listener
 * @param events
 * @param context
 * @returns
 */
function createPointerUpListener(
  events: Partial<GestureMixEvents>,
  context: GestureContext
): GesturePointerEventListener {
  return (pointer: GesturePointerEvent) => {
    events.onPointerUp?.(pointer);
    providers.forEach((it) =>
      it.handlePointerWillUp?.({ events, context, pointer })
    );
    context.removePointer(pointer);
    providers.forEach((it) =>
      it.handlePointerUp?.({ events, context, pointer })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 PointerCancel Listener
 * @param events
 * @param context
 * @returns
 */
function createPointerCancelListener(
  events: Partial<GestureMixEvents>,
  context: GestureContext
): GesturePointerEventListener {
  return (pointer: GesturePointerEvent) => {
    events.onPointerCancel?.(pointer);
    providers.forEach((it) =>
      it.handlePointerWillCancel?.({ events, context, pointer })
    );
    context.removePointer(pointer);
    providers.forEach((it) =>
      it.handlePointerCancel?.({ events, context, pointer })
    );
  };
}

export function composeGestureEvents(
  events: Partial<GestureMixEvents>,
  context = GestureContext()
): GesturePointerEvents {
  events = { ...events };
  const onPointerDown = createPointerDownListener(events, context);
  const onPointerMove = createPointerMoveListener(events, context);
  const onPointerUp = createPointerUpListener(events, context);
  const onPointerCancel = createPointerCancelListener(events, context);
  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
