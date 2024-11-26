/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerPointerEvent,
  FingerPointerEventListener,
} from "../core/FingerPointerEvents";
import {
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  SVGAttributes,
  createContext,
  createElement,
  forwardRef,
  memo,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";

import { AnyFunction, isString } from "../core/FingerUtils";
import { EventEmitter } from "eify";
import { FingerMixEvents } from "../core/FingerMixEvents";
import { HostEvents, HostElement } from "../core/FingerHostEvents";
import { useFingerEvents } from "./FingerHook";
import {
  FingerForwardRefExoticComponent,
  splitProps,
} from "./FingerHelperUtils";

type FingerProxyEventTarget = {
  parent?: FingerProxyEventTarget;
  addEventListener: (
    name: string,
    listener: AnyFunction,
    options?: unknown
  ) => void;
  removeEventListener: (
    name: string,
    listener: AnyFunction,
    options?: unknown
  ) => void;
};

function toNativeEventName(name: string) {
  return name.slice(2).toLocaleLowerCase();
}

function createDOMTarget(
  node: EventTarget
): FingerProxyEventTarget | undefined {
  const addEventListener = (e: string, f: AnyFunction, o: unknown) => {
    const name = toNativeEventName(e);
    node.addEventListener(name, f, o);
  };
  const removeEventListener = (e: string, f: AnyFunction, o: unknown) => {
    const name = toNativeEventName(e);
    node.removeEventListener(name, f, o);
  };
  return { addEventListener, removeEventListener };
}

const GlobalTarget =
  typeof document !== "undefined" ? createDOMTarget(document) : void 0;

const FingerProxyContext = createContext<FingerProxyEventTarget>(null);

export type FingerProxyProps = Partial<FingerMixEvents> & {
  target?: FingerProxyEventTarget | "nearest" | "farthest";
  passive?: boolean;
};

function useFingerProxyTarget(target: FingerProxyProps["target"]) {
  target = target || "nearest";
  let contextTarget = useContext(FingerProxyContext);
  const domTarget = useMemo(() => {
    return target instanceof EventTarget ? createDOMTarget(target) : void 0;
  }, [target]);
  if (domTarget) return domTarget;
  if (target && !isString(target)) return target;
  if (target === "nearest") return contextTarget || GlobalTarget;
  while (contextTarget?.parent) contextTarget = contextTarget.parent;
  return contextTarget || GlobalTarget;
}

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
export const FingerProxy = memo(function FingerProxy(props: FingerProxyProps) {
  // * 当使用 useFingerEvents 返回结果再作为属性用于 FingerProxy 时,
  // * 在 Provider 中的 handle 方法看起来会进入两次，是因为经历了两次 compose
  // * 在 FingerProxy 上直接使用事件，便不会两次。此外，进入两次并不会产生问题。
  const { target = "nearest", passive = true, ...others } = props;
  const normalizeTarget = useFingerProxyTarget(target);
  const events = useFingerEvents(others);
  useLayoutEffect(() => {
    const eventEntries = Object.entries<AnyFunction>(events);
    eventEntries.forEach(([name, listener]) => {
      normalizeTarget.addEventListener(name, listener, { passive });
    }, false);
    return () => {
      eventEntries.forEach(([name, listener]) => {
        normalizeTarget.removeEventListener(name, listener);
      }, false);
    };
  }, Object.values(props));
  return createElement(Fragment);
});

/**
 * FingerProxyBoundaryEventTarget
 * @returns events & Proxy EventTarget
 */
function FingerProxyBoundaryOwner<T extends HostElement = HostElement>(
  props: Partial<HostEvents<T>>
): [HostEvents<T>, FingerProxyEventTarget] {
  if (!props) props = { ...props };
  const { onPointerDown, onPointerMove, onPointerUp, onPointerCancel } = props;
  const { onKeyDown, onKeyUp, onFocus, onBlur } = props;
  const emitter = new EventEmitter<HostEvents<T>>();
  const events: HostEvents<T> = {
    onPointerDown: (event) => {
      if (onPointerDown) onPointerDown(event);
      emitter.emit("onPointerDown", event);
    },
    onPointerMove: (event) => {
      if (onPointerMove) onPointerMove(event);
      emitter.emit("onPointerMove", event);
    },
    onPointerUp: (event) => {
      if (onPointerUp) onPointerUp(event);
      emitter.emit("onPointerUp", event);
    },
    onPointerCancel: (event) => {
      if (onPointerCancel) onPointerCancel(event);
      emitter.emit("onPointerCancel", event);
    },
    onKeyDown: (event) => {
      if (onKeyDown) onKeyDown(event);
      emitter.emit("onKeyDown", event);
    },
    onKeyUp: (event) => {
      if (onKeyUp) onKeyUp(event);
      emitter.emit("onKeyUp", event);
    },
    onFocus: (event) => {
      if (onFocus) onFocus(event);
      emitter.emit("onFocus", event);
    },
    onBlur: (event) => {
      if (onBlur) onBlur(event);
      emitter.emit("onBlur", event);
    },
  };
  const addEventListener = (
    name: keyof HostEvents<T>,
    listener: FingerPointerEventListener<FingerPointerEvent<T>>
  ) => emitter.addListener(name, listener);
  const removeEventListener = (
    name: keyof HostEvents<T>,
    listener: FingerPointerEventListener<FingerPointerEvent<T>>
  ) => emitter.removeListener(name, listener);
  return [events, { addEventListener, removeEventListener }];
}

export type FingerProxyBoundaryProps<T extends HostElement = HostElement> = {
  children: (events: HostEvents<T>) => ReactNode;
} & Partial<HostEvents<T>>;

/**
 * 代理边界组件，能影响所有子组件中的 FingerProxy
 * 注意：下层所有未指定 target 的 FingerProxy，将代理到最近的 FingerProxyBoundary
 *
 * @param props 属性
 * @returns JSX.Element
 */
export const FingerProxyBoundary = memo(function FingerProxyBoundary<
  T extends HostElement = HostElement
>(props: FingerProxyBoundaryProps<T>) {
  const { children, ...others } = props;
  const [events, target] = useMemo(
    () => FingerProxyBoundaryOwner<T>(others),
    []
  );
  target.parent = useContext(FingerProxyContext);
  return createElement(FingerProxyContext.Provider, {
    value: target,
    children: children(events),
  });
});

export type FingerProxyHTMLContainerProps<T extends HostElement = HostElement> =
  HTMLAttributes<T> & { children?: ReactNode; eventBoundary?: boolean };

export type FingerProxySVGContainerProps<T extends HostElement = HostElement> =
  SVGAttributes<T> & { children?: ReactNode; eventBoundary?: boolean };

const FingerProxyContainerCache = new Map<
  string,
  FingerForwardRefExoticComponent<
    HostElement,
    | FingerProxyHTMLContainerProps<HostElement>
    | FingerProxySVGContainerProps<HostElement>
  >
>();

/**
 * 将一个原生 HTML 标签，转换为具备 FingerProxyBoundary 能力的高阶容器组件
 *
 * @param props 属性
 * @returns JSX.Element
 */
export function FingerProxyContainer<T extends keyof HTMLElementTagNameMap>(
  type: T
): FingerForwardRefExoticComponent<
  HTMLElementTagNameMap[T],
  FingerProxyHTMLContainerProps<HTMLElementTagNameMap[T]>
>;
export function FingerProxyContainer<T extends keyof SVGElementTagNameMap>(
  type: T
): FingerForwardRefExoticComponent<
  SVGElementTagNameMap[T],
  FingerProxySVGContainerProps<SVGElementTagNameMap[T]>
>;
export function FingerProxyContainer<T extends keyof HTMLElementTagNameMap>(
  type: T
) {
  if (FingerProxyContainerCache.has(type)) {
    return FingerProxyContainerCache.get(type);
  }
  const FC = forwardRef<
    HTMLElementTagNameMap[T],
    FingerProxyHTMLContainerProps<HTMLElementTagNameMap[T]>
  >(function FingerProxyContainerComponent(props, ref) {
    const { eventBoundary, ...others } = props;
    if (eventBoundary === false) return createElement(type, { ...others, ref });
    const { eventProps } = splitProps(others);
    return createElement(
      FingerProxyBoundary as FunctionComponent<
        FingerProxyBoundaryProps<HTMLElementTagNameMap[T]>
      >,
      {
        ...eventProps,
        children: (events) =>
          createElement(type, { ...others, ...events, ref }),
      }
    );
  });
  FingerProxyContainerCache.set(type, FC);
  return FC;
}
