/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { calcDistance, clearTimer, createTimer } from "../core/FingerUtils";

import { FingerEvent } from "../core/FingerEvents";
import { FingerOptions } from "../core/FingerOptions";
import { FingerProvider } from "../core/FingerProviders";

const { tapMaxDistanceThreshold, holdDurationThreshold, dblIntervalThreshold } =
  FingerOptions;

const holdTimer = Symbol("holdTimer");
const tapCanceled = Symbol("tapCanceled");
const dblWaitNext = Symbol("dblWaitNext");
const dblPrevTime = Symbol("dblPrevTime");

export const FingerTapProvider: FingerProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(tapCanceled, getPointers().length > 1);
    if (flags.get(tapCanceled)) {
      clearTimer(flags.get(holdTimer) as number);
    }
    flags.set(
      holdTimer,
      createTimer(() => {
        flags.set(tapCanceled, true);
        events.onTapHold?.(FingerEvent("onTapHold", pointer));
      }, holdDurationThreshold)
    );
  },

  handlePointerMove: ({ context }) => {
    const { flags, getPointers, getChangedPointers } = context;
    if (flags.get(tapCanceled)) return;
    const dist = calcDistance(getPointers()[0], getChangedPointers()[0]);
    if (dist > tapMaxDistanceThreshold) {
      flags.set(tapCanceled, true);
      clearTimer(flags.get(holdTimer) as number);
    }
  },

  handlePointerUp: ({ events, context, pointer }) => {
    const { flags } = context;
    clearTimer(flags.get(holdTimer) as number);
    if (flags.get(tapCanceled)) return;
    events.onTap?.(FingerEvent("onTap", pointer));
    const prevTime = (flags.get(dblPrevTime) || 0) as number;
    if (
      !flags.get(dblWaitNext) ||
      Date.now() - prevTime > dblIntervalThreshold
    ) {
      flags.set(dblPrevTime, Date.now());
      flags.set(dblWaitNext, true);
    } else {
      const prevTime = flags.get(dblPrevTime) as number;
      if (Date.now() - prevTime < dblIntervalThreshold) {
        events.onDoubleTap?.(FingerEvent("onDoubleTap", pointer));
      }
      flags.set(dblWaitNext, false);
    }
  },

  handlePointerCancel: ({ context }) => {
    const { flags } = context;
    flags.set(tapCanceled, true);
    clearTimer(flags.get(holdTimer) as number);
  },
};
