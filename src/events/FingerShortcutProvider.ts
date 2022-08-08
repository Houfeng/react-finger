/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerKeyboardEvent,
  FingerShortcutEvent,
} from "../core/FingerKeyboardEvents";

import { FingerProvider } from "../core/FingerProviders";

const KEY_SET = Symbol();
const LAST_ACTION = Symbol();

export const FingerShortcutProvider: FingerProvider = {
  name: "Shortcut",
  events: ["onShortcut"],

  handleKeyDown: ({ events, context, event }) => {
    const { flags } = context;
    if (!event.repeat) flags.set(LAST_ACTION, "down");
    if (flags.get(LAST_ACTION) === "up") return;
    const set = flags.has(KEY_SET)
      ? (flags.get(KEY_SET) as Set<string>)
      : new Set<string>();
    if (!flags.has(KEY_SET)) flags.set(KEY_SET, set);
    set.add(event.key.toLowerCase());
    const when: FingerShortcutEvent["detail"]["when"] = (keys, handler) => {
      if (
        keys.length === set.size &&
        keys.every((key) => set.has(key.toLowerCase()))
      ) {
        handler();
      }
    };
    const keys = Array.from(set);
    const detail = { when, keys };
    const shortcutEvent = FingerKeyboardEvent("onShortcut", event, detail);
    events.onShortcut?.(shortcutEvent);
  },

  handleKeyUp: ({ context, event }) => {
    const { flags } = context;
    if (!flags.has(KEY_SET)) return;
    flags.set(LAST_ACTION, "up");
    const set = flags.get(KEY_SET) as Set<string>;
    set.delete(event.key.toLowerCase());
    // 在 Mac 上，在 meta 按下时，其他键的的 keyup 不会触发，
    // 所以 meta 弹起时清空之前所有按键
    if (event.key === "Meta") set.clear();
  },
};
