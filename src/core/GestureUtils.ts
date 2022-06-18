/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type PointerPointLike = {
  clientX: number;
  clientY: number;
};

export function calcDistance(from: PointerPointLike, to: PointerPointLike) {
  if (!from || !to) return 0;
  const x = from.clientX - to.clientX;
  const y = from.clientY - to.clientY;
  return Math.sqrt(x * x + y * y);
}

export type AnyFunction = (...args: any) => any;

export function isFunction(value: any): value is AnyFunction {
  return typeof value === "function";
}

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
  "stopImmediatePropagation",
  "stopPropagation",
  "path",
];

function EventWrapper<T = object>(originEvent: T) {
  this.originEvent = originEvent;
}

POINTER_EVENT_KEYS.forEach((key) => {
  Object.defineProperty(EventWrapper.prototype, key, {
    enumerable: false,
    configurable: true,
    get: function () {
      const value = this.originEvent[key];
      return isFunction(value) ? value.bind(this) : value;
    },
  });
});

export function toEventWrapper<T = object>(originEvent: T) {
  if (originEvent instanceof PointerEvent) {
    //@ts-ignore
    return new EventWrapper(originEvent);
  } else {
    return originEvent;
  }
}
