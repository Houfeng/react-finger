/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureMixEvents } from "../core/GestureEvents";
import { composeGestureEvents } from "../core/GestureCompose";
import { useMemo } from "react";

export function useGestureEvents(events: Partial<GestureMixEvents>) {
  return useMemo(() => composeGestureEvents(events), Object.values(events));
}
