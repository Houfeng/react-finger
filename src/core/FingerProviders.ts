/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerContext } from "./FingerContext";
import { FingerMixEvents } from "./FingerEvents";
import { FingerPointerEvent } from "./FingerPointerEvents";

export type FingerProviderParams = {
  events: Partial<FingerMixEvents>;
  context: FingerContext;
  pointer: FingerPointerEvent;
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
