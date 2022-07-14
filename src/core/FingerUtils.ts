/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type AnyFunction = (...args: any) => any;

export function isFunction(value: unknown): value is AnyFunction {
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
  const maxX = Math.max(pointer1.clientX, pointer2.clientX);
  const minX = Math.min(pointer1.clientX, pointer2.clientX);
  const x = minX + (maxX - minX) / 2;
  const maxY = Math.max(pointer1.clientY, pointer2.clientY);
  const minY = Math.min(pointer1.clientY, pointer2.clientY);
  const y = minY + (maxY - minY) / 2;
  return { x, y };
}

export function calcRotate(
  pointer1: PointerPointLike,
  pointer2: PointerPointLike
) {
  const radians = Math.atan2(
    pointer2.clientY - pointer1.clientY,
    pointer2.clientX - pointer1.clientX
  );
  const degrees = radians * (180 / Math.PI);
  return degrees;
}
