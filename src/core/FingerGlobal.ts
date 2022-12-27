import { clearAllEventTimers } from "./FingerEventTimer";
import { FingerOptions } from "./FingerOptions";

export const FingerGlobal = {
  activePointersTotal: 0,
};

function cleanGlobalEffects() {
  clearAllEventTimers();
}

function onPointerStart() {
  FingerGlobal.activePointersTotal++;
}

function onPointerEnd() {
  FingerGlobal.activePointersTotal--;
  if (FingerGlobal.activePointersTotal < 1) {
    setTimeout(cleanGlobalEffects, FingerOptions.cleanGlobalEffectsThreshold);
  }
}

export function bindFingerGlobalEvents() {
  document.removeEventListener("pointerdown", onPointerStart, true);
  document.removeEventListener("pointerup", onPointerEnd, true);
  document.removeEventListener("pointercancel", onPointerEnd, true);
  document.addEventListener("pointerdown", onPointerStart, true);
  document.addEventListener("pointerup", onPointerEnd, true);
  document.addEventListener("pointercancel", onPointerEnd, true);
}

bindFingerGlobalEvents();
