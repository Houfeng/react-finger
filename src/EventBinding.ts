import { END_EVENT_NAME, MOVE_EVENT_NAME, START_EVENT_NAME } from "./Constants";
import { ITouchProps } from "./ITouchProps";
import { TouchOptions } from "./TouchOptions";
import { ICalcInfo } from "./ICalcInfo";
import { ITouchEvent, getTouchPoinsts } from "./ITouchEvent";
import { getEventOwner } from "./ITouchOwner";

export function createStartHandler(props: ITouchProps) {
  return (event: ITouchEvent) => {
    event = Object.create(event);
    const owner = getEventOwner(event);
    owner.startPoints = owner.endPoints = getTouchPoinsts(event);
    const { onTapHold, onPointDown } = props;
    if (onTapHold) {
      owner.startHoldTimer(() => onTapHold(event));
    }
    if (onPointDown) {
      onPointDown(event);
    }
  };
}

export function createMoveHandler(props: ITouchProps) {
  return (event: ITouchEvent) => {
    event = Object.create(event);
    const target = getEventOwner(event);
    const info = calcTouchInfo(event);
    const { onPointMove } = props;
    if (info.isSwipeMove) {
      target.clearHoldTimer();
    }
    if (target.isPointDown && onPointMove) {
      onPointMove(event);
    }
  };
}

export function createEndHandler(props: ITouchProps) {
  return (event: ITouchEvent) => {
    event = Object.create(event);
    const owner = getEventOwner(event);
    owner.clearHoldTimer();
    const info = calcTouchInfo(event);
    const { onPointUp, onSwipe, onTap, onDoubleTap } = props;
    const onSwipeX = props["onSwipe" + info.direction];
    // 模拟鼠标事件
    if (onPointUp) {
      onPointUp(event);
      owner.isPointDown = false;
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
        owner.isDoubleTap =
          owner.lastTapTime &&
          info.timeStamp - owner.lastTapTime <=
          TouchOptions.dblDurationThreshold;
        if (owner.isDoubleTap) {
          onDoubleTap(event);
          owner.lastTapTime = null;
        } else {
          owner.lastTapTime = owner.endPoint.timeStamp;
        }
      }
    }
  };
}

export function calcTouchInfo(event: any) {
  event = Object.create(event);
  const owner = getEventOwner(event);
  owner.endPoints = getTouchPoinsts(event);
  // 一些计算结果
  const info: ICalcInfo = {};
  info.timeStamp = owner.endPoint ? owner.endPoint.timeStamp : null;
  info.existStartAndStop = !!(owner.endPoint && owner.startPoint);
  info.horizontalDistance = info.existStartAndStop
    ? owner.endPoint.x - owner.startPoint.x
    : 0;
  info.verticalDistance = info.existStartAndStop
    ? owner.endPoint.y - owner.startPoint.y
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
    ? owner.endPoint.timeStamp - owner.startPoint.timeStamp <=
    TouchOptions.swipeDurationThreshold
    : true;
  info.isHoldTime = info.existStartAndStop
    ? owner.endPoint.timeStamp - owner.startPoint.timeStamp >=
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
