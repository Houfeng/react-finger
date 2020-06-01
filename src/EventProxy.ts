/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import React, {
  createElement,
  Fragment,
  HTMLAttributes,
  ReactNode
} from "react";
import { isFunction, isNull } from "ntils";

export type EventProxyTarget =
  | EventTarget
  | Document
  | Window
  | typeof globalThis
  | HTMLElement;

export interface EventProxyProps<T extends EventProxyTarget = EventProxyTarget>
  extends HTMLAttributes<T> {
  target?: T;
  /**
   * @deprecated Please use 'capture' instead
   */
  useCapture?: boolean;
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

export class EventProxyInner<
  T extends EventProxyTarget = EventProxyTarget
> extends React.PureComponent<EventProxyProps<T>> {
  public static gesture = true;

  protected handlers: [string, EventListenerOrEventListenerObject][];
  protected target: T;
  protected options?: boolean | AddEventListenerOptions;

  protected save() {
    const { target, useCapture = false } = this.props;
    const { capture = useCapture, passive, once } = this.props;
    this.target = target;
    this.options =
      isNull(passive) && isNull(once) ? capture : { capture, passive, once };
    this.handlers = Object.entries(this.props).reduce(
      (list, [name, handler]) => {
        if (!isFunction(handler) || !name.startsWith("on")) return list;
        if (name === "onDoubleClick") name = "onDblClick";
        return [...list, [name.slice(2).toLowerCase(), handler]];
      },
      []
    );
  }

  protected bind() {
    this.save();
    if (!this.target || !this.handlers) return;
    this.handlers.forEach(([name, handler]) => {
      this.target.addEventListener(name, handler, this.options);
    });
  }

  protected unbind() {
    if (!this.target || !this.handlers) return;
    this.handlers.forEach(([name, handler]) => {
      this.target.removeEventListener(name, handler, this.options);
    });
  }

  protected rebind() {
    this.unbind();
    this.bind();
  }

  componentDidMount() {
    this.bind();
  }

  componentDidUpdate() {
    this.rebind();
  }

  componentWillUnmount() {
    this.unbind();
  }

  render() {
    return React.createElement(React.Fragment);
  }
}

export class EventProxy extends React.PureComponent<EventProxyProps> {
  static gesture: (...args: any[]) => ReactNode = null;
  static setGesture = (value: any) => (EventProxy.gesture = value);
  render() {
    const { target = document, ...others } = this.props;
    const { gesture } = EventProxy;
    if (!gesture) return createElement(Fragment);
    const props = { ...others, target, motaTouchHost: this };
    return gesture(createElement(EventProxyInner, props), {});
  }
}
