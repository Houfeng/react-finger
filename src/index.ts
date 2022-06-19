/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import "pepjs";

import { registerFingerProvider } from "./core/FingerProviders";

import { FingerPinchProvider } from "./events/FingerPinchProvider";
import { FingerSwipeProvider } from "./events/FingerSwipeProvider";
import { FingerTapProvider } from "./events/FingerTapProvider";

export { type FingerEvent } from "./core/FingerEvents";
export { composeFingerEvents } from "./core/FingerCompose";
export { FingerOptions } from "./core/FingerOptions";

export { useFingerEvents } from "./helpers/FingerHook";
export { createFingerEvents } from "./helpers/FingerFactory";
export { Finger } from "./helpers/FingerHoC";
export {
  FingerProxy,
  FingerProxyBoundary,
  FingerProxyContainer,
} from "./helpers/FingerProxy";

registerFingerProvider(FingerTapProvider);
registerFingerProvider(FingerSwipeProvider);
registerFingerProvider(FingerPinchProvider);
