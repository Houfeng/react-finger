/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type GesturePointerEvent<T extends Element = Element> = Omit<
  React.PointerEvent<T>,
  "detail"
>;

export type GesturePointerEventLike = { pointerId: number };

export type GesturePointerEventListener<T extends Element = Element> = (
  event: GesturePointerEvent<T>
) => void;

export type GesturePointerEvents<T extends Element = Element> = {
  onPointerDown: GesturePointerEventListener<T>;
  onPointerMove: GesturePointerEventListener<T>;
  onPointerUp: GesturePointerEventListener<T>;
  onPointerCancel: GesturePointerEventListener<T>;
};
