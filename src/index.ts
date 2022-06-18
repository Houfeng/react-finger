/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import "pepjs";

import { registerGestureProvider } from "./core/GestureProviders";
import { GesturePinchProvider } from "./events/GesturePinchProvider";
import { GestureSwipeProvider } from "./events/GestureSwipeProvider";
import { GestureTapProvider } from "./events/GestureTapProvider";

export { type GestureEvent } from "./core/GestureEvents";
export { GestureOptions } from "./core/GestureOptions";
export { useGestureEvents } from "./helpers/GestureHook";
export { createGestureEvents } from "./helpers/GestureFactory";
export { gestured } from "./helpers/GestureHoC";
export { GestureProxy, type GestureProxyProps } from "./helpers/GestureProxy";

registerGestureProvider(GestureTapProvider);
registerGestureProvider(GestureSwipeProvider);
registerGestureProvider(GesturePinchProvider);
