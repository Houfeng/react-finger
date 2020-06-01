/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { createAttachProps } from "./EventBinding";
import { createFitter } from "mota";
import { findGestureEvents } from "./GestureEvents";
import { isBoolean, isString } from "ntils";
import { GestureProps } from "./GestureProps";
import { OriginEvent } from "./OriginEvent";

export function isElementForward(type: any) {
  return type && isString(type.target);
}

export function allowGesture(type: any, props: GestureProps) {
  if (!type) return false;
  if (isBoolean(type.gesture)) return type.gesture;
  return (
    isString(type) ||
    isElementForward(type) ||
    (props && props["data-gesture"]) ||
    (props && props["x-gesture"])
  );
}

export const gesture = createFitter((type: any, props: any) => {
  if (type.setGesture) return type.setGesture(gesture);
  if (!allowGesture(type, props)) return;
  const gestureEvents = findGestureEvents(props);
  if (!type || gestureEvents.length < 1) return;
  const attachProps = createAttachProps({ ...props });
  Object.entries(attachProps).forEach(([name, handler]) => {
    const originHandler = props[name];
    props[name] = (event: OriginEvent) => {
      if (originHandler) originHandler(event);
      handler(event);
    };
  });
  delete props["data-gesture"];
  delete props["x-gesture"];
  gestureEvents.forEach(([name]) => delete props[name]);
});
