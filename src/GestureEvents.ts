/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import {
  Contextable,
  GestureContext,
  uesGestureContext
} from "./GestureContext";

import { GestureHandler } from "./GestureHandler";
import { GestureOptions } from "./GestureOptions";
import { GesturePoint } from "./GesturePoint";
import { GestureProps } from "./GestureProps";
import { OriginEvent } from "./OriginEvent";

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

export function toGesturePoint(
  item: Touch | MouseEvent,
  id: number,
  timeStamp: number
) {
  const point: GesturePoint = {
    id,
    clientX: item.clientX,
    clientY: item.clientY,
    pageX: item.pageX,
    pageY: item.pageY,
    screenX: item.screenX,
    screenY: item.screenY,
    timeStamp: (item as any).timeStamp || timeStamp
  };
  return point;
}

export interface GesturePoints {
  points?: GesturePoint[];
  targetPoints?: GesturePoint[];
  changedPoints?: GesturePoint[];
}

export function getGesturePoints(event: GestureEvent): GesturePoints {
  const originEvent = event.originEvent as React.TouchEvent<Element> &
    React.PointerEvent<Element>;
  if (originEvent.persist) originEvent.persist();
  const {
    touches,
    targetTouches,
    changedTouches,
    timeStamp,
    pointerId
  } = originEvent;
  const items: Touch[] = touches ? [].slice.call(touches) : [originEvent];
  const targetItems: Touch[] = targetTouches
    ? [].slice.call(targetTouches)
    : [originEvent];
  const changedItems: Touch[] = changedTouches
    ? [].slice.call(changedTouches)
    : [originEvent];
  const points = items.map(item =>
    toGesturePoint(item, pointerId || item.identifier, timeStamp)
  );
  const targetPoints = targetItems.map(item =>
    toGesturePoint(item, pointerId || item.identifier, timeStamp)
  );
  const changedPoints = changedItems.map(item =>
    toGesturePoint(item, pointerId || item.identifier, timeStamp)
  );
  return { points, targetPoints, changedPoints };
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

  public get nativeEvent() {
    return this.originEvent?.nativeEvent;
  }

  public get context() {
    return this.__context;
  }

  public preventDefault() {
    return this.originEvent?.preventDefault();
  }

  public stopPropagation() {
    return this.originEvent?.stopPropagation();
  }

  public stopImmediatePropagation() {
    return this.nativeEvent?.stopImmediatePropagation();
  }

  public get target() {
    return this.originEvent?.target;
  }

  public get currentTarget() {
    return this.originEvent?.currentTarget;
  }

  public get button() {
    return (this.originEvent as any)?.button;
  }

  public get buttons() {
    return (this.originEvent as any)?.buttons;
  }

  constructor(
    event: OriginEvent,
    props: GestureProps,
    context?: GestureContext
  ) {
    if (event.persist) event.persist();
    this.__context = context || uesGestureContext(event, props);
    this.__originEvent = event;
    this.__gestureType = event.type?.slice(0, 5);
  }

  @Contextable(() => ({} as GestureEvent))
  public initial?: GestureEvent;

  @Contextable(() => [] as GesturePoint[])
  public points?: GesturePoint[];

  @Contextable(() => [] as GesturePoint[])
  public targetPoints?: GesturePoint[];

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
    const { points, targetPoints, changedPoints } = getGesturePoints(this);
    this.points = points;
    this.targetPoints = targetPoints;
    this.changedPoints = changedPoints;
    this.initial = new GestureEvent(this.originEvent, {}, { ...this.context });
  }

  public handlePointMove() {
    const { points, targetPoints, changedPoints } = getGesturePoints(this);
    this.points = points;
    this.targetPoints = targetPoints;
    this.changedPoints = changedPoints;
  }

  public handlePointEnd() {}

  public get point() {
    return this.points?.[0];
  }

  public get changedPoint() {
    return this.changedPoints?.[0];
  }

  public get targetPoint() {
    return this.targetPoints?.[0];
  }

  public startHoldTimer(done: Function) {
    this.clearHoldTimer();
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

export type GestureEventListener = (event: GestureEvent) => any;
