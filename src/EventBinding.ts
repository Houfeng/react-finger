/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { calcDistance, isDesktop, supportEventTypes } from "./GestureUtils";
import { GestureEvent } from "./GestureEvents";
import { GestureCalcInfo } from "./GestureCalcInfo";
import { GestureProps } from "./GestureProps";
import { GestureInfo } from "./GestureInfo";
import { GestureOptions } from "./GestureOptions";
import { OriginEvent } from "./OriginEvent";

export function createStartHandler(props: GestureProps) {
  return (originEvent: OriginEvent) => {
    const event = new GestureEvent(originEvent, props);
    if (GestureInfo.type !== event.gestureType) return;
    event.handlePointDown();
    event.isPointDown = true;
    event.moveX = event.changedPoint?.clientX - event.point?.clientX;
    event.moveY = event.changedPoint?.clientY - event.point?.clientY;
    const { onTapHold, onGesturePointerDown, onPinchStart } = props;
    if (onTapHold) {
      event.startHoldTimer(() => event.emit(onTapHold));
    }
    event.emit(onGesturePointerDown);
    // Pinch
    if (event.changedPoints.length === 2 && event.points.length === 2) {
      event.isPinch = true;
      event.emit(onPinchStart);
    }
  };
}

export function createMoveHandler(props: GestureProps) {
  return (originEvent: OriginEvent) => {
    const event = new GestureEvent(originEvent, props);
    if (GestureInfo.type !== event.gestureType) return;
    event.handlePointMove();
    const { onGesturePointerMove, onPinch } = props;
    event.emit(onGesturePointerMove);
    if (event.isPointDown) {
      const info = calcGestureInfo(event);
      if (info.isSwipeMove) event.clearHoldTimer();
      event.moveX = event.changedPoint?.clientX - event.point?.clientX;
      event.moveY = event.changedPoint?.clientY - event.point?.clientY;
    }
    if (
      event.isPointDown &&
      event.changedPoints.length === 2 &&
      event.points.length === 2
    ) {
      event.isPinch = true;
      const origin = calcDistance(event.points[0], event.points[1]);
      const latest = calcDistance(
        event.changedPoints[0],
        event.changedPoints[1]
      );
      event.scale = latest / origin;
      event.emit(onPinch);
    }
  };
}

export function createEndHandler(props: GestureProps) {
  return (originEvent: OriginEvent) => {
    const event = new GestureEvent(originEvent, props);
    if (GestureInfo.type !== event.gestureType) return;
    const info = calcGestureInfo(event);
    event.isPointDown = false;
    event.clearHoldTimer();
    const {
      onGesturePointerUp,
      onSwipe,
      onTap,
      onDoubleTap,
      onPinchEnd
    } = props;
    const onSwipeX = (props as any)["onSwipe" + info.direction];
    event.emit(onGesturePointerUp);
    // Pinch 事件
    if (event.isPinch) event.emit(onPinchEnd);
    // 根据计算结果判断
    if (info.isSwipeTime && info.isSwipeMove) {
      event.isSwipe = true;
      event.direction = info.direction;
      event.emit(onSwipe);
      event.emit(onSwipeX);
    } else if (info.isSwipeTime && !info.isSwipeMove && !info.isHoldTime) {
      event.emit(onTap);
      if (onDoubleTap) {
        const timeStamp = event.timeStamp || event.changedPoint?.timeStamp;
        const x = event.clientX || event.changedPoint?.clientX;
        const y = event.clientY || event.changedPoint?.clientY;
        const lastTapInfo = event.lastTapInfo;
        // 处理 “双击”
        event.isDoubleTap =
          lastTapInfo &&
          timeStamp - lastTapInfo.timeStamp <=
            GestureOptions.dblDurationThreshold &&
          Math.abs(x - lastTapInfo.x) <
            GestureOptions.swipeHorizontalDistanceThreshold &&
          Math.abs(y - lastTapInfo.y) <
            GestureOptions.swipeVerticalDistanceThreshold;
        if (event.isDoubleTap) {
          event.emit(onDoubleTap);
          event.lastTapInfo = null;
        } else {
          event.lastTapInfo = { timeStamp, x, y };
        }
      }
    }
    event.handlePointEnd();
  };
}

export function calcGestureInfo(event: GestureEvent) {
  const info: GestureCalcInfo = {};
  info.timeStamp = event.changedPoint ? event.changedPoint.timeStamp : null;
  info.existStartAndStop = !!(event.changedPoint && event.point);
  info.horizontalDistance = info.existStartAndStop
    ? event.changedPoint.clientX - event.point.clientX
    : 0;
  info.verticalDistance = info.existStartAndStop
    ? event.changedPoint.clientY - event.point.clientY
    : 0;
  info.horizontalDistanceValue = Math.abs(info.horizontalDistance);
  info.verticalDistanceVlaue = Math.abs(info.verticalDistance);
  info.isHorizontal =
    info.horizontalDistanceValue >= info.verticalDistanceVlaue;
  info.isVertical = !info.isHorizontal;
  info.isSwipeMove =
    info.horizontalDistanceValue >=
      GestureOptions.swipeHorizontalDistanceThreshold ||
    info.verticalDistanceVlaue >= GestureOptions.swipeVerticalDistanceThreshold;
  info.isSwipeTime = info.existStartAndStop
    ? event.changedPoint.timeStamp - event.point.timeStamp <=
      GestureOptions.swipeDurationThreshold
    : true;
  info.isHoldTime = info.existStartAndStop
    ? event.changedPoint.timeStamp - event.point.timeStamp >=
      GestureOptions.holdDurationThreshold
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

export function mapingToNative(props: any, from: string, to: string) {
  const handler = props[from];
  delete props[from];
  props[to] = handler;
}

export function createAttachProps(props: GestureProps) {
  // fix: ios 10+
  const { onPinchStart, onPinch, onPinchEnd } = props;
  if (onPinchStart || onPinch || onPinchEnd) {
    document.addEventListener("gesturestart", event => event.preventDefault());
  }
  if (GestureOptions.possibleToNative && isDesktop()) {
    mapingToNative(props, "onDoubleTap", "onDoubleClick");
    mapingToNative(props, "onTap", "onClick");
  }
  const startHandler = createStartHandler(props);
  const moveHandler = createMoveHandler(props);
  const endHandler = createEndHandler(props);
  // pointer
  const pointerEvents = isDesktop() &&
    supportEventTypes.pointer && {
      onPointerDown: startHandler,
      onPointerMove: moveHandler,
      onPointerUp: endHandler,
      onPointerCancel: endHandler
    };
  // touch
  const touchEvents = supportEventTypes.touch &&
    !pointerEvents && {
      onTouchStart: startHandler,
      onTouchMove: moveHandler,
      onTouchEnd: endHandler,
      onTouchCancel: endHandler
    };
  // mouse
  const mouseEvents = supportEventTypes.mouse &&
    !pointerEvents && {
      onMouseDown: startHandler,
      onMouseMove: moveHandler,
      onMouseUp: endHandler
    };
  return { ...touchEvents, ...mouseEvents, ...pointerEvents };
}
