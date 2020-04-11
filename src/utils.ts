export const eventTypes = {
  touch: "ontouchmove" in document,
  pointer: !!window.PointerEvent,
  mouse: "onmousemove" in document
};

export function isMobile() {
  return (
    /(Mobile|iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ||
    (navigator.platform.indexOf("Mac") > -1 && eventTypes.touch)
  );
}

export function isDesktop() {
  return !isMobile();
}
