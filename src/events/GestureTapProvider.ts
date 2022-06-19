/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureEvent } from "../core/GestureEvents";
import { GestureOptions } from "../core/GestureOptions";
import { GestureProvider } from "../core/GestureProviders";
import { calcDistance } from "../core/GestureUtils";

const { tapMaxDistanceThreshold, holdDurationThreshold, dblIntervalThreshold } =
  GestureOptions;

const holdTimer = Symbol("holdTimer");
const tapCanceled = Symbol("tapCanceled");
const dblWaitNext = Symbol("dblWaitNext");
const dblPrevTime = Symbol("dblPrevTime");

export const GestureTapProvider: GestureProvider = {
  handlePointerDown: ({ events, context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(tapCanceled, getPointers().length > 1);
    if (flags.get(tapCanceled)) {
      clearTimeout(flags.get(holdTimer) as number);
    }
    flags.set(
      holdTimer,
      setTimeout(() => {
        flags.set(tapCanceled, true);
        events.onTapHold?.(GestureEvent("onTapHold", pointer));
      }, holdDurationThreshold)
    );
  },

  handlePointerMove: ({ context }) => {
    const { flags, getPointers, getChangedPointers } = context;
    if (flags.get(tapCanceled)) return;
    const dist = calcDistance(getPointers()[0], getChangedPointers()[0]);
    if (dist > tapMaxDistanceThreshold) {
      flags.set(tapCanceled, true);
      clearTimeout(flags.get(holdTimer) as number);
    }
  },

  handlePointerUp: ({ events, context, pointer }) => {
    const { flags } = context;
    clearTimeout(flags.get(holdTimer) as number);
    if (flags.get(tapCanceled)) return;
    events.onTap?.(GestureEvent("onTap", pointer));
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
        events.onDoubleTap?.(GestureEvent("onDoubleTap", pointer));
      }
      flags.set(dblWaitNext, false);
    }
  },

  handlePointerCancel: ({ context }) => {
    const { flags } = context;
    flags.set(tapCanceled, true);
    clearTimeout(flags.get(holdTimer) as number);
  },
};
