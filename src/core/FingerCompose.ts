/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerContext,
  FingerFocusContext,
  FingerKeyboardContext,
  FingerPointerContext,
} from "./FingerContext";
import { FingerProvider, getAllFingerProviders } from "./FingerProviders";
import {
  HostElement,
  HostEvents,
  HostFocusEvent,
  HostFocusEventListener,
  HostKeyboardEvent,
  HostKeyboardEventListener,
  HostPointerEvent,
  HostPointerEventListener,
} from "./FingerHostEvents";

import { FingerMixEvents } from "./FingerMixEvents";

const providers = getAllFingerProviders();

function shouldTrigger(
  provider: FingerProvider,
  events: Partial<FingerMixEvents>
) {
  return provider.events.some((it) => !!events[it as keyof FingerMixEvents]);
}

/**
 * 创建包含合成处理逻辑的 PointerDown Listener
 * @param events
 * @param context
 * @returns
 */
function createPointerDownListener(
  events: Partial<FingerMixEvents>,
  context: FingerPointerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
    if (pointer.isPrimary) context.cleanPointers();
    events.onPointerDown?.(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handlePointerWillDown?.({ events, context, pointer })
    );
    context.addPointer(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
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
  context: FingerPointerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
    events.onPointerMove?.(pointer);
    if (context.getPointers().length < 1) return;
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handlePointerWillMove?.({ events, context, pointer })
    );
    context.updatePointer(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
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
  context: FingerPointerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
    events.onPointerUp?.(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handlePointerWillUp?.({ events, context, pointer })
    );
    context.removePointer(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
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
  context: FingerPointerContext
): HostPointerEventListener {
  return (pointer: HostPointerEvent) => {
    events.onPointerCancel?.(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handlePointerWillCancel?.({ events, context, pointer })
    );
    context.removePointer(pointer);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handlePointerCancel?.({ events, context, pointer })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 KeyDown Listener
 * @param events
 * @param context
 * @returns
 */
function createKeyDownListener(
  events: Partial<FingerMixEvents>,
  context: FingerKeyboardContext
): HostKeyboardEventListener {
  return (event: HostKeyboardEvent) => {
    events.onKeyDown?.(event);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handleKeyDown?.({ events, context, event })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 KeyUp Listener
 * @param events
 * @param context
 * @returns
 */
function createKeyUpListener(
  events: Partial<FingerMixEvents>,
  context: FingerKeyboardContext
): HostKeyboardEventListener {
  return (event: HostKeyboardEvent) => {
    events.onKeyUp?.(event);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handleKeyUp?.({ events, context, event })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 focus Listener
 * @param events
 * @param context
 * @returns
 */
function createFocusListener(
  events: Partial<FingerMixEvents>,
  context: FingerFocusContext
): HostFocusEventListener {
  return (event: HostFocusEvent) => {
    events.onFocus?.(event);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) &&
        it.handleFocus?.({ events, context, event })
    );
  };
}

/**
 * 创建包含合成处理逻辑的 blur Listener
 * @param events
 * @param context
 * @returns
 */
function createBlurListener(
  events: Partial<FingerMixEvents>,
  context: FingerFocusContext
): HostFocusEventListener {
  return (event: HostFocusEvent) => {
    events.onBlur?.(event);
    providers.forEach(
      (it) =>
        shouldTrigger(it, events) && it.handleBlur?.({ events, context, event })
    );
  };
}

/**
 * 将一组手手势事件转换为可直接用 element 的 pointer events
 * 注意：上层应用通常不要直接使用此 API
 * @internal
 * @param events events 要绑定的手势事件 map
 * @returns 合成后的 pointer events
 */
export function composeFingerEvents<T extends HostElement = HostElement>(
  events: Partial<FingerMixEvents<T>>
): HostEvents<T> {
  // 一组合成事件的上下文对象
  const context = FingerContext();
  const onPointerDown = createPointerDownListener(events, context);
  const onPointerMove = createPointerMoveListener(events, context);
  const onPointerUp = createPointerUpListener(events, context);
  const onPointerCancel = createPointerCancelListener(events, context);
  const onKeyDown = createKeyDownListener(events, context);
  const onKeyUp = createKeyUpListener(events, context);
  const onFocus = createFocusListener(events, context);
  const onBlur = createBlurListener(events, context);
  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
  };
}
