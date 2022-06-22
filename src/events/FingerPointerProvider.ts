/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent } from "../core/FingerEvents";
import { FingerProvider } from "../core/FingerProviders";

export const FingerPointerProvider: FingerProvider = {
  handlePointerDown: ({ events, pointer }) => {
    events.onPointerDown(FingerEvent("onPointerDown", pointer));
  },

  handlePointerMove: ({ events, pointer }) => {
    events.onPointerMove(FingerEvent("onPointerMove", pointer));
  },

  handlePointerUp: ({ events, pointer }) => {
    events.onPointerUp(FingerEvent("onPointerUp", pointer));
  },

  handlePointerCancel: ({ events, pointer }) => {
    events.onPointerCancel(FingerEvent("onPointerCancel", pointer));
  },
};
