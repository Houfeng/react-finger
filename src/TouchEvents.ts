/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-touch
 * @author Houfeng <admin@xhou.net>
 */

import { ITouchPoint } from "./ITouchPoint";
import { ITouchProps } from "./ITouchProps";
import { TouchEvent } from "react";
import { TouchOwner } from "./TouchOwner";

export const TouchEventNameList = [
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
  "onPointDown",
  "onPointMove",
  "onPointUp"
];

export type TouchEventNames =
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
  | "onPointDown"
  | "onPointMove"
  | "onPointUp";

export function findTouchEvents(props: ITouchProps) {
  if (!props) return [];
  return Object.entries(props).filter(([name]) =>
    TouchEventNameList.includes(name)
  );
}

export interface ITouchEvent<T extends HTMLElement = HTMLElement>
  extends TouchEvent<T>,
    TouchOwner {
  timeStamp: number;
  pointType: string;
  [name: string]: any;
}

export function getTouchPoinsts(event: ITouchEvent): ITouchPoint[] {
  if (event.persist) event.persist();
  const { targetTouches, timeStamp } = event;
  const list: any = targetTouches ? [].slice.call(targetTouches) : [event];
  return list.map((item: Touch) => {
    const point: any = item;
    if (!("x" in point)) point.x = item.clientX;
    if (!("y" in point)) point.y = item.clientY;
    if (!("timeStamp" in point)) point.timeStamp = timeStamp;
    return point;
  });
}
