import { ITouchProps } from "./ITouchProps";
import { TouchEvent, TouchList } from "react";
import { ITouchPoint } from "./ITouchPoint";

export const TouchEventNameList = [
  "onTap",
  "onTapHold",
  "onDoubleTap",
  "onSwipe",
  "onSwipeUp",
  "onSwipeRight",
  "onSwipeDown",
  "onSwipeLeft",
  "onScale",
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
  | "onScale"
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
  extends TouchEvent<T> {
  pageX: number;
  pageY: number;
  changedTouches: TouchList;
  timeStamp: number;
  [name: string]: any;
}

export function getTouchPoinsts(event: ITouchEvent): ITouchPoint[] {
  const { changedTouches } = event;
  const list: any = changedTouches ? [].slice.call(changedTouches) : [event];
  return list.map((item: Touch) => ({
    x: item.pageX,
    y: item.pageY,
    timeStamp: event.timeStamp
  }));
}
