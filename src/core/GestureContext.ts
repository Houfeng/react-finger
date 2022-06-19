/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerPointerEvent } from "./GesturePointerEvents";
import { toEventWrapper } from "./GestureUtils";

export type FingerContext = {
  addPointer: (pointer: FingerPointerEvent) => void;
  updatePointer: (pointer: FingerPointerEvent) => void;
  removePointer: (pointer: FingerPointerEvent) => void;
  getPointers: () => FingerPointerEvent[];
  getChangedPointers: () => FingerPointerEvent[];
  flags: Map<symbol, unknown>;
};

export function FingerContext(): FingerContext {
  const flags = new Map<symbol, unknown>();
  const points = new Map<number, FingerPointerEvent>();
  const changedPoints = new Map<number, FingerPointerEvent>();
  const addPointer = (pointer: FingerPointerEvent) => {
    points.set(pointer.pointerId, toEventWrapper(pointer));
    updatePointer(pointer);
  };
  const updatePointer = (pointer: FingerPointerEvent) => {
    changedPoints.set(pointer.pointerId, toEventWrapper(pointer));
  };
  const removePointer = (pointer: FingerPointerEvent) => {
    points.delete(pointer.pointerId);
    changedPoints.delete(pointer.pointerId);
  };
  const getPointers = (): FingerPointerEvent[] => {
    return Array.from(points.values());
  };
  const getChangedPointers = (): FingerPointerEvent[] => {
    return Array.from(changedPoints.values());
  };
  return {
    addPointer,
    updatePointer,
    removePointer,
    getPointers,
    getChangedPointers,
    flags,
  };
}
