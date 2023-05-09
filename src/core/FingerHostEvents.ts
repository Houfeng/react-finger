/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export type HostElement = HTMLElement | SVGElement;

export type HostPointerEvent<T extends HostElement = HostElement> = Omit<
  React.PointerEvent<T>,
  "detail"
> & { target: Pick<T, "setPointerCapture" | "releasePointerCapture"> };

export type HostPointerEventLike = { pointerId: number };

export type HostPointerEventListener<T extends HostElement = HostElement> = (
  event: HostPointerEvent<T>
) => void;

export type HostKeyboardEvent<T extends HostElement = HostElement> = Omit<
  React.KeyboardEvent<T>,
  "detail"
>;

export type HostKeyboardEventListener<T extends HostElement = HostElement> = (
  event: HostKeyboardEvent<T>
) => void;

export type HostEvents<T extends HostElement = HostElement> = {
  onPointerDown: HostPointerEventListener<T>;
  onPointerMove: HostPointerEventListener<T>;
  onPointerUp: HostPointerEventListener<T>;
  onPointerCancel: HostPointerEventListener<T>;
  onKeyDown: HostKeyboardEventListener<T>;
  onKeyUp: HostKeyboardEventListener<T>;
};
