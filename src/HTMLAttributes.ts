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
    onPointDown?: ITouchHandler;
    onPointMove?: ITouchHandler;
    onPointUp?: ITouchHandler;
  }
}
