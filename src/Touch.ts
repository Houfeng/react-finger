import { createAttachProps } from "./EventBinding";
import { createFitter } from "mota";
import { findTouchEvents } from "./TouchEvents";
import { isBoolean, isString } from "ntils";
import { ITouchProps } from "./ITouchProps";

export function isElementForward(type: any) {
  return type && isString(type.target);
}

export function allowTouch(type: any, props: ITouchProps) {
  if (!type) return false;
  if (isBoolean(type.motaTouch)) return type.motaTouch;
  return (
    isString(type) ||
    isElementForward(type) ||
    (props && props["data-touch"]) ||
    (props && props["x-touch"])
  );
}

export const touch = createFitter((type: any, props: ITouchProps) => {
  if (type.setMotaTouch) return type.setMotaTouch(touch);
  if (!allowTouch(type, props)) return;
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
  delete props["data-touch"];
  delete props["x-touch"];
  touchEvents.forEach(([name]) => delete props[name]);
});
