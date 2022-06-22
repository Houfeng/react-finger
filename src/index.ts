/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import "pepjs";

import { registerFingerProvider } from "./core/FingerProviders";

import { FingerPinchProvider } from "./events/FingerPinchProvider";
import { FingerBasicProvider } from "./events/FingerBasicProvider";
import { FingerSwipeProvider } from "./events/FingerSwipeProvider";
import { FingerTapProvider } from "./events/FingerTapProvider";

export { type FingerEvent } from "./core/FingerEvents";
export { FingerOptions } from "./core/FingerOptions";

export { createFingerEvents } from "./helpers/FingerFactory";
export { useFingerEvents } from "./helpers/FingerHook";
export { Finger } from "./helpers/FingerHoC";
export {
  FingerProxy,
  FingerProxyBoundary,
  FingerProxyContainer,
} from "./helpers/FingerProxy";

registerFingerProvider(FingerBasicProvider);
registerFingerProvider(FingerTapProvider);
registerFingerProvider(FingerSwipeProvider);
registerFingerProvider(FingerPinchProvider);
