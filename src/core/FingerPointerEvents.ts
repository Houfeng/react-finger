/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type FingerPointerEvent<T extends Element = Element> = Omit<
  React.PointerEvent<T>,
  "detail"
>;

export type FingerPointerEventLike = { pointerId: number };

export type FingerPointerEventListener<T extends Element = Element> = (
  event: FingerPointerEvent<T>
) => void;

export type FingerPointerEvents<T extends Element = Element> = {
  onPointerDown: FingerPointerEventListener<T>;
  onPointerMove: FingerPointerEventListener<T>;
  onPointerUp: FingerPointerEventListener<T>;
  onPointerCancel: FingerPointerEventListener<T>;
};
