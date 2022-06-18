/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureEvent } from "../core/GestureEvents";
import { GestureProvider } from "../core/GestureProviders";
import { calcDistance } from "../core/GestureUtils";

const pinch = Symbol("pinch");
const pinchStarted = Symbol("pinchStarted");
const pinchScale = Symbol("pinchScale");
const pinchEnded = Symbol("pinchEnded");

export const GesturePinchProvider: GestureProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(pinch, getPointers().length > 1);
    if (flags.get(pinch) && !flags.get(pinchStarted)) {
      const scale = 1;
      flags.set(pinchScale, scale);
      events?.onPinchStart(GestureEvent("onPinchStart", pointer, { scale }));
      flags.set(pinchStarted, true);
    }
  },

  handlePointerMove: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    if (!flags.get(pinch)) return;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const originDist = calcDistance(pointers[0], pointers[0]);
    const latestDist = calcDistance(changedPointers[0], changedPointers[0]);
    const scale = latestDist / originDist;
    flags.set(pinchScale, scale);
    events?.onPinch(GestureEvent("onPinch", pointer, { scale }));
  },

  handlePointerUp: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(pinch, getPointers().length > 1);
    if (!flags.get(pinch) && !flags.get(pinchEnded)) {
      const scale = flags.get(pinchScale);
      events?.onPinchStart(GestureEvent("onPinchStart", pointer, { scale }));
      flags.set(pinchEnded, true);
    }
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(pinch, getPointers().length > 1);
    if (!flags.get(pinch) && !flags.get(pinchEnded)) {
      const scale = flags.get(pinchScale);
      events?.onPinchStart(GestureEvent("onPinchStart", pointer, { scale }));
      flags.set(pinchEnded, true);
    }
  },
};
