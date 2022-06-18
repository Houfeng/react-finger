import React, { Fragment, RefObject, useEffect, useRef } from "react";

import { AnyFunction } from "../core/GestureUtils";
import { GestureMixEvents } from '../core/GestureEvents';
import { useGestureEvents } from './GestureHook';

export type GestureProxyProps = Partial<GestureMixEvents> & {
  target?: EventTarget | RefObject<EventTarget>;
  capture?: boolean;
  passive?: boolean;
};


function toNativeEventName(name: string) {
  return name.slice(2).toLocaleLowerCase();
}

/**
 * 手势事件代理组件，用于以组件式 API 代理到 window/document/element 等原生对象
 * 默认 target 为 document
 * @param props 属性
 * @returns JSX.Element
 */
export function GestureProxy(props: GestureProxyProps) {
  const { target: targetOrRef = document, capture, passive, ...others } = props;
  const events = useGestureEvents(others);
  const mountRef = useRef(false);
  useEffect(() => {
    mountRef.current = true;
    const target = targetOrRef instanceof EventTarget
      ? targetOrRef : targetOrRef.current;
    const entries = Object.entries(events);
    const options = { capture, passive };
    setTimeout(() => {
      if (!mountRef.current) return;
      entries.forEach(([name, listener]: [string, AnyFunction]) =>
        target.addEventListener(toNativeEventName(name), listener), options);
    }, 0);
    return () => {
      mountRef.current = false;
      entries.forEach(([name, listener]: [string, AnyFunction]) =>
        target.removeEventListener(toNativeEventName(name), listener), options);
    };
  }, Object.values(props));
  return <Fragment />;
}