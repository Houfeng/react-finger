import React, { PureComponent, createElement, Fragment } from "react";
import { isFunction } from "util";

export interface IEventProxyProps<T extends EventTarget = Document>
  extends React.DOMAttributes<T> {
  /**
   * 指向同一个 target 的所有 EventProxy 的 key 必需全局唯一
   */
  key: string;

  /**
   * 代理到的目标对象，默认是 document
   */
  target?: T;

  /**
   * 是否为 Capture 阶段
   */
  useCapture?: boolean;
  [name: string]: any;
}

export class EventProxy<T extends EventTarget = Document> extends PureComponent<
  IEventProxyProps<T>
> {
  static defaultProps = { target: document };

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
    return createElement(Fragment);
  }
}
