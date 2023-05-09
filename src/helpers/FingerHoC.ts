/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  HTMLAttributes,
  SVGAttributes,
  ReactNode,
  createElement,
  forwardRef,
} from "react";

import { FingerMixEvents } from "../core/FingerMixEvents";
import { useFingerEvents } from "./FingerHook";
import { HostElement } from "../core/FingerHostEvents";
import {
  FingerForwardRefExoticComponent,
  splitProps,
} from "./FingerHelperUtils";

export type FingerHTMLProps<T extends HostElement = HostElement> =
  HTMLAttributes<T> &
    Partial<FingerMixEvents<T>> & {
      children?: ReactNode;
    };

export type FingerSVGProps<T extends HostElement = HostElement> =
  SVGAttributes<T> &
    Partial<FingerMixEvents<T>> & {
      children?: ReactNode;
    };

/**
 * 将一个原生 HTML 标签，转换为具备「手势事件」的高阶组件
 *
 * @param type 原生 HTML 标签的 TagName
 * @returns 具备手势事件的高阶组件
 */
export function Finger<T extends keyof HTMLElementTagNameMap>(
  type: T
): FingerForwardRefExoticComponent<
  HTMLElementTagNameMap[T],
  FingerHTMLProps<HTMLElementTagNameMap[T]>
>;
export function Finger<T extends keyof SVGElementTagNameMap>(
  type: T
): FingerForwardRefExoticComponent<
  SVGElementTagNameMap[T],
  FingerSVGProps<SVGElementTagNameMap[T]>
>;
export function Finger<T extends keyof HTMLElementTagNameMap>(type: T) {
  return forwardRef<
    HTMLElementTagNameMap[T],
    FingerHTMLProps<HTMLElementTagNameMap[T]>
  >(function FingerComponent(props, ref) {
    const { eventProps, otherProps } = splitProps(props);
    const events = useFingerEvents(eventProps);
    return createElement(type, { ...otherProps, ...events, ref });
  });
}
