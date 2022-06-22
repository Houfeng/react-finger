/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent } from "../core/FingerEvents";
import { FingerProvider } from "../core/FingerProviders";

export const FingerPointerProvider: FingerProvider = {
  handlePointerDown: ({ events, pointer }) => {
    events.onFingerPointerDown?.(FingerEvent("onFingerPointerDown", pointer));
  },

  handlePointerMove: ({ events, pointer }) => {
    events.onFingerPointerMove?.(FingerEvent("onFingerPointerMove", pointer));
  },

  handlePointerUp: ({ events, pointer }) => {
    events.onFingerPointerUp?.(FingerEvent("onFingerPointerUp", pointer));
  },

  handlePointerCancel: ({ events, pointer }) => {
    events.onFingerPointerCancel?.(
      FingerEvent("onFingerPointerCancel", pointer)
    );
  },
};
