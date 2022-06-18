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
