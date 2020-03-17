import { ITouchHandler } from "./ITouchHandler";

declare module "react" {
  // tslint:disable-next-line
  interface HTMLAttributes<T> {
    onTap?: ITouchHandler;
    onTapHold?: ITouchHandler;
    onDoubleTap?: ITouchHandler;
    onSwipe?: ITouchHandler;
    onSwipeUp?: ITouchHandler;
    onSwipeRight?: ITouchHandler;
    onSwipeDown?: ITouchHandler;
    onSwipeLeft?: ITouchHandler;
    onScale?: ITouchHandler;
    onMove?: ITouchHandler;
    onRotate?: ITouchHandler;
    onPointDown?: ITouchHandler;
    onPointMove?: ITouchHandler;
    onPointUp?: ITouchHandler;
  }

  // tslint:disable-next-line
  interface SVGProps<T> {
    onTap?: ITouchHandler;
    onTapHold?: ITouchHandler;
    onDoubleTap?: ITouchHandler;
    onSwipe?: ITouchHandler;
    onSwipeUp?: ITouchHandler;
    onSwipeRight?: ITouchHandler;
    onSwipeDown?: ITouchHandler;
    onSwipeLeft?: ITouchHandler;
    onScale?: ITouchHandler;
    onMove?: ITouchHandler;
    onRotate?: ITouchHandler;
    onPointDown?: ITouchHandler;
    onPointMove?: ITouchHandler;
    onPointUp?: ITouchHandler;
  }
}
