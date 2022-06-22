/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { clearAllEventTimer } from "./FingerEventTimer";
import { isFunction } from "./FingerUtils";

/**
 * stopPropagation、stopImmediatePropagation
 * 以上两个需要清理 timer ，所以不列在此处
 */
const POINTER_EVENT_KEYS = [
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
  "path",
];

function FingerEventWrapper<T = object>(originEvent: T) {
  this.originEvent = originEvent;
}

FingerEventWrapper.prototype.stopImmediatePropagation = function () {
  clearAllEventTimer();
  this.originEvent?.stopImmediatePropagation?.();
};

FingerEventWrapper.prototype.stopPropagation = function () {
  clearAllEventTimer();
  this.originEvent?.stopPropagation?.();
};

POINTER_EVENT_KEYS.forEach((key) => {
  Object.defineProperty(FingerEventWrapper.prototype, key, {
    enumerable: false,
    configurable: true,
    get: function () {
      const value = this.originEvent[key];
      return isFunction(value) ? value.bind(this.originEvent) : value;
    },
  });
});

export function toFingerEventWrapper<T = object>(originEvent: T): any {
  //@ts-ignore
  return new FingerEventWrapper(originEvent);
}
