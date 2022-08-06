/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { useLayoutEffect, useMemo } from "react";

import { FingerMixEvents } from "../core/FingerMixEvents";
import { composeFingerEvents } from "../core/FingerCompose";

/**
 * 通过 hook 创建可用于 element 的 events
 * 注意：此 hook 返回稳定引用的同时会自动更新处理函数中的依赖，不会造成不必要的渲染
 *
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 pointer events，需要直接解构到一个元素的 props 上
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
