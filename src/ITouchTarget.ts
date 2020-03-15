import { ITouchPoint } from "./ITouchPoint";
import { ITouchEvent } from "./ITouchEvent";

export interface ITouchTarget {
  startPoint?: ITouchPoint;
  endPoint?: ITouchPoint;
  holdTimer?: NodeJS.Timeout;
  isPointDown?: boolean;
  prevTapTime?: number;
  doubleTap?: boolean;
}

export function getEventTarget(event: ITouchEvent) {
  return event.target as ITouchTarget;
}
