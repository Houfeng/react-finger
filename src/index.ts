/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import "pepjs";

import { registerFingerProvider } from "./core/GestureProviders";

import { FingerPinchProvider } from "./events/GesturePinchProvider";
import { FingerSwipeProvider } from "./events/GestureSwipeProvider";
import { FingerTapProvider } from "./events/GestureTapProvider";

export { type FingerEvent } from "./core/GestureEvents";
export { composeFingerEvents } from "./core/GestureCompose";
export { FingerOptions } from "./core/GestureOptions";

export { useFingerEvents } from "./helpers/GestureHook";
export { createFingerEvents } from "./helpers/GestureFactory";
export { Finger } from "./helpers/GestureHoC";
export {
  FingerProxy,
  FingerProxyBoundary,
  FingerProxyContainer,
} from "./helpers/GestureProxy";

registerFingerProvider(FingerTapProvider);
registerFingerProvider(FingerSwipeProvider);
registerFingerProvider(FingerPinchProvider);
