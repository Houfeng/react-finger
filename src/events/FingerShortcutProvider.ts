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
const CONTROL_KEYS = ["control", "meta", "shift", "alt"];

function isControlKey(key: string) {
  return CONTROL_KEYS.includes(key);
}

function isMatch(keySet: Set<string>, keys: string[]) {
  return (
    keySet &&
    keys &&
    keys.length === keySet.size &&
    keys.every((key) => keySet.has(key.toLowerCase()))
  );
}

export const FingerShortcutProvider: FingerProvider = {
  name: "Shortcut",
  events: ["onShortcut"],

  handleKeyDown: ({ events, context, event }) => {
    const { flags } = context;
    if (!event.repeat) flags.set(LAST_ACTION, "down");
    if (flags.get(LAST_ACTION) === "up") return;
    const keySet = flags.has(KEY_SET)
      ? (flags.get(KEY_SET) as Set<string>)
      : new Set<string>();
    if (!flags.has(KEY_SET)) flags.set(KEY_SET, keySet);
    const currentKey = event.key.toLowerCase();
    if (keySet.has("meta")) {
      // 在 Mac 上，在 meta 按下时，其他非控制键的 keyup 不会触发，
      // 所以 meta 如按下了，再其他键清除所有「不会触发 keyup 的普通键」
      Array.from(keySet).forEach(
        (key) => !isControlKey(key) && keySet.delete(key)
      );
    }
    keySet.add(currentKey);
    const when: FingerShortcutEvent["detail"]["when"] = (keys, handler) => {
      if (isMatch(keySet, keys)) handler(event);
    };
    const keys = Array.from(keySet);
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
    // mac 上 meta 弹起时，event.metaKey 为 false，需要要 event.key 做兼容判断
    if (event.metaKey || event.key === "Meta") {
      // 在 Mac 上，在 meta 按下时，其他非控制键的 keyup 不会触发，
      // 所以 meta 弹起时，再其他键清楚所有不会触发 keyup 的普通键
      // 如果不清理有可能会在 set 遗留在 meta 按下时弹起的 key
      Array.from(set).forEach((key) => !isControlKey(key) && set.delete(key));
    }
  },
};
