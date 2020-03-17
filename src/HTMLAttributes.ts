import { ITouchHandler } from "./ITouchHandler";

declare module "react" {
  // tslint:disable-next-line
  interface HTMLAttributes<T> {
    // tap
    onTap?: ITouchHandler;
    onTapHold?: ITouchHandler;
    onDoubleTap?: ITouchHandler;
    // swipe
    onSwipe?: ITouchHandler;
    onSwipeUp?: ITouchHandler;
    onSwipeRight?: ITouchHandler;
    onSwipeDown?: ITouchHandler;
    onSwipeLeft?: ITouchHandler;
    // pinch
    onPinchStart?: ITouchHandler;
    onPinch?: ITouchHandler;
    onPinchEnd?: ITouchHandler;
    // point
    onPointDown?: ITouchHandler;
    onPointMove?: ITouchHandler;
    onPointUp?: ITouchHandler;
  }

  // tslint:disable-next-line
  interface SVGProps<T> {
    // tap
    onTap?: ITouchHandler;
    onTapHold?: ITouchHandler;
    onDoubleTap?: ITouchHandler;
    // swipe
    onSwipe?: ITouchHandler;
    onSwipeUp?: ITouchHandler;
    onSwipeRight?: ITouchHandler;
    onSwipeDown?: ITouchHandler;
    onSwipeLeft?: ITouchHandler;
    // pinch
    onPinchStart?: ITouchHandler;
    onPinch?: ITouchHandler;
    onPinchEnd?: ITouchHandler;
    // point
    onPointDown?: ITouchHandler;
    onPointMove?: ITouchHandler;
    onPointUp?: ITouchHandler;
  }
}
