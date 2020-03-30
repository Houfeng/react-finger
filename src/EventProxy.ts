import React, {
  Fragment,
  createElement,
  ReactNode,
  HTMLAttributes
} from "react";
import { isFunction } from "ntils";

export type EventProxyTarget =
  | EventTarget
  | Document
  | Window
  | typeof globalThis
  | HTMLElement;

export interface IEventProxyProps<
  T extends EventProxyTarget = EventProxyTarget
> extends HTMLAttributes<T> {
  target?: T;
  useCapture?: boolean;
  [name: string]: any;
}

export class EventProxyInner<
  T extends EventProxyTarget = EventProxyTarget
> extends React.PureComponent<IEventProxyProps<T>> {
  public static motaTouch = true;

  protected handlers: [string, EventListenerOrEventListenerObject][];
  protected target: T;
  protected useCapture?: boolean;

  protected save() {
    this.target = this.props.target;
    this.useCapture = this.props.useCapture || false;
    this.handlers = Object.entries(this.props).reduce(
      (list, [name, handler]) => {
        if (!isFunction(handler) || !name.startsWith("on")) return list;
        return [...list, [name.slice(2).toLowerCase(), handler]];
      },
      []
    );
  }

  protected bind() {
    this.save();
    if (!this.target || !this.handlers) return;
    this.handlers.forEach(([name, handler]) => {
      this.target.addEventListener(name, handler, this.useCapture);
    });
  }

  protected unbind() {
    if (!this.target || !this.handlers) return;
    this.handlers.forEach(([name, handler]) => {
      this.target.removeEventListener(name, handler, this.useCapture);
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

export class EventProxy extends React.PureComponent<IEventProxyProps> {
  static touch: (...args: any[]) => ReactNode = null;
  static setMotaTouch = (value: any) => (EventProxy.touch = value);
  render() {
    const { target = document, ...others } = this.props;
    const { touch } = EventProxy;
    if (!touch) return createElement(Fragment);
    const props = { ...others, target, motaTouchHost: this };
    return touch(createElement(EventProxyInner, props), {});
  }
}
