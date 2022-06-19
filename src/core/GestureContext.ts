/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GesturePointerEvent } from "./GesturePointerEvents";
import { toEventWrapper } from "./GestureUtils";

export type GestureContext = {
  addPointer: (pointer: GesturePointerEvent) => void;
  updatePointer: (pointer: GesturePointerEvent) => void;
  removePointer: (pointer: GesturePointerEvent) => void;
  getPointers: () => GesturePointerEvent[];
  getChangedPointers: () => GesturePointerEvent[];
  flags: Map<symbol, unknown>;
};

export function GestureContext(): GestureContext {
  const flags = new Map<symbol, unknown>();
  const points = new Map<number, GesturePointerEvent>();
  const changedPoints = new Map<number, GesturePointerEvent>();
  const addPointer = (pointer: GesturePointerEvent) => {
    points.set(pointer.pointerId, toEventWrapper(pointer));
    updatePointer(pointer);
  };
  const updatePointer = (pointer: GesturePointerEvent) => {
    changedPoints.set(pointer.pointerId, toEventWrapper(pointer));
  };
  const removePointer = (pointer: GesturePointerEvent) => {
    points.delete(pointer.pointerId);
    changedPoints.delete(pointer.pointerId);
  };
  const getPointers = (): GesturePointerEvent[] => {
    return Array.from(points.values());
  };
  const getChangedPointers = (): GesturePointerEvent[] => {
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
