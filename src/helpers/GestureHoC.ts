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

type GesturedProps<T extends Element = Element> = Partial<GestureEvents<T>> & {
  children: ReactNode;
};

export function Gestured<T extends keyof HTMLElementTagNameMap>(type: T) {
  return forwardRef<HTMLAttributes<T>, GesturedProps<HTMLElementTagNameMap[T]>>(
    (props, ref) => {
      const { gestures, others } = splitProps(props);
      const events = useGestureEvents(gestures);
      return createElement(type, { ...others, ...events, ref });
    }
  );
}
