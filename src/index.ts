/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import "./core/FingerGlobal";

import { registerFingerProvider } from "./core/FingerProviders";

import { FingerPinchProvider } from "./events/FingerPinchProvider";
import { FingerBasicProvider } from "./events/FingerBasicProvider";
import { FingerSwipeProvider } from "./events/FingerSwipeProvider";
import { FingerTapProvider } from "./events/FingerTapProvider";
import { FingerShortcutProvider } from "./events/FingerShortcutProvider";

export { FingerGlobal, bindFingerGlobalEvents } from "./core/FingerGlobal";

export {
  type HostElement,
  type HostPointerEvent,
  type HostPointerEventLike,
  type HostPointerEventListener,
  type HostKeyboardEvent,
  type HostKeyboardEventListener,
  type HostFocusEvent,
  type HostFocusEventListener,
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

export { composeFingerEvents } from "./core/FingerCompose";

export { type FingerMixEvents } from "./core/FingerMixEvents";

export { FingerOptions } from "./core/FingerOptions";

export { createFingerEvents } from "./helpers/FingerFactory";
export { useFingerEvents } from "./helpers/FingerHook";

export {
  Finger,
  type FingerHTMLProps,
  type FingerSVGProps,
} from "./helpers/FingerHoC";

export {
  FingerProxy,
  type FingerProxyProps,
  FingerProxyBoundary,
  type FingerProxyBoundaryProps,
  FingerProxyContainer,
  type FingerProxyHTMLContainerProps,
  type FingerProxySVGContainerProps,
} from "./helpers/FingerProxy";

export { type FingerForwardRefExoticComponent } from "./helpers/FingerHelperUtils";

registerFingerProvider(FingerPinchProvider);
registerFingerProvider(FingerSwipeProvider);
registerFingerProvider(FingerTapProvider);
registerFingerProvider(FingerBasicProvider);
registerFingerProvider(FingerShortcutProvider);
