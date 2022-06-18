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

const holdTimerSymbol = Symbol("holdTimerSymbol");
const tapCanceled = Symbol("tapCanceled");
const dblWaitNext = Symbol("dblWaitNext");
const dblPrevTime = Symbol("dblPrevTime");

export const GestureTapProvider: GestureProvider = {
  handlePointerDown: (events, context, pointer) => {
    const { flags, getPointers } = context;
    flags.set(tapCanceled, getPointers().length > 1);
    if (flags.get(tapCanceled)) {
      clearTimeout(flags.get(holdTimerSymbol));
    }
    flags.set(
      holdTimerSymbol,
      setTimeout(() => {
        flags.set(tapCanceled, true);
        events.onTapHold?.(GestureEvent("onTapHold", pointer));
      }, holdDurationThreshold)
    );
  },
  handlePointerMove: (_events, context, _pointer) => {
    const { flags, getPointers, getChangedPointers } = context;
    if (flags.get(tapCanceled)) return;
    const dist = calcDistance(getPointers()[0], getChangedPointers()[0]);
    if (dist > tapMaxDistanceThreshold) {
      flags.set(tapCanceled, true);
      clearTimeout(flags.get(holdTimerSymbol));
    }
  },
  handlePointerUp: (events, context, pointer) => {
    const { flags } = context;
    clearTimeout(flags.get(holdTimerSymbol));
    if (flags.get(tapCanceled)) return;
    events.onTap?.(GestureEvent("onTap", pointer));
    const prevTime = flags.get(dblPrevTime) || 0;
    if (
      !flags.get(dblWaitNext) ||
      Date.now() - prevTime > dblIntervalThreshold
    ) {
      flags.set(dblPrevTime, Date.now());
      flags.set(dblWaitNext, true);
    } else {
      const prevTime = flags.get(dblPrevTime);
      if (Date.now() - prevTime < dblIntervalThreshold) {
        events.onDoubleTap?.(GestureEvent("onDoubleTap", pointer));
      }
      flags.set(dblWaitNext, false);
    }
  },
  handlePointerCancel: (_events, context, _pointer) => {
    const { flags } = context;
    flags.set(tapCanceled, true);
    clearTimeout(flags.get(holdTimerSymbol));
  },
};
