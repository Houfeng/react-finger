/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  HostPointerEvent,
  HostPointerEventListener,
  HostPointerEvents,
} from "./FingerHostEvents";

import { FingerContext } from "./FingerContext";
import { FingerEvents } from "./FingerEvents";
import { getAllFingerProviders } from "./FingerProviders";

type FingerMixEvents<T extends Element = Element> = HostPointerEvents<T> &
  FingerEvents<T>;

const providers = getAllFingerProviders();

/**
 * 创建包含合成处理逻辑的 PointerDown Listener
 * @param events
 * @param context
 * @returns
 */
function createPointerDownListener(
  events: Partial<FingerMixEvents>,
  context: FingerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
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
  events: Partial<FingerMixEvents>,
  context: FingerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
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
  events: Partial<FingerMixEvents>,
  context: FingerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
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
  events: Partial<FingerMixEvents>,
  context: FingerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
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

/**
 * 将一组手手势事件转换为可直接用 element 的 Pointer Events
 * 注意：上层应用通常不要直接使用此 API
 * @internal
 * @param events events 要绑定的手势事件 map
 * @returns 合成后的 Pointer Events
 */
export function composeFingerEvents<T extends Element = Element>(
  events: Partial<FingerMixEvents<T>>
): HostPointerEvents<T> {
  // 一组合成手势事件的上下文对象
  const context = FingerContext();
  const onPointerDown = createPointerDownListener(events, context);
  const onPointerMove = createPointerMoveListener(events, context);
  const onPointerUp = createPointerUpListener(events, context);
  const onPointerCancel = createPointerCancelListener(events, context);
  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
