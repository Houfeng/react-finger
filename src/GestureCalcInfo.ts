/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

export interface GestureCalcInfo {
  timeStamp?: number;
  existStartAndStop?: boolean;
  horizontalDistance?: number;
  verticalDistance?: number;
  horizontalDistanceValue?: number;
  verticalDistanceVlaue?: number;
  isHorizontal?: boolean;
  isVertical?: boolean;
  isSwipeMove?: boolean;
  isSwipeTime?: boolean;
  isHoldTime?: boolean;
  direction?: "Right" | "Left" | "Down" | "Up";
}
