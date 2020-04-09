import { SUPPORT_TOUCH } from "./Constants";

export function isMobile() {
  return (
    /(Mobile|iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ||
    (navigator.platform.indexOf("Mac") > -1 && SUPPORT_TOUCH)
  );
}

export function isDesktop() {
  return !isMobile();
}
