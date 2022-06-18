export type PointerEvent<T = Element> = React.PointerEvent<T>;
export type PointerEventLike = { pointerId: number };

export type PointerEventListener<T = Element> = (
  event: PointerEvent<T>
) => void;

export type PointerEventsMap = {
  onPointerDown: PointerEventListener;
  onPointerMove: PointerEventListener;
  onPointerUp: PointerEventListener;
  onPointerCancel: PointerEventListener;
};
