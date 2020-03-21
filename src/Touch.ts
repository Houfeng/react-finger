import { createAttachProps } from "./EventBinding";
import { createFitter } from "mota";
import { findTouchEvents } from "./TouchEvents";
import { ITouchProps } from "./ITouchProps";

export const touch = createFitter((type: any, props: ITouchProps) => {
  if (type.setMotaTouch) return type.setMotaTouch(touch);
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
