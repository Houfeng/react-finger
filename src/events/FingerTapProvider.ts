/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerPointer } from "../core/FingerContext";
import { clearEventTimer, createEventTimer } from "../core/FingerEventTimer";
import { FingerGlobal } from "../core/FingerGlobal";

import { FingerOptions } from "../core/FingerOptions";
import { FingerPointerEvent } from "../core/FingerPointerEvents";
import { FingerProvider } from "../core/FingerProviders";
import { calcDistance } from "../core/FingerUtils";

const { tapMaxDistanceThreshold, holdDurationThreshold, dblIntervalThreshold } =
  FingerOptions;

const HOLD_TIMER = Symbol();
const CANCELED = Symbol();
const DBL_WAIT_NEXT = Symbol();
const DBL_PREV_TIME = Symbol();
const DBL_PREV_POINTER = Symbol();

export const FingerTapProvider: FingerProvider = {
  name: "Tap",
  events: ["onTap", "onTapHold", "onDoubleTap"],

  handlePointerDown: ({ events, context, pointer }) => {
    if (pointer.isPrimary) context.cleanTimers();
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    flags.set(CANCELED, pointers.length > 1);
    if (flags.get(CANCELED)) {
      return clearEventTimer(flags.get(HOLD_TIMER) as number);
    }
    pointer.target.setPointerCapture?.(pointer.pointerId);
    const detail = { pointers, changedPointers };
    flags.set(
      HOLD_TIMER,
      createEventTimer(() => {
        if (flags.get(CANCELED)) return;
        if (FingerGlobal.activePointersTotal !== 1) return;
        if (FingerGlobal.primaryMoveDistance > tapMaxDistanceThreshold) return;
        context.clean();
        flags.set(CANCELED, true);
        events.onTapHold?.(FingerPointerEvent("onTapHold", pointer, detail));
      }, holdDurationThreshold)
    );
  },

  handlePointerMove: ({ context }) => {
    const { flags, getPointers, getChangedPointers } = context;
    if (flags.get(CANCELED)) return;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const dist = calcDistance(pointers[0], changedPointers[0]);
    if (dist > tapMaxDistanceThreshold) {
      flags.set(CANCELED, true);
      clearEventTimer(flags.get(HOLD_TIMER) as number);
    }
  },

  handlePointerWillUp: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    clearEventTimer(flags.get(HOLD_TIMER) as number);
    if (flags.get(CANCELED)) return;
    pointer.target.releasePointerCapture?.(pointer.pointerId);
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onTap?.(FingerPointerEvent("onTap", pointer, detail));
    const prevTime = (flags.get(DBL_PREV_TIME) || 0) as number;
    const timeOut = Date.now() - prevTime > dblIntervalThreshold;
    const prevPointer = flags.get(DBL_PREV_POINTER) as FingerPointer;
    const dist = prevPointer && calcDistance(prevPointer, changedPointers[0]);
    const distOut =
      (dist && dist > tapMaxDistanceThreshold) ||
      FingerGlobal.primaryMoveDistance > tapMaxDistanceThreshold;
    if (!flags.get(DBL_WAIT_NEXT) || timeOut || distOut) {
      flags.set(DBL_PREV_TIME, Date.now());
      flags.set(DBL_PREV_POINTER, changedPointers[0]);
      flags.set(DBL_WAIT_NEXT, true);
    } else {
      if (!timeOut && !distOut) {
        events.onDoubleTap?.(
          FingerPointerEvent("onDoubleTap", pointer, detail)
        );
      }
      flags.set(DBL_WAIT_NEXT, false);
    }
  },

  handlePointerCancel: ({ context, pointer }) => {
    pointer.target.releasePointerCapture?.(pointer.pointerId);
    const { flags } = context;
    flags.set(CANCELED, true);
    clearEventTimer(flags.get(HOLD_TIMER) as number);
  },
};
