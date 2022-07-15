/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent } from "../core/FingerEvents";
import { FingerProvider } from "../core/FingerProviders";

export const FingerBasicProvider: FingerProvider = {
  name: "Basic",
  events: ["onFingerDown", "onFingerMove", "onFingerUp", "onFingerCancel"],

  handlePointerDown: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerDown?.(FingerEvent("onFingerDown", pointer, detail));
  },

  handlePointerMove: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerMove?.(FingerEvent("onFingerMove", pointer, detail));
  },

  handlePointerUp: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerUp?.(FingerEvent("onFingerUp", pointer, detail));
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerCancel?.(FingerEvent("onFingerCancel", pointer, detail));
  },
};
