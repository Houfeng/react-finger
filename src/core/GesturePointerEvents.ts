export type GesturePointerEvent<T = Element> = React.PointerEvent<T>;
export type GesturePointerEventLike = { pointerId: number };

export type GesturePointerEventListener<T = Element> = (
  event: GesturePointerEvent<T>
) => void;

export type GesturePointerEvents = {
  onPointerDown: GesturePointerEventListener;
  onPointerMove: GesturePointerEventListener;
  onPointerUp: GesturePointerEventListener;
  onPointerCancel: GesturePointerEventListener;
};
