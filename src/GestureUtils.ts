/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { GesturePoint } from "./GesturePoint";

export const GestureSupport = {
  touch: "ontouchmove" in document,
  pointer: !!window.PointerEvent,
  mouse: "onmousemove" in document
};

export function isMobile() {
  return (
    /(Mobile|iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ||
    (navigator.platform.indexOf("Mac") > -1 && GestureSupport.touch)
  );
}

export function isDesktop() {
  return !isMobile();
}

export function calcDistance(from: GesturePoint, to: GesturePoint) {
  if (!from || !to) return 0;
  const x = from.clientX - to.clientX;
  const y = from.clientY - to.clientY;
  return Math.sqrt(x * x + y * y);
}
