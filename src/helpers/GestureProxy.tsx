import React, {
  CSSProperties,
  Fragment,
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { AnyFunction } from "../core/GestureUtils";
import { GestureMixEvents } from '../core/GestureEvents';
import { GesturePointerEvents } from "../core/GesturePointerEvents";
import { useGestureEvents } from './GestureHook';

const GestureProxyContext = createContext<
  (events: Partial<GestureMixEvents<Element>>) => void
>(null);

export type GestureProxyProps = Partial<GestureMixEvents> & {
  target?: EventTarget;
  capture?: boolean;
  passive?: boolean;
};

function toNativeEventName(name: string) {
  return name.slice(2).toLocaleLowerCase();
}

function GestureEventTargetProxy(props: GestureProxyProps) {
  const { target = document, capture, passive, ...others } = props;
  const events = useGestureEvents(others);
  useLayoutEffect(() => {
    const eventEntries = Object.entries(events);
    const options = { capture, passive };
    eventEntries.forEach(([name, listener]: [string, AnyFunction]) =>
      target.addEventListener(toNativeEventName(name), listener), options);
    return () => {
      eventEntries.forEach(([name, listener]: [string, AnyFunction]) =>
        target.removeEventListener(toNativeEventName(name), listener), options);
    };
  }, Object.values(props));
  return <Fragment />;
}

/**
 * 手势事件代理组件，用于以组件式 API 代理到 window、document 等原生对象
 * 
 * 当前未指定 target 时：
 *    1. 如果上层有 GestureProxyBoundary 将代理到最近的 GestureProxyBoundary
 *    2. 如果上层没有有 GestureProxyBoundary 将代理到 document
 * 当前指定了 target 时
 *    1. 总是代理到指定的 target 
 * 
 * @param props 属性
 * @returns JSX.Element
 */
export function GestureProxy(props: GestureProxyProps) {
  const { target, capture, passive, ...others } = props;
  const setGestureEvents = useContext(GestureProxyContext);
  const isProxyToBoundary = setGestureEvents && !target;
  useLayoutEffect(() => {
    if (isProxyToBoundary) setGestureEvents(others);
  });
  return isProxyToBoundary
    ? <Fragment />
    : <GestureEventTargetProxy {...props} />;
}

export type GestureProxyBoundaryProps = {
  children: (events: GesturePointerEvents) => ReactNode;
}

/**
 * GestureProxy 的代理边界，针对下层所有未指定 target 的 GestureProxy 有效
 * 下层未指定 target 的 GestureProxy 将自动代理到最近的 GestureProxyBoundary
 * 
 * @param props 属性
 * @returns JSX.Element
 */
export function GestureProxyBoundary(props: GestureProxyBoundaryProps) {
  const { children } = props;
  const [eventMap, setGestureEvents] =
    useState<Partial<GestureMixEvents<Element>>>(null);
  const events = useGestureEvents(eventMap);
  return (
    <GestureProxyContext.Provider value={setGestureEvents}>
      {children(events)}
    </GestureProxyContext.Provider>
  );
}

export type GestureProxyContainerProps = {
  tagName: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * 具备 GestureProxy 代理边界能力的容器组件，需通过 tagName 指定容器的元素类型
 * 
 * 注意：GestureProxy 的代理边界，针对下层所有未指定 target 的 GestureProxy 有效
 * 下层未指定 target 的 GestureProxy 将自动代理到最近的 GestureProxyBoundary
 * 
 * @param props 属性
 * @returns JSX.Element
 */
export function GestureProxyContainer(props: GestureProxyContainerProps) {
  const { tagName, className, style, children } = props;
  return (
    <GestureProxyBoundary>
      {(events) => React.createElement(tagName, {
        ...events, className, style, children
      })}
    </GestureProxyBoundary>
  );
}