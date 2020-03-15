import { TouchEvent, TouchList } from "react";

export interface ITouchEvent<T extends HTMLElement = HTMLElement>
  extends TouchEvent<T> {
  pageX: number;
  pageY: number;
  changedTouches: TouchList;
  timeStamp: number;
  [name: string]: any;
}
