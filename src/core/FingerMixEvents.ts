/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerKeyboardEvents } from "./FingerKeyboardEvents";
import { FingerPointerEvents } from "./FingerPointerEvents";
import { HostEvents } from "./FingerHostEvents";

export type FingerMixEvents<T extends Element = Element> = HostEvents<T> &
  FingerPointerEvents<T> &
  FingerKeyboardEvents;
