/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { GesturePoint } from "./GesturePoint";

export const supportEventTypes = {
  touch: "ontouchmove" in document,
  pointer: !!window.PointerEvent,
  mouse: "onmousemove" in document
};

export function isMobile() {
  return (
    /(Mobile|iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ||
    (navigator.platform.indexOf("Mac") > -1 && supportEventTypes.touch)
  );
}

export function isDesktop() {
  return !isMobile();
}

export function calcDistance(from: GesturePoint, to: GesturePoint) {
  const x = from.clientX - to.clientX;
  const y = from.clientY - to.clientY;
  return Math.sqrt(x * x + y * y);
}
