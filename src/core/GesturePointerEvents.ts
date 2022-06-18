/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type GesturePointerEvent<T extends Element = Element> =
  React.PointerEvent<T>;

export type GesturePointerEventLike = { pointerId: number };

export type GesturePointerEventListener<T extends Element = Element> = (
  event: GesturePointerEvent<T>
) => void;

export type GesturePointerEvents = {
  onPointerDown: GesturePointerEventListener;
  onPointerMove: GesturePointerEventListener;
  onPointerUp: GesturePointerEventListener;
  onPointerCancel: GesturePointerEventListener;
};
