/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

export interface GestureCalcInfo {
  timeStamp?: number;
  existStartAndStop?: boolean;
  horizontalMutation?: number;
  verticalMutation?: number;
  horizontalDistance?: number;
  verticalDistance?: number;
  isHorizontal?: boolean;
  isVertical?: boolean;
  isValidSwipeDistance?: boolean;
  isValidSwipeTimeSpan?: boolean;
  isValidHoldTimeSpan?: boolean;
  direction?: "Right" | "Left" | "Down" | "Up";
}
