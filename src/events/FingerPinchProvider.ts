/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerPinchEvent,
  FingerPointerEvent,
} from "../core/FingerPointerEvents";
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

const ALL_FLAGS = [
  PINCHING,
  DETAIL,
  ORIGIN_DIST,
  ORIGIN_CENTER,
  LATEST_CENTER,
  ORIGIN_ROTATE,
];

export const FingerPinchProvider: FingerProvider = {
  name: "Pinch",
  events: ["onPinchStart", "onPinch", "onPinchEnd"],

  handlePointerDown: ({ events, context, pointer }) => {
    pointer.target.setPointerCapture?.(pointer.pointerId);
    if (pointer.isPrimary) context.cleanFlags(ALL_FLAGS);
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
      events.onPinchStart?.(
        FingerPointerEvent("onPinchStart", pointer, detail)
      );
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
    events.onPinch?.(FingerPointerEvent("onPinch", pointer, detail));
  },

  handlePointerWillUp: ({ events, context, pointer }) => {
    pointer.target.releasePointerCapture?.(pointer.pointerId);
    const { flags, getPointers } = context;
    const pointers = getPointers();
    if (pointers.length === 2 && flags.get(PINCHING)) {
      flags.set(PINCHING, false);
      const detail = flags.get(DETAIL) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerPointerEvent("onPinchEnd", pointer, detail));
    }
  },

  handlePointerWillCancel: ({ events, context, pointer }) => {
    pointer.target.releasePointerCapture?.(pointer.pointerId);
    const { flags, getPointers } = context;
    const pointers = getPointers();
    if (pointers.length === 2 && flags.get(PINCHING)) {
      flags.set(PINCHING, false);
      const detail = flags.get(DETAIL) as FingerPinchEvent["detail"];
      events.onPinchEnd?.(FingerPointerEvent("onPinchEnd", pointer, detail));
    }
  },
};
