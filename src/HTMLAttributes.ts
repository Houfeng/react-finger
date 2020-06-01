/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { GestureHandler } from "./GestureHandler";

declare module "react" {
  // tslint:disable-next-line
  interface HTMLAttributes<T> {
    // tap
    onTap?: GestureHandler;
    onTapHold?: GestureHandler;
    onDoubleTap?: GestureHandler;
    // swipe
    onSwipe?: GestureHandler;
    onSwipeUp?: GestureHandler;
    onSwipeRight?: GestureHandler;
    onSwipeDown?: GestureHandler;
    onSwipeLeft?: GestureHandler;
    // pinch
    onPinchStart?: GestureHandler;
    onPinch?: GestureHandler;
    onPinchEnd?: GestureHandler;
    // pointer
    onGesturePointerDown?: GestureHandler;
    onGesturePointerMove?: GestureHandler;
    onGesturePointerUp?: GestureHandler;
  }

  // tslint:disable-next-line
  interface SVGProps<T> {
    // tap
    onTap?: GestureHandler;
    onTapHold?: GestureHandler;
    onDoubleTap?: GestureHandler;
    // swipe
    onSwipe?: GestureHandler;
    onSwipeUp?: GestureHandler;
    onSwipeRight?: GestureHandler;
    onSwipeDown?: GestureHandler;
    onSwipeLeft?: GestureHandler;
    // pinch
    onPinchStart?: GestureHandler;
    onPinch?: GestureHandler;
    onPinchEnd?: GestureHandler;
    // pointer
    onGesturePointerDown?: GestureHandler;
    onGesturePointerMove?: GestureHandler;
    onGesturePointerUp?: GestureHandler;
  }
}
