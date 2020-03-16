import { ITouchPoint } from "./ITouchPoint";

export function calcDistance(from: ITouchPoint, to: ITouchPoint) {
  const x = to.x - from.x;
  const y = to.y - from.y;
  return Math.sqrt(x * x + y * y);
}
