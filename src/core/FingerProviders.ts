/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerContext } from "./FingerContext";
import { FingerEvents } from "./FingerEvents";
import { HostPointerEvent } from "./FingerHostEvents";

export type FingerProviderParams = {
  events: Partial<FingerEvents>;
  context: FingerContext;
  pointer: HostPointerEvent;
};

export type FingerProvideHandler = (params: FingerProviderParams) => void;

export type FingerProvider<
  N extends string = string,
  E extends string = string
> = Partial<{
  handlePointerWillDown: FingerProvideHandler;
  handlePointerDown: FingerProvideHandler;
  handlePointerWillMove: FingerProvideHandler;
  handlePointerMove: FingerProvideHandler;
  handlePointerWillUp: FingerProvideHandler;
  handlePointerUp: FingerProvideHandler;
  handlePointerWillCancel: FingerProvideHandler;
  handlePointerCancel: FingerProvideHandler;
}> & { name: N; events: E[] };

const providers = new Set<FingerProvider<string, string>>();

export function registerFingerProvider(
  provider: FingerProvider<string, string>
) {
  providers.add(provider);
}

export function getAllFingerProviders() {
  return providers;
}
