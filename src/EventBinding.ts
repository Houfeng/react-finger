import { END_EVENT_NAME, MOVE_EVENT_NAME, START_EVENT_NAME } from "./Constants";
import { ITouchProps } from "./ITouchProps";
import { TouchOptions } from "./TouchOptions";
import { ICalcInfo } from "./ICalcInfo";
import { ITouchEvent } from "./ITouchEvent";
import { getEventTarget } from "./ITouchTarget";

export function createStartHandler(props: ITouchProps) {
  return (event: ITouchEvent) => {
    const point = event.changedTouches ? event.changedTouches[0] : event;
    const target = getEventTarget(event);
    target.startPoint = target.endPoint = {
      x: point.pageX,
      y: point.pageY,
      timeStamp: event.timeStamp
    };
    const { onTapHold, onPointDown } = props;
    if (onTapHold) {
      target.holdTimer = setTimeout(
        () => onTapHold(event),
        TouchOptions.holdDurationThreshold
      );
    }
    // 模拟鼠标事件
    if (onPointDown) onPointDown(event);
  };
}

export function createMoveHandler(props: ITouchProps) {
  return (event: ITouchEvent) => {
    const target = getEventTarget(event);
    const info = calcTouchInfo(event);
    const { onPointMove } = props;
    if (info.isSwipeMove) clearTimeout(target.holdTimer);
    // 模拟鼠标事件
    if (target.isPointDown && onPointMove) {
      onPointMove(event);
    }
  };
}

export function createEndHandler(props: ITouchProps) {
  return (event: ITouchEvent) => {
    const target = getEventTarget(event);
    const info = calcTouchInfo(event);
    clearTimeout(target.holdTimer);
    const { onPointUp, onSwipe, onTap, onDoubleTap } = props;
    const onSwipeX = props["onSwipe" + event.direction];
    // 模拟鼠标事件
    if (onPointUp) {
      onPointUp(event);
      target.isPointDown = false;
    }
    // 根据计算结果判断
    if (info.isSwipeTime && info.isSwipeMove) {
      event.swipe = true;
      event.direction = info.direction;
      if (onSwipe) onSwipe(event);
      if (onSwipeX) onSwipeX(event);
    } else if (info.isSwipeTime && !info.isSwipeMove && !info.isHoldTime) {
      if (onTap) onTap(event);
      if (onDoubleTap) {
        // 处理 “双击”
        target.doubleTap =
          target.prevTapTime &&
          info.timeStamp - target.prevTapTime <=
            TouchOptions.dblDurationThreshold;
        if (target.doubleTap) {
          onDoubleTap(event);
          target.prevTapTime = null;
        } else {
          target.prevTapTime = target.endPoint.timeStamp;
        }
      }
    }
  };
}

export function calcTouchInfo(event: any) {
  const point = event.changedTouches ? event.changedTouches[0] : event;
  const target = getEventTarget(event);
  target.endPoint = {
    x: point.pageX,
    y: point.pageY,
    timeStamp: event.timeStamp
  };
  // 一些计算结果
  const info: ICalcInfo = {};
  info.timeStamp = target.endPoint ? target.endPoint.timeStamp : null;
  info.existStartAndStop = !!(target.endPoint && target.startPoint);
  info.horizontalDistance = info.existStartAndStop
    ? target.endPoint.x - target.startPoint.x
    : 0;
  info.verticalDistance = info.existStartAndStop
    ? target.endPoint.y - target.startPoint.y
    : 0;
  info.horizontalDistanceValue = Math.abs(info.horizontalDistance);
  info.verticalDistanceVlaue = Math.abs(info.verticalDistance);
  info.isHorizontal =
    info.horizontalDistanceValue >= info.verticalDistanceVlaue;
  info.isVertical = !info.isHorizontal;
  info.isSwipeMove =
    info.horizontalDistanceValue >=
      TouchOptions.swipeHorizontalDistanceThreshold ||
    info.verticalDistanceVlaue >= TouchOptions.swipeVerticalDistanceThreshold;
  info.isSwipeTime = info.existStartAndStop
    ? target.endPoint.timeStamp - target.startPoint.timeStamp <=
      TouchOptions.swipeDurationThreshold
    : true;
  info.isHoldTime = info.existStartAndStop
    ? target.endPoint.timeStamp - target.startPoint.timeStamp >=
      TouchOptions.holdDurationThreshold
    : false;
  // 这里的 direction 仅是指划动方向，不代表 swipe 动作，swipe 动作还有时间或划动距离等因素
  if (info.isHorizontal && info.horizontalDistance > 0) {
    info.direction = "Right";
  } else if (info.isHorizontal && info.horizontalDistance < 0) {
    info.direction = "Left";
  } else if (info.isVertical && info.verticalDistance > 0) {
    info.direction = "Down";
  } else if (info.isVertical && info.verticalDistance < 0) {
    info.direction = "Up";
  }
  return info;
}

export function createAttachProps(props: ITouchProps): ITouchProps {
  return {
    [START_EVENT_NAME]: createStartHandler(props),
    [MOVE_EVENT_NAME]: createMoveHandler(props),
    [END_EVENT_NAME]: createEndHandler(props)
  };
}
