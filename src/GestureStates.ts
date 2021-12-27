/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { GestureSupport } from "./GestureUtils";

export interface GestureStatesType {
  pointTotal: number;
}

export const GestureStates: GestureStatesType = {
  pointTotal: 0
};

const startHandler = () => {
  GestureStates.pointTotal++;
};

const endHandler = () => {
  GestureStates.pointTotal--;
  if (GestureStates.pointTotal < 0) GestureStates.pointTotal = 0;
};

(defaultView => {
  const startEvent = GestureSupport.pointer
    ? "pointerdown"
    : GestureSupport.touch
    ? "touchstart"
    : "mousedown";
  defaultView.addEventListener(startEvent, startHandler, true);
  const endEvent = GestureSupport.pointer
    ? "pointerup"
    : GestureSupport.touch
    ? "touchend"
    : "mouseup";
  defaultView.addEventListener(endEvent, endHandler, true);
  const cancelEvent = GestureSupport.pointer ? "pointercancel" : "touchcancel";
  defaultView.addEventListener(cancelEvent, endHandler, true);
})(document.defaultView);
