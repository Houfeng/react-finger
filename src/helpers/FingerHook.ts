/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerMixEvents, composeFingerEvents } from "../core/FingerCompose";
import { useLayoutEffect, useMemo } from "react";

/**
 * 通过 Hook 创建可用于 Element 的 Finger Events
 * 注意：些 Hook 返回稳定的引用，同时会更新事件处理函数中的依赖，不会造成不必要的渲染
 *
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 Pointer Events，需要直接解构到一个元素的 props 上
 */
export function useFingerEvents<T extends Element = Element>(
  events: Partial<FingerMixEvents<T>>
) {
  const eventsRef = useMemo<Partial<FingerMixEvents<T>>>(() => ({}), []);
  useLayoutEffect(() => {
    if (events) Object.assign(eventsRef, events);
  });
  return useMemo(() => composeFingerEvents<T>(eventsRef), []);
}
