/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HTMLAttributes, ReactNode, createElement, forwardRef } from "react";

import { GestureEvents } from "../core/GestureEvents";
import { useGestureEvents } from "./GestureHook";

function splitProps(props: any) {
  const {
    onTap,
    onTapHold,
    onDoubleTap,
    onSwipe,
    onSwipeUp,
    onSwipeRight,
    onSwipeDown,
    onSwipeLeft,
    onPinchStart,
    onPinch,
    onPinchEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    ...others
  } = props;
  const gestures = {
    onTap,
    onTapHold,
    onDoubleTap,
    onSwipe,
    onSwipeUp,
    onSwipeRight,
    onSwipeDown,
    onSwipeLeft,
    onPinchStart,
    onPinch,
    onPinchEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
  return { gestures, others };
}

type GesturedProps<T extends Element = Element> = HTMLAttributes<T> &
  Partial<GestureEvents<T>> & {
    children: ReactNode;
  };

/**
 * 将一个原生 HTML 标签，转换为具备「手势事件」的高阶组件
 *
 * @param type 原生 HTML 标签的 TagName
 * @returns 具备手势事件的高阶组件
 */
export function Gestured<T extends keyof HTMLElementTagNameMap>(type: T) {
  return forwardRef<
    HTMLAttributes<HTMLElementTagNameMap[T]>,
    GesturedProps<HTMLElementTagNameMap[T]>
  >((props, ref) => {
    const { gestures, others } = splitProps(props);
    const events = useGestureEvents(gestures);
    return createElement(type, { ...others, ...events, ref });
  });
}
