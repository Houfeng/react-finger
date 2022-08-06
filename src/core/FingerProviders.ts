/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerKeyboardContext, FingerPointerContext } from "./FingerContext";
import { HostKeyboardEvent, HostPointerEvent } from "./FingerHostEvents";

import { FingerKeyboardEvents } from "./FingerKeyboardEvents";
import { FingerPointerEvents } from "./FingerPointerEvents";

export type FingerProviderPointerParams = {
  events: Partial<FingerPointerEvents>;
  context: FingerPointerContext;
  pointer: HostPointerEvent;
};

export type FingerProviderPointerHandler = (
  params: FingerProviderPointerParams
) => void;

export type FingerProviderKeyboardParams = {
  events: Partial<FingerKeyboardEvents>;
  context: FingerKeyboardContext;
  event: HostKeyboardEvent;
};

export type FingerProviderKeyboardHandler = (
  params: FingerProviderKeyboardParams
) => void;

export type FingerProvider<
  N extends string = string,
  E extends string = string
> = Partial<{
  handlePointerWillDown: FingerProviderPointerHandler;
  handlePointerDown: FingerProviderPointerHandler;
  handlePointerWillMove: FingerProviderPointerHandler;
  handlePointerMove: FingerProviderPointerHandler;
  handlePointerWillUp: FingerProviderPointerHandler;
  handlePointerUp: FingerProviderPointerHandler;
  handlePointerWillCancel: FingerProviderPointerHandler;
  handlePointerCancel: FingerProviderPointerHandler;
  handleKeyDown: FingerProviderKeyboardHandler;
  handleKeyUp: FingerProviderKeyboardHandler;
}> & { name: N; events: E[] };

const providers = new Set<FingerProvider<string, string>>();

const eventNames = new Set([
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onKeyDown",
  "onKeyUp",
]);

export function registerFingerProvider(
  provider: FingerProvider<string, string>
) {
  providers.add(provider);
  provider.events.forEach((name) => eventNames.add(name));
}

export function getAllFingerProviders() {
  return providers;
}

export function getAllEventNames() {
  return eventNames;
}
