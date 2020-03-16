import { TouchEvent, TouchList } from "react";
import { ITouchPoint } from "./ITouchPoint";

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
  const list: any = changedTouches ? changedTouches : [event];
  return list.map((item: Touch) => ({
    x: item.pageX,
    y: item.pageY,
    timeStamp: event.timeStamp
  }));
}
