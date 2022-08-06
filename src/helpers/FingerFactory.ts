/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerMixEvents } from "../core/FingerMixEvents";
import { composeFingerEvents } from "../core/FingerCompose";

/**
 * 通过「方法」创建可用于 element 的 events，通常用于类组件，
 * 在「构造函数」或 class fields 中创建，然后在 render 中元素上使用
 * 注意：不能在 render 中即时创建，如果都是一个新的 events 将导致不必要的渲染或造成 Bug
 *
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 pointer events，需要直接解构到一个元素的 props 上
 */
export function createFingerEvents<T extends Element = Element>(
  events: Partial<FingerMixEvents<T>>
) {
  return composeFingerEvents(events);
}
