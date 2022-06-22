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

export type FingerProvider = Partial<{
  handlePointerWillDown: FingerProvideHandler;
  handlePointerDown: FingerProvideHandler;
  handlePointerWillMove: FingerProvideHandler;
  handlePointerMove: FingerProvideHandler;
  handlePointerWillUp: FingerProvideHandler;
  handlePointerUp: FingerProvideHandler;
  handlePointerWillCancel: FingerProvideHandler;
  handlePointerCancel: FingerProvideHandler;
}>;

const providers = new Set<FingerProvider>();

export function registerFingerProvider(provider: FingerProvider) {
  providers.add(provider);
}

export function getAllFingerProviders() {
  return providers;
}
