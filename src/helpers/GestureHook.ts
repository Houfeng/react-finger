/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { useLayoutEffect, useMemo } from "react";

import { GestureMixEvents } from "../core/GestureEvents";
import { composeGestureEvents } from "../core/GestureCompose";

/**
 * 通过 Hook 创建可用于 Element 的 Gesture Events
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 Pointer Events
 */
export function useGestureEvents(events: Partial<GestureMixEvents>) {
  const eventsRef = useMemo<Partial<GestureMixEvents>>(() => ({}), []);
  useLayoutEffect(() => {
    Object.assign(eventsRef, events);
  });
  return useMemo(() => composeGestureEvents(eventsRef), []);
}
