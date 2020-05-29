/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-touch
 * @author Houfeng <admin@xhou.net>
 */

import { eventTypes } from "./utils";

export enum PointerType {
  mouse = "mouse",
  touch = "touch",
  pen = "pen"
}

export const PointerInfo: { type?: PointerType } = {};

export function getPointerType(event: Event): PointerType {
  return event.type.slice(0, 5) as PointerType;
}

export const pointerStartHandler = (event: Event) => {
  const pointerType = getPointerType(event);
  if (!PointerInfo.type) PointerInfo.type = pointerType;
  if (pointerType !== PointerInfo.type) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
};

export const pointerMoveHandler = (event: Event) => {
  const pointerType = getPointerType(event);
  if (!PointerInfo.type) PointerInfo.type = pointerType;
  if (pointerType !== PointerInfo.type) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
};

export const pointerEndHandler = (event: Event) => {
  const pointerType = getPointerType(event);
  if (!PointerInfo.type) PointerInfo.type = pointerType;
  if (pointerType !== PointerInfo.type) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
  setTimeout(() => (PointerInfo.type = null), 300);
};

if (eventTypes.touch) {
  document.addEventListener("touchstart", pointerStartHandler, true);
  document.addEventListener("touchmove", pointerMoveHandler, true);
  document.addEventListener("touchend", pointerEndHandler, true);
  document.addEventListener("touchcancel", pointerEndHandler, true);
}

if (eventTypes.mouse) {
  document.addEventListener("mousedown", pointerStartHandler, true);
  document.addEventListener("mousemove", pointerMoveHandler, true);
  document.addEventListener("mouseup", pointerEndHandler, true);
}
