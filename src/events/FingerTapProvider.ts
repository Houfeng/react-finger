/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { clearEventTimer, createEventTimer } from "../core/FingerEventTimer";

import { FingerEvent } from "../core/FingerEvents";
import { FingerOptions } from "../core/FingerOptions";
import { FingerProvider } from "../core/FingerProviders";
import { calcDistance } from "../core/FingerUtils";

const { tapMaxDistanceThreshold, holdDurationThreshold, dblIntervalThreshold } =
  FingerOptions;

const HOLD_TIMER = Symbol();
const CANCELED = Symbol();
const DBL_WAIT_NEXT = Symbol();
const DBL_PREV_TIME = Symbol();

export const FingerTapProvider: FingerProvider = {
  name: "Tap",
  events: ["onTap", "onTapHold", "onDoubleTap"],

  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    flags.set(CANCELED, pointers.length > 1);
    if (flags.get(CANCELED)) {
      return clearEventTimer(flags.get(HOLD_TIMER) as number);
    }
    const detail = { pointers, changedPointers };
    flags.set(
      HOLD_TIMER,
      createEventTimer(() => {
        flags.set(CANCELED, true);
        events.onTapHold?.(FingerEvent("onTapHold", pointer, detail));
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

  handlePointerUp: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    clearEventTimer(flags.get(HOLD_TIMER) as number);
    if (flags.get(CANCELED)) return;
    const pointers = getPointers();
    const changedPointers = getChangedPointers();
    const detail = { pointers, changedPointers };
    events.onTap?.(FingerEvent("onTap", pointer, detail));
    const prevTime = (flags.get(DBL_PREV_TIME) || 0) as number;
    if (
      !flags.get(DBL_WAIT_NEXT) ||
      Date.now() - prevTime > dblIntervalThreshold
    ) {
      flags.set(DBL_PREV_TIME, Date.now());
      flags.set(DBL_WAIT_NEXT, true);
    } else {
      const prevTime = flags.get(DBL_PREV_TIME) as number;
      if (Date.now() - prevTime < dblIntervalThreshold) {
        events.onDoubleTap?.(FingerEvent("onDoubleTap", pointer, detail));
      }
      flags.set(DBL_WAIT_NEXT, false);
    }
  },

  handlePointerCancel: ({ context }) => {
    const { flags } = context;
    flags.set(CANCELED, true);
    clearEventTimer(flags.get(HOLD_TIMER) as number);
  },
};
