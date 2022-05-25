/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureHandler } from "./GestureHandler";

export interface GestureProps {
  onTap?: GestureHandler;
  onTapHold?: GestureHandler;
  onDoubleTap?: GestureHandler;
  onSwipe?: GestureHandler;
  onSwipeUp?: GestureHandler;
  onSwipeRight?: GestureHandler;
  onSwipeDown?: GestureHandler;
  onSwipeLeft?: GestureHandler;
  onPinchStart?: GestureHandler;
  onPinch?: GestureHandler;
  onPinchEnd?: GestureHandler;
  onGesturePointerDown?: GestureHandler;
  onGesturePointerMove?: GestureHandler;
  onGesturePointerUp?: GestureHandler;
  children?: React.ReactNode;
  ["x-gesture"]?: boolean;
  ["x-gesture-key"]?: string;
  ["x-gesture-host"]?: any;
}
