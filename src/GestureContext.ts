/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
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
  const { motaGestureKey, motaGestureHost } = { ...props } as any;
  const key = `__mota_gesture_${String(motaGestureKey || "default")}__`;
  const host = motaGestureHost || (event.currentTarget as any);
  if (!host[key]) host[key] = new GestureContext();
  return host[key];
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
      }
    });
  };
}
