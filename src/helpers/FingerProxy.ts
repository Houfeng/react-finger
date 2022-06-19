/**
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  Fragment,
  HTMLAttributes,
  ReactNode,
  createContext,
  createElement,
  forwardRef,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { AnyFunction } from "../core/FingerUtils";
import { FingerMixEvents } from "../core/FingerEvents";
import { FingerPointerEvents } from "../core/FingerPointerEvents";
import { useFingerEvents } from "./FingerHook";

const GestureProxyContext =
  createContext<(events: Partial<FingerMixEvents<Element>>) => void>(null);

export type FingerProxyProps = Partial<FingerMixEvents> & {
  target?: EventTarget;
  capture?: boolean;
  passive?: boolean;
};

function toNativeEventName(name: string) {
  return name.slice(2).toLocaleLowerCase();
}

function FingerEventTargetProxy(props: FingerProxyProps) {
  const { target = document, capture, passive, ...others } = props;
  const events = useFingerEvents(others);
  useLayoutEffect(() => {
    const eventEntries = Object.entries(events);
    const options = { capture, passive };
    eventEntries.forEach(
      ([name, listener]: [string, AnyFunction]) =>
        target.addEventListener(toNativeEventName(name), listener),
      options
    );
    return () => {
      eventEntries.forEach(
        ([name, listener]: [string, AnyFunction]) =>
          target.removeEventListener(toNativeEventName(name), listener),
        options
      );
    };
  }, Object.values(props));
  return createElement(Fragment);
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
export function FingerProxy(props: FingerProxyProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { target, capture, passive, ...others } = props;
  const setGestureEvents = useContext(GestureProxyContext);
  const isProxyToBoundary = setGestureEvents && !target;
  useLayoutEffect(() => {
    if (isProxyToBoundary) setGestureEvents(others);
  });
  return isProxyToBoundary
    ? createElement(Fragment)
    : createElement(FingerEventTargetProxy, props);
}

export type FingerProxyBoundaryProps = {
  children: (events: FingerPointerEvents) => ReactNode;
};

/**
 * 代理边界组件，能影响所有子组件中的 GestureProxy
 * 注意：下层所有未指定 target 的 GestureProxy，将代理到最近的 GestureProxyBoundary
 *
 * @param props 属性
 * @returns JSX.Element
 */
export function FingerProxyBoundary(props: FingerProxyBoundaryProps) {
  const { children } = props;
  const [eventMap, setGestureEvents] =
    useState<Partial<FingerMixEvents<Element>>>(null);
  const events = useFingerEvents(eventMap);
  return createElement(GestureProxyContext.Provider, {
    value: setGestureEvents,
    children: children(events),
  });
}

export type FingerProxyContainerProps<T extends Element = Element> =
  HTMLAttributes<T> & { children: ReactNode };

/**
 * 将一个原生 HTML 标签，转换为具备 GestureProxyBoundary 能力的高阶容器组件
 *
 * @param props 属性
 * @returns JSX.Element
 */
export function FingerProxyContainer<T extends keyof HTMLElementTagNameMap>(
  type: T
) {
  return forwardRef<
    HTMLAttributes<HTMLElementTagNameMap[T]>,
    FingerProxyContainerProps<HTMLElementTagNameMap[T]>
  >(function FingerProxyContainerComponent(props, ref) {
    return createElement(FingerProxyBoundary, {
      children: (events) => createElement(type, { ...props, ...events, ref }),
    });
  });
}
