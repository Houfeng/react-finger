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

const timerOwner = new Set<any>();

export function createTimer(fn: () => void, timeout: number) {
  const timer = setTimeout(() => {
    clearTimer(timer);
    fn();
  }, timeout);
  timerOwner.add(timer);
  return timer;
}

export function clearTimer(timer: any) {
  clearTimeout(timer);
  return timerOwner.delete(timer);
}

function clearAllTimer() {
  Array.from(timerOwner).forEach((timer) => clearTimer(timer));
}

function EventWrapper<T = object>(originEvent: T) {
  this.originEvent = originEvent;
}

EventWrapper.prototype.stopImmediatePropagation = function () {
  clearAllTimer();
  this.originEvent?.stopImmediatePropagation?.();
};

EventWrapper.prototype.stopPropagation = function () {
  clearAllTimer();
  this.originEvent?.stopPropagation?.();
};

POINTER_EVENT_KEYS.forEach((key) => {
  Object.defineProperty(EventWrapper.prototype, key, {
    enumerable: false,
    configurable: true,
    get: function () {
      const value = this.originEvent[key];
      return isFunction(value) ? value.bind(this.originEvent) : value;
    },
  });
});

export function toEventWrapper<T = object>(originEvent: T) {
  //@ts-ignore
  return new EventWrapper(originEvent);
}
