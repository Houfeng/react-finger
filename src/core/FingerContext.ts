/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerPointerEvent } from "./FingerPointerEvents";
import { toFingerEventWrapper } from "./FingerEventWrapper";

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
  const pointers = new Map<number, FingerPointerEvent>();
  const changedPointers = new Map<number, FingerPointerEvent>();
  const addPointer = (pointer: FingerPointerEvent) => {
    pointers.set(pointer.pointerId, toFingerEventWrapper(pointer));
    updatePointer(pointer);
  };
  const updatePointer = (pointer: FingerPointerEvent) => {
    changedPointers.set(pointer.pointerId, toFingerEventWrapper(pointer));
  };
  const removePointer = (pointer: FingerPointerEvent) => {
    pointers.delete(pointer.pointerId);
    changedPointers.delete(pointer.pointerId);
  };
  const getPointers = (): FingerPointerEvent[] => {
    return Array.from(pointers.values());
  };
  const getChangedPointers = (): FingerPointerEvent[] => {
    return Array.from(changedPointers.values());
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
