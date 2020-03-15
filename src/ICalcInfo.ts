export interface ICalcInfo {
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
