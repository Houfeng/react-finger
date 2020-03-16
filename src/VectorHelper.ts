import { ITouchPoint } from "./ITouchPoint";

export function calcDistance(from: ITouchPoint, to: ITouchPoint) {
  const x = from.x - to.x;
  const y = from.y - to.y;
  return Math.sqrt(x * x + y * y);
}
