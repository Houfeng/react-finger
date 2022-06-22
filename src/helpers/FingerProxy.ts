/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerEvent, FingerEventListener } from "../core/FingerEvents";
import {
  Fragment,
  HTMLAttributes,
  ReactNode,
  createContext,
  createElement,
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";

import { AnyFunction } from "../core/FingerUtils";
import { EventEmitter } from "eify";
import { FingerMixEvents } from "../core/FingerCompose";
import { HostPointerEvents } from "../core/FingerHostEvents";
import { useFingerEvents } from "./FingerHook";

type FingerProxyEventTarget = {
  addEventListener: (
    name: string,
    listener: AnyFunction,
    options?: any
  ) => void;
  removeEventListener: (
    name: string,
    listener: AnyFunction,
    options?: any
  ) => void;
};

export type FingerProxyProps = Partial<FingerMixEvents> & {
  target?: FingerProxyEventTarget;
};

function toNativeEventName(name: string) {
  return name.slice(2).toLocaleLowerCase();
}

const FingerProxyContext = createContext<FingerProxyEventTarget>(null);

/**
 * 手势事件代理组件，主要有两个能力
 *    1. 用于以组件式 API 代理到 window、document 等原生对象
 *    2. 将事件代理到父层的某个 FingerProxyBoundary 上
 *
 * 当前未指定 target 时：
 *    1. 如果上层有 FingerProxyBoundary 将代理到最近的 FingerProxyBoundary
 *    2. 如果上层没有有 FingerProxyBoundary 将代理到 document
 * 当前指定了 target 时
 *    1. 总是代理到指定的 target
 *
 * @param props 属性
 * @returns JSX.Element
 */
export function FingerProxy(props: FingerProxyProps) {
  const contextTarget = useContext(FingerProxyContext);
  const { target = contextTarget || document, ...others } = props;
  const events = useFingerEvents(others);
  const isProxyBoundary = !!contextTarget;
  useLayoutEffect(() => {
    const eventEntries = Object.entries<AnyFunction>(events);
    eventEntries.forEach(([name, listener]) => {
      name = isProxyBoundary ? name : toNativeEventName(name);
      target.addEventListener(name, listener);
    }, false);
    return () => {
      eventEntries.forEach(([name, listener]) => {
        name = isProxyBoundary ? name : toNativeEventName(name);
        target.removeEventListener(name, listener);
      }, false);
    };
  }, Object.values(props));
  return createElement(Fragment);
}

/**
 * FingerProxyBoundaryEventTarget
 * @returns events & Proxy EventTarget
 */
function FingerProxyBoundaryOwner(): [
  HostPointerEvents,
  FingerProxyEventTarget
] {
  const emitter = new EventEmitter<HostPointerEvents>();
  const events: HostPointerEvents = {
    onPointerDown: (event) => emitter.emit("onPointerDown", event),
    onPointerMove: (event) => emitter.emit("onPointerMove", event),
    onPointerUp: (event) => emitter.emit("onPointerUp", event),
    onPointerCancel: (event) => emitter.emit("onPointerCancel", event),
  };
  const addEventListener = (
    name: keyof HostPointerEvents,
    listener: FingerEventListener<FingerEvent>
  ) => emitter.addListener(name, listener);
  const removeEventListener = (
    name: keyof HostPointerEvents,
    listener: FingerEventListener<FingerEvent>
  ) => emitter.removeListener(name, listener);
  return [events, { addEventListener, removeEventListener }];
}

export type FingerProxyBoundaryProps = {
  children: (target: HostPointerEvents) => ReactNode;
};

/**
 * 代理边界组件，能影响所有子组件中的 FingerProxy
 * 注意：下层所有未指定 target 的 FingerProxy，将代理到最近的 FingerProxyBoundary
 *
 * @param props 属性
 * @returns JSX.Element
 */
export function FingerProxyBoundary(props: FingerProxyBoundaryProps) {
  const { children } = props;
  const [events, target] = useMemo(() => FingerProxyBoundaryOwner(), []);
  return createElement(FingerProxyContext.Provider, {
    value: target,
    children: children(events),
  });
}

export type FingerProxyContainerProps<T extends Element = Element> =
  HTMLAttributes<T> & { children?: ReactNode };

/**
 * 将一个原生 HTML 标签，转换为具备 FingerProxyBoundary 能力的高阶容器组件
 *
 * @param props 属性
 * @returns JSX.Element
 */
export function FingerProxyContainer<T extends keyof HTMLElementTagNameMap>(
  type: T
) {
  return forwardRef<
    HTMLElementTagNameMap[T],
    FingerProxyContainerProps<HTMLElementTagNameMap[T]>
  >(function FingerProxyContainerComponent(props, ref) {
    return createElement(FingerProxyBoundary, {
      children: (events) => createElement(type, { ...props, ...events, ref }),
    });
  });
}
