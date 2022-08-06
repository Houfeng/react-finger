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

export const FingerShortcutProvider: FingerProvider = {
  name: "Shortcut",
  events: ["onShortcut"],

  handleKeyDown: ({ events, context, event }) => {
    const { flags } = context;
    const keySet = flags.has(KEY_SET)
      ? (flags.get(KEY_SET) as Set<string>)
      : new Set<string>();
    if (!flags.has(KEY_SET)) flags.set(KEY_SET, keySet);
    keySet.add(event.key.toLowerCase());
    const when: FingerShortcutEvent["detail"]["when"] = (keys, handler) => {
      if (!keys.every((key) => keySet.has(key))) return;
      handler();
      flags.delete(KEY_SET);
    };
    const shortcutEvent = FingerKeyboardEvent("onShortcut", event, { when });
    events.onShortcut?.(shortcutEvent);
  },

  handleKeyUp: ({ context, event }) => {
    const { flags } = context;
    if (!flags.has(KEY_SET)) return;
    (flags.get(KEY_SET) as Set<string>).delete(event.key.toLowerCase());
  },
};
