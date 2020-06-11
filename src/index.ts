/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import "./HTMLAttributes";

export * from "./GestureCalcInfo";
export * from "./GestureHandler";
export * from "./GesturePoint";
export * from "./GestureProps";
export * from "./Gesture";
export * from "./GestureEvents";
export * from "./GestureOptions";
export * from "./GestureContext";
export * from "./GestureUtils";
export * from "./GestureType";
export * from "./EventProxy";
export * from "./EventBinding";

(document => {
  // fix: ios 10+
  document.addEventListener("gesturestart", event => event.preventDefault());
  // for PointerEvents
  const id = "mota-gesture-style";
  if (document.head && !document.getElementById(id)) {
    const style = document.createElement("style");
    style.setAttribute("id", id);
    style.textContent = `*{touch-action:none;}`;
    document.head.appendChild(style);
  }
})(document);
