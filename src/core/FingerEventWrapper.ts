/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HostKeyboardEvent, HostPointerEvent } from "./FingerHostEvents";

import { clearAllEventTimers } from "./FingerEventTimer";
import { isFunction } from "./FingerUtils";

/**
 * stopPropagation、stopImmediatePropagation
 * 以上两个需要清理 timer ，所以不列在此处
 */
const POINTER_EVENT_KEYS = [
  "nativeEvent",
  "pointerId",
  "width",
  "height",
  "pressure",
  "tiltX",
  "tiltY",
  "twist",
  "pointerType",
  "isPrimary",
  "screenX",
  "screenY",
  "clientX",
  "clientY",
  "ctrlKey",
  "shiftKey",
  "altKey",
  "metaKey",
  "button",
  "buttons",
  "pageX",
  "pageY",
  "offsetX",
  "offsetY",
  "movementX",
  "movementY",
  "type",
  "target",
  "currentTarget",
  "bubbles",
  "cancelable",
  "timeStamp",
  "cancelBubble",
  "composedPath",
  "preventDefault",
  "eventPhase",
  "isDefaultPrevented",
  "isPropagationStopped",
  "isTrusted",
  "defaultPrevented",
  "getModifierState",
  "location",
  "path",
  "view",
  "charCode",
  "code",
  "key",
  "keyCode",
  "which",
  "repeat",
];

const EventWrapperPrototype = {
  stopImmediatePropagation() {
    clearAllEventTimers();
    this.hostEvent?.stopImmediatePropagation?.();
  },
  stopPropagation() {
    clearAllEventTimers();
    this.hostEvent?.stopPropagation?.();
  },
};

POINTER_EVENT_KEYS.forEach((key) => {
  Object.defineProperty(EventWrapperPrototype, key, {
    get: function () {
      const value = this.hostEvent[key];
      return isFunction(value) ? value.bind(this.hostEvent) : value;
    },
  });
});

export function createEventWrapper<T extends object>(
  hostEvent: HostPointerEvent | HostKeyboardEvent,
  fields?: Record<string, unknown>
): T {
  const wrapper = fields ? fields : {};
  Object.setPrototypeOf(wrapper, EventWrapperPrototype);
  wrapper.hostEvent = hostEvent;
  return wrapper as T;
}
