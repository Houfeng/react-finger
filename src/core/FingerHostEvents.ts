/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type HostPointerEvent<T extends Element = Element> = Omit<
  React.PointerEvent<T>,
  "detail"
>;

export type HostPointerEventLike = { pointerId: number };

export type HostPointerEventListener<T extends Element = Element> = (
  event: HostPointerEvent<T>
) => void;

export type HostKeyboardEvent<T extends Element = Element> = Omit<
  React.KeyboardEvent<T>,
  "detail"
>;

export type HostKeyboardEventListener<T extends Element = Element> = (
  event: HostKeyboardEvent<T>
) => void;

export type HostEvents<T extends Element = Element> = {
  onPointerDown: HostPointerEventListener<T>;
  onPointerMove: HostPointerEventListener<T>;
  onPointerUp: HostPointerEventListener<T>;
  onPointerCancel: HostPointerEventListener<T>;
  onKeyDown: HostKeyboardEventListener<T>;
  onKeyUp: HostKeyboardEventListener<T>;
};
