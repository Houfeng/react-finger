/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { HTMLAttributes, ReactNode, createElement, forwardRef } from "react";

import { FingerMixEvents } from "../core/FingerCompose";
import { getAllFingerProviders } from "../core/FingerProviders";
import { useFingerEvents } from "./FingerHook";

const eventNames = new Set([
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
]);

getAllFingerProviders().forEach((provider) => {
  provider.events.forEach((name) => eventNames.add(name));
});

function splitProps(props: Record<string, any>) {
  const eventProps: Record<string, any> = {};
  const otherProps: Record<string, any> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (eventNames.has(key)) eventProps[key] = value;
    else otherProps[key] = value;
  });
  return { eventProps, otherProps };
}

type FingerProps<T extends Element = Element> = HTMLAttributes<T> &
  Partial<FingerMixEvents<T>> & {
    children?: ReactNode;
  };

/**
 * 将一个原生 HTML 标签，转换为具备「手势事件」的高阶组件
 *
 * @param type 原生 HTML 标签的 TagName
 * @returns 具备手势事件的高阶组件
 */
export function Finger<T extends keyof HTMLElementTagNameMap>(type: T) {
  return forwardRef<
    HTMLElementTagNameMap[T],
    FingerProps<HTMLElementTagNameMap[T]>
  >(function FingerComponent(props, ref) {
    const { eventProps, otherProps } = splitProps(props);
    const events = useFingerEvents(eventProps);
    return createElement(type, { ...otherProps, ...events, ref });
  });
}
