/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureEvent } from "../core/GestureEvents";
import { GestureOptions } from "../core/GestureOptions";
import { GestureProvider } from "../core/GestureProviders";

const { swipeMinDistanceThreshold, swipeMaxDurationThreshold } = GestureOptions;
const canceled = Symbol("swipeCanceled");
const startTime = Symbol("swipeStartTime");

export const GestureSwipeProvider: GestureProvider = {
  handlePointerDown: ({ context, pointer }) => {
    const { flags, getPointers } = context;
    flags.set(canceled, getPointers().length > 1);
    flags.set(startTime, Date.now());
    if (!flags.get(canceled)) {
      const target = pointer.target as HTMLElement | SVGElement;
      target.setPointerCapture?.(pointer.pointerId);
    }
  },

  handlePointerWillUp: ({ events, context, pointer }) => {
    const { flags, getPointers, getChangedPointers } = context;
    if (
      flags.get(canceled) ||
      Date.now() - (flags.get(startTime) as number) > swipeMaxDurationThreshold
    ) {
      return;
    }
    const start = getPointers()[0];
    const end = getChangedPointers()[0];
    const distX = end.clientX - start.clientX;
    const distY = end.clientY - start.clientY;
    const direction = ((): "down" | "up" | "right" | "left" => {
      if (
        Math.abs(distX) > Math.abs(distY) &&
        Math.abs(distX) > swipeMinDistanceThreshold
      ) {
        return distX > 0 ? "right" : "left";
      } else if (
        Math.abs(distX) < Math.abs(distY) &&
        Math.abs(distY) > swipeMinDistanceThreshold
      ) {
        return distY > 0 ? "down" : "up";
      }
    })();
    if (!direction) return;
    const detail = { direction };
    events.onSwipe?.(GestureEvent("onSwipe", pointer, detail));
    switch (direction) {
      case "down":
        events.onSwipeDown?.(GestureEvent("onSwipeDown", pointer, detail));
        break;
      case "up":
        events.onSwipeUp?.(GestureEvent("onSwipeUp", pointer, detail));
        break;
      case "right":
        events.onSwipeRight?.(GestureEvent("onSwipeRight", pointer, detail));
        break;
      case "left":
        events.onSwipeLeft?.(GestureEvent("onSwipeLeft", pointer, detail));
        break;
    }
  },

  handlePointerCancel: ({ context }) => {
    const { flags } = context;
    flags.set(canceled, true);
  },
};
