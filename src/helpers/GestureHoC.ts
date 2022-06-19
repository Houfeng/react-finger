/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HTMLAttributes, createElement, forwardRef } from "react";

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

export function gestured<T extends keyof HTMLElementTagNameMap>(type: T) {
  return forwardRef(
    (props: HTMLAttributes<T> & Partial<GestureEvents>, ref) => {
      const { gestures, others } = splitProps(props);
      const events = useGestureEvents(gestures);
      return createElement(type, { ...others, ...events, ref });
    }
  );
}
