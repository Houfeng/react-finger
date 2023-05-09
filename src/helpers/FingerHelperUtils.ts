/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { getAllEventNames } from "../core/FingerProviders";
import { AnyFunction } from "../core/FingerUtils";

export type FingerForwardRefExoticComponent<T, P> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>;

export function splitProps(props: Record<string, any>) {
  const eventNames = getAllEventNames();
  const eventProps: Record<string, AnyFunction> = {};
  const otherProps: Record<string, any> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (eventNames.has(key)) eventProps[key] = value;
    else otherProps[key] = value;
  });
  return { eventProps, otherProps };
}
