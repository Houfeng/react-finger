/**
 * @homepage https://github.com/Houfeng/react-finger
 * @author Houfeng <houzhanfeng@gmail.com>
 */

import { FingerKeyboardEvents } from "./FingerKeyboardEvents";
import { FingerPointerEvents } from "./FingerPointerEvents";
import { HostElement, HostEvents } from "./FingerHostEvents";

export type FingerMixEvents<T extends HostElement = HostElement> =
  HostEvents<T> & FingerPointerEvents<T> & FingerKeyboardEvents<T>;
