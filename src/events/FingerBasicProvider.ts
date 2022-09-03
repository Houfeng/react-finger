/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { PointerPointLike, isIOS } from "../core/FingerUtils";

import { FingerPointerEvent } from "../core/FingerPointerEvents";
import { FingerProvider } from "../core/FingerProviders";

const LATEST_POS = Symbol();

export const FingerBasicProvider: FingerProvider = {
  name: "Basic",
  events: ["onFingerDown", "onFingerMove", "onFingerUp", "onFingerCancel"],

  handlePointerDown: ({ events, context, pointer }) => {
    context.flags.delete(LATEST_POS);
    if (!events.onFingerDown) return;
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerDown(FingerPointerEvent("onFingerDown", pointer, detail));
  },

  handlePointerMove: ({ events, context, pointer }) => {
    if (!events.onFingerMove) return;
    const { getPointers, getChangedPointers, flags } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    if (
      isIOS &&
      pointer.pointerType !== "mouse" &&
      pointers.length === 1 &&
      !pointer.movementX &&
      !pointer.movementY
    ) {
      // 让 ios 在上 pointerType !== 'mouse' 但仅单指时兼容 movementX/Y
      const { clientX, clientY } = pointer;
      const prev = (flags.get(LATEST_POS) || pointers[0]) as PointerPointLike;
      const movementX = clientX - prev.clientX;
      const movementY = clientY - prev.clientY;
      const detail = { pointers, changedPointers, movementX, movementY };
      events.onFingerMove(FingerPointerEvent("onFingerMove", pointer, detail));
      flags.set(LATEST_POS, { clientX, clientY });
    } else {
      const detail = { pointers, changedPointers };
      events.onFingerMove(FingerPointerEvent("onFingerMove", pointer, detail));
    }
  },

  handlePointerUp: ({ events, context, pointer }) => {
    context.flags.delete(LATEST_POS);
    if (!events.onFingerUp) return;
    const { getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onFingerUp(FingerPointerEvent("onFingerUp", pointer, detail));
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    context.flags.delete(LATEST_POS);
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
