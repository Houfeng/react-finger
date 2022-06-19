/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureMixEvents } from "../core/GestureEvents";
import { composeGestureEvents } from "../core/GestureCompose";

/**
 * 通过「方法」创建可用于 Element 的 Gesture Events，通常用类组件中，
 * 在构建函数或 class fields 中创建，然后在 render 中使用
 * 注意：不能 render 中即时创建，每次都是一个新的 events 将导致不必要的渲染或 Bug
 * @param events 要绑定的手势事件 map
 * @returns 合成后的 Pointer Events
 */
export function createGestureEvents(events: Partial<GestureMixEvents>) {
  return composeGestureEvents(events);
}
