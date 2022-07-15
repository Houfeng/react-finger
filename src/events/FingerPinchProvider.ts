/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent, FingerPinchEvent } from "../core/FingerEvents";
import { calcCenter, calcDistance, calcRotate } from "../core/FingerUtils";

import { FingerProvider } from "../core/FingerProviders";

const pinching = Symbol("pinchStarted");
const pinchDetail = Symbol("pinchDetail");

export const FingerPinchProvider: FingerProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    if (pointers.length > 1 && !flags.get(pinching)) {
      console.log("onPinchStart inner", pointers, changedPointers);
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
      flags.set(pinching, true);
      const target = pointer.target as HTMLElement | SVGElement;
      target.setPointerCapture?.(pointer.pointerId);
    }
  },

  handlePointerMove: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    if (pointers.length < 2 || !flags.get(pinching)) return;
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

  handlePointerWillUp: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    const pointers = getPointers();
    if (pointers.length > 1 && flags.get(pinching)) {
      const detail = flags.get(pinchDetail) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerEvent("onPinchEnd", pointer, detail));
      flags.set(pinching, false);
    }
  },

  handlePointerWillCancel: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    const pointers = getPointers();
    if (pointers.length > 1 && flags.get(pinching)) {
      const detail = flags.get(pinchDetail) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerEvent("onPinchEnd", pointer, detail));
      flags.set(pinching, false);
    }
  },
};
