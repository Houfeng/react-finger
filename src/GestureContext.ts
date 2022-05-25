/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureProps } from "./GestureProps";
import { OriginEvent } from "./OriginEvent";
import { isFunction } from "ntils";

export class GestureContext {
  [name: string]: any;
}

export function uesGestureContext(
  event: OriginEvent,
  props: GestureProps
): GestureContext {
  props = { ...props };
  const key = props["x-gesture-key"] || "default";
  const computedKey = `__mota_gesture_${String(key)}__`;
  const host: any = props["x-gesture-host"] || event.currentTarget;
  if (!host[computedKey]) host[computedKey] = new GestureContext();
  return host[computedKey];
}

export function Contextable(defaultValue: any = null) {
  return (target: { context: GestureContext }, member: string) => {
    Object.defineProperty(target, member, {
      enumerable: true,
      get() {
        if (!this.context) return defaultValue;
        if (!(member in this.context)) {
          this.context[member] = isFunction(defaultValue)
            ? defaultValue()
            : defaultValue;
        }
        return this.context[member];
      },
      set(value: any) {
        if (!this.context) return;
        this.context[member] = value;
      },
    });
  };
}
