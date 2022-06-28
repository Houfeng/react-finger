/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { registerFingerProvider } from "./core/FingerProviders";

import { FingerPinchProvider } from "./events/FingerPinchProvider";
import { FingerBasicProvider } from "./events/FingerBasicProvider";
import { FingerSwipeProvider } from "./events/FingerSwipeProvider";
import { FingerTapProvider } from "./events/FingerTapProvider";

export {
  type HostPointerEvent,
  type HostPointerEventLike,
  type HostPointerEventListener,
  type HostPointerEvents,
} from "./core/FingerHostEvents";

export {
  type FingerEvent,
  type FingerEvents,
  type FingerEventListener,
  type FingerPointerEvent,
  type FingerTapEvent,
  type FingerSwipeEvent,
  type FingerPinchEvent,
} from "./core/FingerEvents";

export {
  type FingerMixEvents,
  composeFingerEvents,
} from "./core/FingerCompose";

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
