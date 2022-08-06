/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { registerFingerProvider } from "./core/FingerProviders";

import { FingerPinchProvider } from "./events/FingerPinchProvider";
import { FingerBasicProvider } from "./events/FingerBasicProvider";
import { FingerSwipeProvider } from "./events/FingerSwipeProvider";
import { FingerTapProvider } from "./events/FingerTapProvider";
import { FingerShortcutProvider } from "./events/FingerShortcutProvider";

export {
  type HostPointerEvent,
  type HostPointerEventLike,
  type HostPointerEventListener,
  type HostKeyboardEvent,
  type HostKeyboardEventListener,
  type HostEvents,
} from "./core/FingerHostEvents";

export {
  type FingerPointerEvent,
  type FingerPointerEvents,
  type FingerPointerEventListener,
  type FingerTapEvent,
  type FingerSwipeEvent,
  type FingerPinchEvent,
} from "./core/FingerPointerEvents";

export {
  type FingerKeyboardEvent,
  type FingerKeyboardEvents,
  type FingerKeyboardEventListener,
  type FingerShortcutEvent,
} from "./core/FingerKeyboardEvents";

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

registerFingerProvider(FingerPinchProvider);
registerFingerProvider(FingerSwipeProvider);
registerFingerProvider(FingerTapProvider);
registerFingerProvider(FingerBasicProvider);
registerFingerProvider(FingerShortcutProvider);
