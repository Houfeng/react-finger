/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerKeyboardEvent,
  FingerShortcutEvent,
} from "../core/FingerKeyboardEvents";

import { FingerProvider } from "../core/FingerProviders";

const LAST_ACTION_IS_DOWN = Symbol();

function isMatched(keys: Set<string>, matchKeys: string[]) {
  return (
    keys &&
    matchKeys &&
    matchKeys.length === keys.size &&
    matchKeys.every((key) => keys.has(key.toLowerCase()))
  );
}

export const FingerShortcutProvider: FingerProvider = {
  name: "Shortcut",
  events: ["onShortcut"],

  handleKeyDown: ({ events, context, event }) => {
    const { flags } = context;
    // +防止按下多键组合，逐个弹起时，触发多次不同的组合
    if (!event.repeat) flags.set(LAST_ACTION_IS_DOWN, true);
    if (!flags.get(LAST_ACTION_IS_DOWN)) return;
    // -防止按下多键组合，逐个弹起时，触发多次不同的组合
    const keys = new Set<string>();
    if (event.ctrlKey) keys.add("control");
    if (event.metaKey) keys.add("meta");
    if (event.shiftKey) keys.add("shift");
    if (event.altKey) keys.add("alt");
    keys.add(event.key.toLowerCase());
    const when: FingerShortcutEvent["detail"]["when"] = (matchKeys, handler) =>
      isMatched(keys, matchKeys) && handler(event);
    const detail = { when, keys };
    const shortcutEvent = FingerKeyboardEvent("onShortcut", event, detail);
    events.onShortcut?.(shortcutEvent);
  },

  handleKeyUp: ({ context }) => context.flags.delete(LAST_ACTION_IS_DOWN),
};
