import { ITouchPoint } from "./ITouchPoint";
import { ITouchEvent } from "./TouchEvents";
import { TouchOptions } from "./TouchOptions";
import { ITouchHandler } from "./ITouchHandler";
import { ITouchProps } from "./ITouchProps";
import { isFunction } from "ntils";

export class TouchOwner {
  public startPoints?: ITouchPoint[] = [];
  public lastPoints?: ITouchPoint[] = [];
  public isPointDown?: boolean = null;
  public lastTapTime?: number = null;
  public isDoubleTap?: boolean = null;
  public isSwipe?: boolean = null;
  public isPinch?: boolean = null;
  public direction?: string = null;
  public scale?: number = null;
  public moveX = 0;
  public moveY = 0;
  public holdTimer?: number = null;
  public pointType?: string = null;
  protected extendsKeys = [
    ...Object.keys(this),
    ...Object.keys(Object.getPrototypeOf(this))
  ];

  public get startPoint() {
    return this.startPoints?.[0];
  }

  public get lastPoint() {
    return this.lastPoints?.[0];
  }

  public startHoldTimer(done: Function) {
    this.holdTimer = setTimeout(done, TouchOptions.holdDurationThreshold);
  }

  public clearHoldTimer() {
    clearTimeout(this.holdTimer);
  }

  public emit(event: ITouchEvent, ...handlers: ITouchHandler[]) {
    if (!handlers) return;
    this.extendsKeys.forEach(key => {
      const value = (this as any)[key];
      if (key in event || isFunction(value)) return;
      event[key] = value;
    });
    handlers.forEach(handler => handler && handler(event));
  }

  public get distanceX() {
    return Math.abs(this.moveX);
  }

  public get distanceY() {
    return Math.abs(this.moveY);
  }

  public get clientX() {
    return this.lastPoint?.clientX;
  }

  public get clientY() {
    return this.lastPoint?.clientY;
  }

  public get x() {
    return this.clientX;
  }

  public get y() {
    return this.clientY;
  }

  public get pageX() {
    return this.lastPoint?.pageX;
  }

  public get pageY() {
    return this.lastPoint?.pageY;
  }

  public get screenX() {
    return this.lastPoint?.screenX;
  }

  public get screenY() {
    return this.lastPoint?.screenY;
  }
}

export function getEventOwner(
  event: ITouchEvent,
  props: ITouchProps
): TouchOwner {
  const { motaTouchKey, motaTouchHost } = { ...props } as any;
  const key = `__mota_touch_${String(motaTouchKey || "default")}__`;
  const host = motaTouchHost || (event.currentTarget as any);
  if (!host[key]) host[key] = new TouchOwner();
  return host[key];
}
