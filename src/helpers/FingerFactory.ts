/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerMixEvents } from "../core/FingerEvents";
import { composeFingerEvents } from "../core/FingerCompose";

/**
 * 通过「方法」创建可用于 Element 的 Finger Events，通常用类组件中，
 * 在构建函数或 class fields 中创建，然后在 render 中使用
 * 注意：不能 render 中即时创建，每次都是一个新的 events 将导致不必要的渲染或 Bug
 *
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 PointerEvents，需要直接解构到一个元素的 props 上
 */
export function createFingerEvents<T extends Element = Element>(
  events: Partial<FingerMixEvents<T>>
) {
  return composeFingerEvents(events);
}
