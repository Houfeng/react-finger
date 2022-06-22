/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent } from "../core/FingerEvents";
import { FingerProvider } from "../core/FingerProviders";

export const FingerPointerProvider: FingerProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    if (!events.onPointerDown) return;
    events.onPointerDown(FingerEvent("onPointerDown", context, pointer));
  },

  handlePointerMove: ({ events, context, pointer }) => {
    if (!events.onPointerMove) return;
    events.onPointerMove(FingerEvent("onPointerMove", context, pointer));
  },

  handlePointerUp: ({ events, context, pointer }) => {
    if (!events.onPointerUp) return;
    events.onPointerUp(FingerEvent("onPointerUp", context, pointer));
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    if (!events.onPointerCancel) return;
    events.onPointerCancel(FingerEvent("onPointerCancel", context, pointer));
  },
};
