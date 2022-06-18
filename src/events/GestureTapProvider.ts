import { GestureEvent } from "../core/GestureEvents";
import { GestureOptions } from "../core/GestureOptions";
import { GestureProvider } from "../core/GestureProviders";
import { calcDistance } from "../core/GestureUtils";

const { tapMaxDistanceThreshold, holdDurationThreshold } = GestureOptions;
const holdTimerSymbol = Symbol("holdTimer");
const tapCanceled = Symbol("TapCanceled");

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
        events.onTapHold?.(GestureEvent(pointer));
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
    events.onTap?.(GestureEvent(pointer));
  },
  handlePointerCancel: (_events, context, _pointer) => {
    const { flags } = context;
    flags.set(tapCanceled, true);
    clearTimeout(flags.get(holdTimerSymbol));
  },
};
