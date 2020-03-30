import { createAttachProps } from "./EventBinding";
import { createFitter } from "mota";
import { findTouchEvents } from "./TouchEvents";
import { ITouchProps } from "./ITouchProps";
import { isString } from "ntils";
import { TouchOptions } from "./TouchOptions";

export function isForward(type: any) {
  return String(type && type.$$typeof) === "Symbol(react.forward_ref)";
}

export function allowTouch(type: any) {
  if (!type) return false;
  return (
    isString(type) ||
    type.motaTouch ||
    isForward(type) ||
    TouchOptions.allow(type)
  );
}

export const touch = createFitter((type: any, props: ITouchProps) => {
  if (type.setMotaTouch) return type.setMotaTouch(touch);
  if (!allowTouch(type)) return;
  const touchEvents = findTouchEvents(props);
  if (!type || touchEvents.length < 1) return;
  const attachProps = createAttachProps({ ...props });
  Object.entries(attachProps).forEach(([name, handler]) => {
    const originHandler = props[name];
    props[name] = (...args: any[]) => {
      if (originHandler) originHandler(...args);
      handler(...args);
    };
  });
  touchEvents.forEach(([name]) => delete props[name]);
});
