export const SUPPORT_TOUCH = "ontouchstart" in document;
export const START_EVENT_NAME = SUPPORT_TOUCH ? "onTouchStart" : "onMouseDown";
export const MOVE_EVENT_NAME = SUPPORT_TOUCH ? "onTouchMove" : "onMouseMove";
export const END_EVENT_NAME = SUPPORT_TOUCH ? "onTouchEnd" : "onMouseUp";
