import { createAttachProps } from "./EventBinding";
import { createFitter } from "mota";
import { findTouchEvents } from "./TouchEvents";
import { ITouchProps } from "./ITouchProps";
import { isString } from "ntils";
import { TouchOptions } from "./TouchOptions";

export const touch = createFitter((type: any, props: ITouchProps) => {
  if (type.setMotaTouch) return type.setMotaTouch(touch);
  if (!isString(type) && !type.motaTouch && !TouchOptions.allow(type)) return;
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
