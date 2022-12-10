/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import {
  FingerKeyboardEvent,
  FingerShortcutEvent,
} from "../core/FingerKeyboardEvents";

import { FingerProvider } from "../core/FingerProviders";
import { HostKeyboardEvent } from "../core/FingerHostEvents";

const KEY_SET = Symbol();
const LAST_ACTION = Symbol();

type ControlKey = "control" | "meta" | "shift" | "alt";
const controlKeys = ["control", "meta", "shift", "alt"];

function isControlKey(key: string) {
  return controlKeys.indexOf(key) > -1;
}

function isMatch(ks: Set<string>, keys: string[]) {
  return (
    ks &&
    keys &&
    keys.length === ks.size &&
    keys.every((key) => ks.has(key.toLowerCase()))
  );
}

function updateControlKey(ks: Set<string>, key: ControlKey, state: boolean) {
  return state ? ks.add(key) : ks.delete(key);
}

function updateControlKeys(ks: Set<string>, event: HostKeyboardEvent) {
  updateControlKey(ks, "control", event.ctrlKey);
  updateControlKey(ks, "meta", event.metaKey);
  updateControlKey(ks, "shift", event.shiftKey);
  updateControlKey(ks, "alt", event.altKey);
}

function useKeySet(flags: Map<symbol, unknown>) {
  const ks = flags.has(KEY_SET)
    ? (flags.get(KEY_SET) as Set<string>)
    : new Set<string>();
  if (!flags.has(KEY_SET)) flags.set(KEY_SET, ks);
  return ks;
}

function fixMacMetaKeyDown(ks: Set<string>, event: HostKeyboardEvent) {
  if (event.metaKey || event.key === "Meta") {
    // 在 Mac 上，在 meta 按下时，其他非控制键的 keyup 不会触发，
    // 所以 meta 如按下了，再其他键清除所有「不会触发 keyup 的普通键」
    Array.from(ks).forEach((it) => !isControlKey(it) && ks.delete(it));
  }
}

function fixMacMetaKeyUp(ks: Set<string>, event: HostKeyboardEvent) {
  // mac 上 meta 弹起时，event.metaKey 为 false，需要要 event.key 做兼容判断
  if (event.metaKey || event.key === "Meta") {
    // 在 Mac 上，在 meta 按下时，其他非控制键的 keyup 不会触发，
    // 所以 meta 弹起时，再其他键清楚所有不会触发 keyup 的普通键
    // 如果不清理有可能会在 set 遗留在 meta 按下时弹起的 key
    Array.from(ks).forEach((key) => !isControlKey(key) && ks.delete(key));
  }
}

export const FingerShortcutProvider: FingerProvider = {
  name: "Shortcut",
  events: ["onShortcut"],

  handleKeyDown: ({ events, context, event }) => {
    const { flags } = context;
    // +防止按下多键组合，逐个弹起时，触发多次不同的组合
    if (!event.repeat) flags.set(LAST_ACTION, "down");
    if (flags.get(LAST_ACTION) === "up") return;
    // -防止按下多键组合，逐个弹起时，触发多次不同的组合
    const ks = useKeySet(flags);
    fixMacMetaKeyDown(ks, event);
    updateControlKeys(ks, event);
    ks.add(event.key.toLowerCase());
    const when: FingerShortcutEvent["detail"]["when"] = (keys, handler) =>
      isMatch(ks, keys) && handler(event);
    const keys = Array.from(ks);
    const detail = { when, keys };
    const shortcutEvent = FingerKeyboardEvent("onShortcut", event, detail);
    events.onShortcut?.(shortcutEvent);
  },

  handleKeyUp: ({ context, event }) => {
    const { flags } = context;
    // +防止按下多键组合，逐个弹起时，触发多次不同的组合
    if (!flags.has(KEY_SET)) return;
    flags.set(LAST_ACTION, "up");
    // -防止按下多键组合，逐个弹起时，触发多次不同的组合
    const ks = useKeySet(flags);
    ks.delete(event.key.toLowerCase());
    fixMacMetaKeyUp(ks, event);
  },
};
