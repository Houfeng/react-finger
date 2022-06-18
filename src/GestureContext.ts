import { PointerEvent } from "./PointerEvents";

export type GestureContext = {
  addPointer: (pointer: PointerEvent) => void;
  updatePointer: (pointer: PointerEvent) => void;
  removePointer: (pointer: PointerEvent) => void;
  getPointers: () => PointerEvent[];
  getChangedPointers: () => PointerEvent[];
  flags: Map<string, any>;
};

export function GestureContext(): GestureContext {
  const flags = new Map<string, any>();
  const points = new Map<number, PointerEvent>();
  const changedPoints = new Map<number, PointerEvent>();
  const addPointer = (pointer: PointerEvent) => {
    points.set(pointer.pointerId, { ...pointer });
    updatePointer(pointer);
  };
  const updatePointer = (pointer: PointerEvent) => {
    changedPoints.set(pointer.pointerId, { ...pointer });
  };
  const removePointer = (pointer: PointerEvent) => {
    points.delete(pointer.pointerId);
    changedPoints.delete(pointer.pointerId);
  };
  const getPointers = (): PointerEvent[] => {
    return Array.from(points.values());
  };
  const getChangedPointers = (): PointerEvent[] => {
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
