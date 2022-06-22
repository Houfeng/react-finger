/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type AnyFunction = (...args: any) => any;

export function isFunction(value: any): value is AnyFunction {
  return typeof value === "function";
}

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

export function calcCenter(
  pointer1: PointerPointLike,
  pointer2: PointerPointLike
) {
  return {
    x:
      Math.max(pointer1.clientX, pointer2.clientX) -
      Math.min(pointer1.clientX, pointer2.clientX),
    y:
      Math.max(pointer1.clientY, pointer2.clientY) -
      Math.min(pointer1.clientY, pointer2.clientY),
  };
}
