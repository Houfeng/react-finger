/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent } from "../core/FingerEvents";
import { FingerProvider } from "../core/FingerProviders";

export const FingerPointerProvider: FingerProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerPointerDown?.(
      FingerEvent("onFingerPointerDown", pointer, detail)
    );
  },

  handlePointerMove: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerPointerMove?.(
      FingerEvent("onFingerPointerMove", pointer, detail)
    );
  },

  handlePointerUp: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerPointerUp?.(
      FingerEvent("onFingerPointerUp", pointer, detail)
    );
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerPointerCancel?.(
      FingerEvent("onFingerPointerCancel", pointer, detail)
    );
  },
};
