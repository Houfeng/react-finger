/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { RefObject } from "react";
import { isFunction } from "ntils";

export type EventProxyTarget =
  | EventTarget
  | (() => EventTarget)
  | RefObject<EventTarget>;

export function toEventTarget(target: EventProxyTarget) {
  if (isFunction(target)) return target();
  if ("addEventListener" in target) return target;
  if ("current" in target) return target.current;
}
