/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { useLayoutEffect, useMemo } from "react";

import { GestureMixEvents } from "../core/GestureEvents";
import { composeGestureEvents } from "../core/GestureCompose";

/**
 * 通过 Hook 创建可用于 Element 的 Gesture Events
 * 注意：些 Hook 返回稳定的引用，同时会更新事件处理函数中的依赖，不会造成不必要的渲染
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 Pointer Events，通常应该应用于同一个元素上
 */
export function useGestureEvents(events: Partial<GestureMixEvents>) {
  const eventsRef = useMemo<Partial<GestureMixEvents>>(() => ({}), []);
  useLayoutEffect(() => {
    Object.assign(eventsRef, events);
  });
  return useMemo(() => composeGestureEvents(eventsRef), []);
}
