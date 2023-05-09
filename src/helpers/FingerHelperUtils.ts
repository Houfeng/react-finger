/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { getAllEventNames } from "../core/FingerProviders";
import { AnyFunction, isFunction } from "../core/FingerUtils";

export function splitProps(props: Record<string, any>) {
  const eventNames = getAllEventNames();
  const eventProps: Record<string, AnyFunction> = {};
  const otherProps: Record<string, any> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (eventNames.has(key) && isFunction(value)) eventProps[key] = value;
    else otherProps[key] = value;
  });
  return { eventProps, otherProps };
}
