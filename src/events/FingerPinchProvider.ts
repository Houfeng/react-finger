/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent, FingerPinchEvent } from "../core/FingerEvents";
import { calcCenter, calcDistance, calcRotate } from "../core/FingerUtils";

import { FingerProvider } from "../core/FingerProviders";

const pinch = Symbol("pinch");
const pinchStarted = Symbol("pinchStarted");
const pinchEnded = Symbol("pinchEnded");
const pinchDetail = Symbol("pinchDetail");

export const FingerPinchProvider: FingerProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    flags.set(pinch, pointers.length > 1);
    if (flags.get(pinch) && !flags.get(pinchStarted)) {
      const detail = {
        pointers,
        changedPointers,
        scale: 1,
        rotate: 0,
        moveX: 0,
        moveY: 0,
      };
      flags.set(pinchDetail, detail);
      events.onPinchStart?.(FingerEvent("onPinchStart", pointer, detail));
      flags.set(pinchStarted, true);
      const target = pointer.target as HTMLElement | SVGElement;
      target.setPointerCapture?.(pointer.pointerId);
    }
  },

  handlePointerMove: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    flags.set(pinch, pointers.length > 1);
    if (!flags.get(pinch)) return;
    const originDist = calcDistance(pointers[0], pointers[1]);
    const latestDist = calcDistance(changedPointers[0], changedPointers[1]);
    const scale = latestDist / originDist;
    const originCenter = calcCenter(pointers[0], pointers[1]);
    const latestCenter = calcCenter(changedPointers[0], changedPointers[1]);
    const moveX = latestCenter.x - originCenter.x;
    const moveY = latestCenter.y - originCenter.y;
    const originRotate = calcRotate(pointers[0], pointers[1]);
    const latestRotate = calcRotate(changedPointers[0], changedPointers[1]);
    const rotate = latestRotate - originRotate;
    const detail = { pointers, changedPointers, scale, moveX, moveY, rotate };
    flags.set(pinchDetail, detail);
    events.onPinch?.(FingerEvent("onPinch", pointer, detail));
  },

  handlePointerUp: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(pinch, getPointers().length > 1);
    if (flags.get(pinch) && !flags.get(pinchEnded)) {
      const detail = flags.get(pinchDetail) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerEvent("onPinchEnd", pointer, detail));
      flags.set(pinchEnded, true);
    }
  },

  handlePointerCancel: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(pinch, getPointers().length > 1);
    if (flags.get(pinch) && !flags.get(pinchEnded)) {
      const detail = flags.get(pinchDetail) as FingerPinchEvent["detail"];
      events?.onPinchEnd?.(FingerEvent("onPinchEnd", pointer, detail));
      flags.set(pinchEnded, true);
    }
  },
};
