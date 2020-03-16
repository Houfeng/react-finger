import { ITouchPoint } from "./ITouchPoint";
import { ITouchEvent } from "./ITouchEvent";
import { TouchOptions } from "./TouchOptions";

export class TouchOwner implements TouchOwner {
  public startPoints?: ITouchPoint[];
  public endPoints?: ITouchPoint[];
  public isPointDown?: boolean;
  public lastTapTime?: number;
  public isDoubleTap?: boolean;
  protected holdTimer?: number;

  public get startPoint() {
    return this.startPoints?.[0];
  }

  public get endPoint() {
    return this.endPoints?.[0];
  }

  public startHoldTimer(done: Function) {
    this.holdTimer = setTimeout(done, TouchOptions.holdDurationThreshold);
  }

  public clearHoldTimer() {
    clearTimeout(this.holdTimer);
  }
}

export function getEventOwner(event: ITouchEvent): TouchOwner {
  const target = event.target as any;
  if (!target.__mota_touch__) {
    target.__mota_touch__ = new TouchOwner();
  }
  return target.__mota_touch__;
}
