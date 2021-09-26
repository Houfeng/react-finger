/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import {
  calcDistance,
  isDesktop,
  isMobile,
  supportEventTypes
} from "./GestureUtils";

import { GestureCalcInfo } from "./GestureCalcInfo";
import { GestureEvent } from "./GestureEvents";
// import { GestureInfo } from "./GestureInfo";
import { GestureOptions } from "./GestureOptions";
import { GestureProps } from "./GestureProps";
import { OriginEvent } from "./OriginEvent";

export function createStartHandler(props: GestureProps) {
  return (originEvent: OriginEvent) => {
    const event = new GestureEvent(originEvent, props);
    // if (GestureInfo.type !== event.gestureType) return;
    event.handlePointDown();
    event.isPointDown = true;
    event.moveX = event.point?.clientX - event.initial?.point?.clientX;
    event.moveY = event.point?.clientY - event.initial?.point?.clientY;
    const { onTapHold, onGesturePointerDown, onPinchStart } = props;
    if (onTapHold) {
      event.startHoldTimer(() => event.emit(onTapHold));
    }
    event.emit(onGesturePointerDown);
    // Pinch
    if (event.points.length === 2) {
      event.isPinch = true;
      event.emit(onPinchStart);
    }
  };
}

export function createMoveHandler(props: GestureProps) {
  return (originEvent: OriginEvent) => {
    const event = new GestureEvent(originEvent, props);
    // if (GestureInfo.type !== event.gestureType) return;
    event.handlePointMove();
    const { onGesturePointerMove, onPinch } = props;
    event.emit(onGesturePointerMove);
    if (event.isPointDown) {
      const info = calcGestureInfo(event);
      if (info.isValidSwipeDistance) event.clearHoldTimer();
      event.moveX = event.point?.clientX - event.initial?.point?.clientX;
      event.moveY = event.point?.clientY - event.initial?.point?.clientY;
    }
    if (event.isPointDown && event.points.length === 2) {
      event.isPinch = true;
      const origin = calcDistance(
        event.initial?.points?.[0],
        event.initial?.points?.[1]
      );
      const latest = calcDistance(event.points?.[0], event.points?.[1]);
      if (origin !== 0 && latest !== 0) {
        event.scale = latest / origin;
        event.emit(onPinch);
      }
    }
  };
}

export function createEndHandler(props: GestureProps) {
  return (originEvent: OriginEvent) => {
    const event = new GestureEvent(originEvent, props);
    // if (GestureInfo.type !== event.gestureType) return;
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
    if (info.isValidSwipeTimeSpan && info.isValidSwipeDistance) {
      event.isSwipe = true;
      event.direction = info.direction;
      event.emit(onSwipe);
      event.emit(onSwipeX);
    } else if (
      info.isValidSwipeTimeSpan &&
      !info.isValidSwipeDistance &&
      !info.isValidHoldTimeSpan
    ) {
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
  info.existStartAndStop = !!(event.changedPoint && event.initial?.point);
  info.horizontalMutation = info.existStartAndStop
    ? event.changedPoint.clientX - event.initial.point.clientX
    : 0;
  info.verticalMutation = info.existStartAndStop
    ? event.changedPoint.clientY - event.initial.point.clientY
    : 0;
  info.horizontalDistance = Math.abs(info.horizontalMutation);
  info.verticalDistance = Math.abs(info.verticalMutation);
  info.isHorizontal = info.horizontalDistance >= info.verticalDistance;
  info.isVertical = !info.isHorizontal;
  info.isValidSwipeDistance =
    info.horizontalDistance >=
      GestureOptions.swipeHorizontalDistanceThreshold ||
    info.verticalDistance >= GestureOptions.swipeVerticalDistanceThreshold;
  info.isValidSwipeTimeSpan = info.existStartAndStop
    ? event.changedPoint.timeStamp - event.initial.point.timeStamp <=
      GestureOptions.swipeDurationThreshold
    : true;
  info.isValidHoldTimeSpan = info.existStartAndStop
    ? event.changedPoint.timeStamp - event.initial.point.timeStamp >=
      GestureOptions.holdDurationThreshold
    : false;
  // 这里的 direction 仅是指划动方向，不代表 swipe 动作，swipe 动作还有时间或划动距离等因素
  if (info.isHorizontal && info.horizontalMutation > 0) {
    info.direction = "Right";
  } else if (info.isHorizontal && info.horizontalMutation < 0) {
    info.direction = "Left";
  } else if (info.isVertical && info.verticalMutation > 0) {
    info.direction = "Down";
  } else if (info.isVertical && info.verticalMutation < 0) {
    info.direction = "Up";
  }
  return info;
}

export function mappingToNative(props: any, from: string, to: string) {
  const handler = props[from];
  delete props[from];
  props[to] = handler;
}

export function createAttachProps(props: GestureProps) {
  if (GestureOptions.possibleToNative && isDesktop()) {
    mappingToNative(props, "onDoubleTap", "onDoubleClick");
    mappingToNative(props, "onTap", "onClick");
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
  const touchEvents = isMobile() &&
    supportEventTypes.touch &&
    !pointerEvents && {
      onTouchStart: startHandler,
      onTouchMove: moveHandler,
      onTouchEnd: endHandler,
      onTouchCancel: endHandler
    };
  // mouse
  const mouseEvents = isDesktop() &&
    supportEventTypes.mouse &&
    !pointerEvents && {
      onMouseDown: startHandler,
      onMouseMove: moveHandler,
      onMouseUp: endHandler
    };
  return { ...touchEvents, ...mouseEvents, ...pointerEvents };
}
