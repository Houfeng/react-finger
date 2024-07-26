/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { clearAllEventTimers } from "./FingerEventTimer";
import { FingerOptions } from "./FingerOptions";
import { calcDistance } from "./FingerUtils";

export const FingerGlobal = {
  activePointersTotal: 0,
  primaryStartPoint: { clientX: 0, clientY: 0 },
  primaryEndPoint: { clientX: 0, clientY: 0 },
  get primaryMoveDistance() {
    const { primaryStartPoint, primaryEndPoint } = FingerGlobal;
    return calcDistance(primaryStartPoint, primaryEndPoint);
  },
};

function cleanGlobalEffects() {
  clearAllEventTimers();
}

function onPointerStart(event: PointerEvent) {
  FingerGlobal.activePointersTotal++;
  if (event.isPrimary) {
    const { clientX, clientY } = event;
    FingerGlobal.primaryStartPoint = { clientX, clientY };
    FingerGlobal.primaryEndPoint = { clientX, clientY };
  }
}

function onPointerMove(event: PointerEvent) {
  if (event.isPrimary && FingerGlobal.activePointersTotal > 0) {
    const { clientX, clientY } = event;
    FingerGlobal.primaryEndPoint = { clientX, clientY };
  }
}

function onPointerEnd(event: PointerEvent) {
  if (event.isPrimary) {
    const { clientX, clientY } = event;
    FingerGlobal.primaryEndPoint = { clientX, clientY };
  }
  FingerGlobal.activePointersTotal--;
  if (FingerGlobal.activePointersTotal < 1) {
    setTimeout(cleanGlobalEffects, FingerOptions.cleanGlobalEffectsThreshold);
  }
}

export function bindFingerGlobalEvents() {
  if (typeof document === "undefined") return;
  // unbind
  document.removeEventListener("pointerdown", onPointerStart, true);
  document.removeEventListener("pointermove", onPointerMove, true);
  document.removeEventListener("pointerup", onPointerEnd, true);
  document.removeEventListener("pointercancel", onPointerEnd, true);
  // bind
  document.addEventListener("pointerdown", onPointerStart, true);
  document.addEventListener("pointermove", onPointerMove, true);
  document.addEventListener("pointerup", onPointerEnd, true);
  document.addEventListener("pointercancel", onPointerEnd, true);
}

bindFingerGlobalEvents();
