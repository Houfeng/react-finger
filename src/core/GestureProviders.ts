import {
  GesturePointerEvent,
  GesturePointerEvents,
} from "./GesturePointerEvents";

import { GestureContext } from "./GestureContext";
import { GestureEvents } from "./GestureEvents";

export type GestureMixEvents = GestureEvents & GesturePointerEvents;

export type GestureProvideHandler = (
  events: Partial<GestureMixEvents>,
  context: GestureContext,
  pointer: GesturePointerEvent
) => void;

export type GestureProvider = {
  handlePointerDown: GestureProvideHandler;
  handlePointerMove: GestureProvideHandler;
  handlePointerUp: GestureProvideHandler;
  handlePointerCancel: GestureProvideHandler;
};

const providers = new Set<GestureProvider>();

export function registerGestureProvider(provider: GestureProvider) {
  providers.add(provider);
}

export function getAllGestureProviders() {
  return providers;
}
