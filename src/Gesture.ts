/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { GestureProps } from "./GestureProps";
import React from "react";
import { convertEventProps } from "./EventBinding";
import { isFunction } from "ntils";

interface TargetProps {
  onMouseDown: (event?: React.MouseEvent) => void;
  onMouseMove: (event?: React.MouseEvent) => void;
  onMouseUp: (event?: React.MouseEvent) => void;
  onTouchStart: (event?: React.TouchEvent) => void;
  onTouchMove: (event?: React.TouchEvent) => void;
  onTouchEnd: (event?: React.TouchEvent) => void;
  onPointerUp: (event?: React.PointerEvent) => void;
  onPointerMove: (event?: React.PointerEvent) => void;
  onPointerDown: (event?: React.PointerEvent) => void;
  children?: React.ReactNode;
}

interface TargetCC extends React.ComponentClass<TargetProps, any> {
  displayName?: string;
}

interface TargetFC extends React.FunctionComponent<TargetProps> {
  displayName?: string;
}

interface TargetEC
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<TargetProps> & React.RefAttributes<any>
  > {
  displayName?: string;
}

type GestureFC<T extends TargetFC> = (
  props: Parameters<T>[0] & GestureProps
) => ReturnType<T>;

type GestureCC<T extends TargetCC> = (
  props: ConstructorParameters<T>[0] & GestureProps,
  context: ConstructorParameters<T>[1]
) => T;

export type GestureEC<T extends TargetEC> = (
  props: Parameters<T>[0] & GestureProps
) => ReturnType<T>;

// Class component
export function gesture<T extends TargetCC>(type: T): GestureCC<T>;
// Function component
export function gesture<T extends TargetFC>(type: T): GestureFC<T>;
// Exotic component
export function gesture<T extends TargetEC>(type: T): GestureEC<T>;
// HTML element
export function gesture<T extends keyof React.ReactHTML>(
  type: T
): GestureFC<(props: Parameters<React.ReactHTML[T]>[0]) => React.ReactElement>;
// SVG element
export function gesture<T extends keyof React.ReactSVG>(
  type: T
): GestureFC<(props: Parameters<React.ReactSVG[T]>[0]) => React.ReactElement>;
// the function implementation
export function gesture<T extends TargetCC | TargetFC | string>(type: T) {
  const Wrapper = React.forwardRef((props: GestureProps, ref) => {
    const composeProps = React.useMemo(() => {
      return { ...props, ...convertEventProps(props), ref };
    }, Object.values(props));
    return React.createElement(type, composeProps);
  });
  Wrapper.displayName = String(
    isFunction(type) ? (type as any).displayName || type.name : type
  );
  return Wrapper;
}
