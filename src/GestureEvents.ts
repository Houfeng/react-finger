/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { GesturePoint } from "./GesturePoint";
import { GestureProps } from "./GestureProps";
import { GestureOptions } from "./GestureOptions";
import { GestureHandler } from "./GestureHandler";
import {
  Contextable,
  GestureContext,
  uesGestureContext
} from "./GestureContext";
import { OriginEvent } from "./OriginEvent";
import { GestureType } from "./GestureInfo";

export const GestureEventNameList = [
  "onTap",
  "onTapHold",
  "onDoubleTap",
  "onSwipe",
  "onSwipeUp",
  "onSwipeRight",
  "onSwipeDown",
  "onSwipeLeft",
  "onPinchStart",
  "onPinch",
  "onPinchEnd",
  "onGesturePointerDown",
  "onGesturePointerMove",
  "onGesturePointerUp"
];

export type GestureEventNames =
  | "onTap"
  | "onTapHold"
  | "onDoubleTap"
  | "onSwipe"
  | "onSwipeUp"
  | "onSwipeRight"
  | "onSwipeDown"
  | "onSwipeLeft"
  | "onPinchStart"
  | "onPinch"
  | "onPinchEnd"
  | "onGesturePointerDown"
  | "onGesturePointerMove"
  | "onGesturePointerUp";

export function findGestureEvents(props: GestureProps) {
  if (!props) return [];
  return Object.entries(props).filter(([name]) =>
    GestureEventNameList.includes(name)
  );
}

export function getGesturePoints(event: GestureEvent): GesturePoint[] {
  const originEvent = event.originEvent;
  if (originEvent.persist) originEvent.persist();
  const { targetTouches, timeStamp, pointerId } = originEvent as any;
  const items: any = targetTouches
    ? [].slice.call(targetTouches)
    : [originEvent];
  return items.map((item: Touch) => {
    const point: GesturePoint = {
      id: pointerId,
      clientX: item.clientX,
      clientY: item.clientY,
      pageX: item.pageX,
      pageY: item.pageY,
      screenX: item.screenX,
      screenY: item.screenY,
      timeStamp: (item as any).timeStamp || timeStamp
    };
    return point;
  });
}

export class GestureEvent {
  protected __gestureType: string;
  protected __originEvent: OriginEvent;
  protected __context: GestureContext;

  public get gestureType() {
    return this.__gestureType;
  }

  public get originEvent() {
    return this.__originEvent;
  }

  public get context() {
    return this.__context;
  }

  public preventDefault() {
    return this.originEvent.preventDefault();
  }

  public stopPropagation() {
    return this.originEvent.stopPropagation();
  }

  public get nativeEvent() {
    return this.originEvent.nativeEvent;
  }

  constructor(event: OriginEvent, props: GestureProps) {
    if (event.persist) event.persist();
    this.__context = uesGestureContext(event, props);
    this.__originEvent = event;
    this.__gestureType = event.type.slice(0, 5);
  }

  @Contextable(() => [] as GesturePoint[])
  public points?: GesturePoint[];

  @Contextable(() => [] as GesturePoint[])
  public changedPoints?: GesturePoint[];

  @Contextable()
  public isPointDown?: boolean = null;

  @Contextable()
  public lastTapInfo?: { timeStamp: number; x: number; y: number };

  @Contextable()
  public isDoubleTap?: boolean;

  @Contextable()
  public isSwipe?: boolean;

  @Contextable()
  public isPinch?: boolean;

  @Contextable()
  public direction?: string;

  @Contextable()
  public scale?: number;

  @Contextable(0)
  public moveX: number;

  @Contextable(0)
  public moveY: number;

  @Contextable()
  public holdTimer?: number;

  public get timeStamp() {
    return this.originEvent.timeStamp;
  }

  public handlePointDown() {
    if (this.gestureType === GestureType.point) {
      const point = (getGesturePoints(this) || [])[0];
      if (!point) return;
      this.points.push(point);
      this.changedPoints.push(point);
    } else {
      this.points = this.changedPoints = getGesturePoints(this);
    }
  }

  public handlePointMove() {
    if (this.gestureType === GestureType.point) {
      const point = (getGesturePoints(this) || [])[0];
      if (!point) return;
      const index = this.changedPoints.findIndex(item => item.id === point.id);
      if (index < 0) return;
      this.changedPoints[index] = point;
    } else {
      this.changedPoints = getGesturePoints(this);
    }
  }

  public handlePointEnd() {
    if (this.gestureType === GestureType.point) {
      const point = (getGesturePoints(this) || [])[0];
      if (!point) return;
      const index = this.changedPoints.findIndex(item => item.id === point.id);
      if (index < 0) return;
      this.points.splice(index, 1);
      this.changedPoints.splice(index, 1);
    }
  }

  public get point() {
    return this.points?.[0];
  }

  public get changedPoint() {
    return this.changedPoints?.[0];
  }

  public startHoldTimer(done: Function) {
    this.holdTimer = setTimeout(done, GestureOptions.holdDurationThreshold);
  }

  public clearHoldTimer() {
    clearTimeout(this.holdTimer);
  }

  public emit(...handlers: GestureHandler[]) {
    if (!handlers) return;
    handlers.forEach(handler => handler && handler(this));
  }

  public get distanceX() {
    return Math.abs(this.moveX);
  }

  public get distanceY() {
    return Math.abs(this.moveY);
  }

  public get x() {
    return this.clientX;
  }

  public get y() {
    return this.clientY;
  }

  public get clientX() {
    return this.changedPoint?.clientX;
  }

  public get clientY() {
    return this.changedPoint?.clientY;
  }

  public get pageX() {
    return this.changedPoint?.pageX;
  }

  public get pageY() {
    return this.changedPoint?.pageY;
  }

  public get screenX() {
    return this.changedPoint?.screenX;
  }

  public get screenY() {
    return this.changedPoint?.screenY;
  }
}
