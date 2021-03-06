/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostPointerEvent } from "./FingerHostEvents";
import { createEventWrapper } from "./FingerEventWrapper";

export type FingerContext = {
  addPointer: (pointer: HostPointerEvent) => void;
  updatePointer: (pointer: HostPointerEvent) => void;
  removePointer: (pointer: HostPointerEvent) => void;
  getPointers: () => HostPointerEvent[];
  getChangedPointers: () => HostPointerEvent[];
  flags: Map<symbol, unknown>;
};

export type FingerPointer = HostPointerEvent;

function createFingerPointer(hostEvent: HostPointerEvent): FingerPointer {
  return createEventWrapper(hostEvent);
}

export function FingerContext(): FingerContext {
  const flags = new Map<symbol, unknown>();
  const pointers = new Map<number, FingerPointer>();
  const changedPointers = new Map<number, FingerPointer>();
  const addPointer = (pointer: FingerPointer) => {
    pointers.set(pointer.pointerId, createFingerPointer(pointer));
    updatePointer(pointer);
  };
  const updatePointer = (pointer: FingerPointer) => {
    changedPointers.set(pointer.pointerId, createFingerPointer(pointer));
  };
  const removePointer = (pointer: FingerPointer) => {
    pointers.delete(pointer.pointerId);
    changedPointers.delete(pointer.pointerId);
  };
  const getPointers = (): FingerPointer[] => {
    return Array.from(pointers.values());
  };
  const getChangedPointers = (): FingerPointer[] => {
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
