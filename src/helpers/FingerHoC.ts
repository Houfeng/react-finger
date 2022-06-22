/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HTMLAttributes, ReactNode, createElement, forwardRef } from "react";

import { FingerMixEvents } from "../core/FingerCompose";
import { useFingerEvents } from "./FingerHook";

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
    ...otherProps
  } = props;
  const eventProps = {
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
  return { eventProps, otherProps };
}

type FingerProps<T extends Element = Element> = HTMLAttributes<T> &
  Partial<FingerMixEvents<T>> & {
    children: ReactNode;
  };

/**
 * 将一个原生 HTML 标签，转换为具备「手势事件」的高阶组件
 *
 * @param type 原生 HTML 标签的 TagName
 * @returns 具备手势事件的高阶组件
 */
export function Finger<T extends keyof HTMLElementTagNameMap>(type: T) {
  return forwardRef<
    HTMLElementTagNameMap[T],
    FingerProps<HTMLElementTagNameMap[T]>
  >(function FingerComponent(props, ref) {
    const { eventProps, otherProps } = splitProps(props);
    const events = useFingerEvents(eventProps);
    return createElement(type, { ...otherProps, ...events, ref });
  });
}
