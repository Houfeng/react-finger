/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { supportEventTypes } from "./GestureUtils";

export enum GestureType {
  mouse = "mouse",
  touch = "touch",
  point = "point"
}

export const GestureInfo: { type?: GestureType } = {};

export function getGestureType(event: Event): GestureType {
  return event.type.slice(0, 5) as GestureType;
}

export const onGesturePointerStart = (event: Event) => {
  const type = getGestureType(event);
  if (!GestureInfo.type) GestureInfo.type = type;
  if (type !== GestureInfo.type) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
};

export const onGesturePointerMove = (event: Event) => {
  const type = getGestureType(event);
  if (!GestureInfo.type) GestureInfo.type = type;
  if (type !== GestureInfo.type) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
};

export const onGesturePointerEnd = (event: Event) => {
  const type = getGestureType(event);
  if (!GestureInfo.type) GestureInfo.type = type;
  if (type !== GestureInfo.type) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
  setTimeout(() => (GestureInfo.type = null), 300);
};

if (supportEventTypes.touch && !supportEventTypes.pointer) {
  document.addEventListener("touchstart", onGesturePointerStart, true);
  document.addEventListener("touchmove", onGesturePointerMove, true);
  document.addEventListener("touchend", onGesturePointerEnd, true);
  document.addEventListener("touchcancel", onGesturePointerEnd, true);
}

if (supportEventTypes.mouse && !supportEventTypes.pointer) {
  document.addEventListener("mousedown", onGesturePointerStart, true);
  document.addEventListener("mousemove", onGesturePointerMove, true);
  document.addEventListener("mouseup", onGesturePointerEnd, true);
}

if (supportEventTypes.pointer) {
  document.addEventListener("pointerdown", onGesturePointerStart, true);
  document.addEventListener("pointermove", onGesturePointerMove, true);
  document.addEventListener("pointerup", onGesturePointerEnd, true);
  document.addEventListener("pointercancel", onGesturePointerEnd, true);
}
