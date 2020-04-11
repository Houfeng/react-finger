import { suppertEventTypes } from "./utils";

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

if (suppertEventTypes.touch) {
  document.addEventListener("touchstart", pointerStartHandler, true);
  document.addEventListener("touchmove", pointerMoveHandler, true);
  document.addEventListener("touchend", pointerEndHandler, true);
  document.addEventListener("touchcancel", pointerEndHandler, true);
}

if (suppertEventTypes.mouse) {
  document.addEventListener("mousedown", pointerStartHandler, true);
  document.addEventListener("mousedown", pointerMoveHandler, true);
  document.addEventListener("mouseup", pointerEndHandler, true);
}
