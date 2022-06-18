import React, { Fragment } from "react";

import { GestureMixEvents } from '../core/GestureEvents';

export type GestureProxyProps = GestureMixEvents;

export function GestureProxy(props: GestureProxyProps) {
  console.log("GestureProxy", props);
  return <Fragment />;
}