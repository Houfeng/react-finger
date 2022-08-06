/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerKeyboardEvent } from "../core/FingerKeyboardEvents";
import { FingerProvider } from "../core/FingerProviders";

export const keys = {
  ctrl: 1,
  alt: 2,
  options: 4,
  command: 8,
  shift: 16,
}

export const FingerShortcutProvider: FingerProvider = {
  name: "Shortcut",
  events: ["onShortcut"],

  handleKeyDown: ({ events, event }) => {
    const shortcutEvent = FingerKeyboardEvent("onShortcut", event, {});
    events.onShortcut?.(shortcutEvent);
  },
};
