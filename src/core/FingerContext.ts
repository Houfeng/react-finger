/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostPointerEvent } from "./FingerHostEvents";
import { toFingerEventWrapper } from "./FingerEventWrapper";

export type FingerContext = {
  addPointer: (pointer: HostPointerEvent) => void;
  updatePointer: (pointer: HostPointerEvent) => void;
  removePointer: (pointer: HostPointerEvent) => void;
  getPointers: () => HostPointerEvent[];
  getChangedPointers: () => HostPointerEvent[];
  flags: Map<symbol, unknown>;
};

export function FingerContext(): FingerContext {
  const flags = new Map<symbol, unknown>();
  const pointers = new Map<number, HostPointerEvent>();
  const changedPointers = new Map<number, HostPointerEvent>();
  const addPointer = (pointer: HostPointerEvent) => {
    pointers.set(pointer.pointerId, toFingerEventWrapper(pointer));
    updatePointer(pointer);
  };
  const updatePointer = (pointer: HostPointerEvent) => {
    changedPointers.set(pointer.pointerId, toFingerEventWrapper(pointer));
  };
  const removePointer = (pointer: HostPointerEvent) => {
    pointers.delete(pointer.pointerId);
    changedPointers.delete(pointer.pointerId);
  };
  const getPointers = (): HostPointerEvent[] => {
    return Array.from(pointers.values());
  };
  const getChangedPointers = (): HostPointerEvent[] => {
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
