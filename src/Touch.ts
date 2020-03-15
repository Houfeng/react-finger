import { createAttachProps } from "./EventBinding";
import { createFitter } from "mota";
import { findTouchEvents } from "./TouchEvents";
import { ITouchProps } from "./ITouchProps";
import { isString } from "util";

export const touch = createFitter((type: string, props: ITouchProps) => {
  const touchEvents = findTouchEvents(props);
  if (!isString(type) || touchEvents.length < 1) return;
  const attachProps = createAttachProps({ ...props });
  Object.entries(attachProps).forEach(([name, handler]) => {
    const originHandler = props[name];
    props[name] = (...args: any[]) => {
      if (originHandler) originHandler(...args);
      handler(...args);
    };
  });
  touchEvents.forEach(([name]) => {
    delete props[name];
  });
});
