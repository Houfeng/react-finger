/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent, FingerPinchEvent } from "../core/FingerEvents";
import {
  PointerPointLike,
  calcCenter,
  calcDistance,
  calcRotate,
} from "../core/FingerUtils";

import { FingerProvider } from "../core/FingerProviders";

const PINCHING = Symbol();
const DETAIL = Symbol();
const ORIGIN_DIST = Symbol();
const ORIGIN_CENTER = Symbol();
const LATEST_CENTER = Symbol();
const ORIGIN_ROTATE = Symbol();

export const FingerPinchProvider: FingerProvider = {
  name: "Pinch",
  events: ["onPinchStart", "onPinch", "onPinchEnd"],

  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    if (pointers.length > 1 && !flags.get(PINCHING)) {
      flags.set(PINCHING, true);
      const dist = calcDistance(pointers[0], pointers[1]);
      flags.set(ORIGIN_DIST, dist);
      const rotate = calcRotate(pointers[0], pointers[1]);
      flags.set(ORIGIN_ROTATE, rotate);
      const center = calcCenter(changedPointers[0], changedPointers[1]);
      flags.set(ORIGIN_CENTER, center);
      flags.set(LATEST_CENTER, center);
      const centerX = center.clientX;
      const centerY = center.clientY;
      const detail = {
        pointers,
        changedPointers,
        centerX,
        centerY,
        scale: 1,
        rotate: 0,
        moveX: 0,
        moveY: 0,
        movementX: 0,
        movementY: 0,
      };
      flags.set(DETAIL, detail);
      events.onPinchStart?.(FingerEvent("onPinchStart", pointer, detail));
      const target = pointer.target as HTMLElement | SVGElement;
      target.setPointerCapture?.(pointer.pointerId);
    }
  },

  handlePointerMove: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    if (pointers.length < 2 || !flags.get(PINCHING)) return;
    const originDist = flags.get(ORIGIN_DIST) as number;
    const latestDist = calcDistance(changedPointers[0], changedPointers[1]);
    const scale = latestDist / originDist;
    const originCenter = flags.get(ORIGIN_CENTER) as PointerPointLike;
    const prevCenter = flags.get(LATEST_CENTER) as PointerPointLike;
    const latestCenter = calcCenter(changedPointers[0], changedPointers[1]);
    flags.set(LATEST_CENTER, latestCenter);
    const centerX = latestCenter.clientX;
    const centerY = latestCenter.clientY;
    const moveX = latestCenter.clientX - originCenter.clientX;
    const moveY = latestCenter.clientY - originCenter.clientY;
    const movementX = latestCenter.clientX - prevCenter.clientX;
    const movementY = latestCenter.clientY - prevCenter.clientY;
    const originRotate = flags.get(ORIGIN_ROTATE) as number;
    const latestRotate = calcRotate(changedPointers[0], changedPointers[1]);
    const rotate = latestRotate - originRotate;
    const detail = {
      pointers,
      changedPointers,
      centerX,
      centerY,
      scale,
      moveX,
      moveY,
      movementX,
      movementY,
      rotate,
    };
    flags.set(DETAIL, detail);
    events.onPinch?.(FingerEvent("onPinch", pointer, detail));
  },

  handlePointerWillUp: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    const pointers = getPointers();
    if (pointers.length === 2 && flags.get(PINCHING)) {
      flags.set(PINCHING, false);
      const detail = flags.get(DETAIL) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerEvent("onPinchEnd", pointer, detail));
    }
  },

  handlePointerWillCancel: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    const pointers = getPointers();
    if (pointers.length === 2 && flags.get(PINCHING)) {
      flags.set(PINCHING, false);
      const detail = flags.get(DETAIL) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerEvent("onPinchEnd", pointer, detail));
    }
  },
};
