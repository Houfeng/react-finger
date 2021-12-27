/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { EventProxyTarget, toEventTarget } from "./EventProxyTarget";
import {
  Fragment,
  HTMLAttributes,
  PureComponent,
  ReactNode,
  createElement
} from "react";
import { isFunction, isNull } from "ntils";

import { EventContext } from "./EventContext";
import { nextTick } from "mota";

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
> extends PureComponent<EventProxyProps<T>> {
  public static gesture = true;

  protected handlers: [string, EventListenerOrEventListenerObject][];
  protected target: EventTarget;
  protected options?: boolean | AddEventListenerOptions;
  private mounted = false;

  protected save() {
    const { target, useCapture = false } = this.props;
    const { capture = useCapture, passive, once } = this.props;
    this.target = toEventTarget(target) || document;
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
    if (!this.mounted) return;
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
    this.mounted = true;
    nextTick(() => this.bind());
  }

  componentDidUpdate() {
    nextTick(() => this.rebind());
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unbind();
  }

  render() {
    return createElement(Fragment);
  }
}

export class EventProxy extends PureComponent<EventProxyProps> {
  static gesture: (...args: any[]) => ReactNode = null;
  static setGesture = (value: any) => (EventProxy.gesture = value);
  render() {
    return createElement(
      EventContext.Consumer,
      null,
      (value: EventProxyTarget) => {
        const { target = value || document, ...others } = this.props;
        const { gesture } = EventProxy;
        if (!gesture) {
          console.error(`using EventProxy need to enable gesture`);
          return createElement(Fragment);
        }
        const props = { ...others, target, motaTouchHost: this };
        return gesture(createElement(EventProxyInner, props), {});
      }
    );
  }
}
