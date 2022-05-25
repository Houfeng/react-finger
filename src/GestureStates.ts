/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureOptions } from "./GestureOptions";
import { GestureSupport } from "./GestureUtils";

export interface GestureStatesType {
  pointTotal: number;
}

export const GestureStates: GestureStatesType = {
  pointTotal: 0,
};

const startHandler = () => {
  GestureStates.pointTotal++;
};

const endHandler = () => {
  GestureStates.pointTotal--;
  if (GestureStates.pointTotal < 0) GestureStates.pointTotal = 0;
};

const contextMenuHandler = () => {
  setTimeout(endHandler, GestureOptions.holdDurationThreshold);
};

((defaultView) => {
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
  defaultView.addEventListener("contextmenu", contextMenuHandler);
})(document.defaultView);
