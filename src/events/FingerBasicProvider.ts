/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerPointerEvent } from "../core/FingerPointerEvents";
import { FingerProvider } from "../core/FingerProviders";

export const FingerBasicProvider: FingerProvider = {
  name: "Basic",
  events: ["onFingerDown", "onFingerMove", "onFingerUp", "onFingerCancel"],

  handlePointerDown: ({ events, context, pointer }) => {
    if (!events.onFingerDown) return;
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerDown(FingerPointerEvent("onFingerDown", pointer, detail));
  },

  handlePointerMove: ({ events, context, pointer }) => {
    if (!events.onFingerMove) return;
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerMove(FingerPointerEvent("onFingerMove", pointer, detail));
  },

  handlePointerUp: ({ events, context, pointer }) => {
    if (!events.onFingerUp) return;
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerUp(FingerPointerEvent("onFingerUp", pointer, detail));
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    if (!events.onFingerCancel) return;
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerCancel(
      FingerPointerEvent("onFingerCancel", pointer, detail)
    );
  },
};
