import { ITouchProps } from "./ITouchProps";
import { TouchEvent, TouchList } from "react";
import { ITouchPoint } from "./ITouchPoint";
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
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  changedTouches: TouchList;
  timeStamp: number;
  [name: string]: any;
}

export function getTouchPoinsts(event: ITouchEvent): ITouchPoint[] {
  const { targetTouches } = event;
  const list: any = targetTouches ? [].slice.call(targetTouches) : [event];
  return list.map((item: Touch) => ({
    ...item,
    x: item.pageX,
    y: item.pageY,
    timeStamp: event.timeStamp
  }));
}
