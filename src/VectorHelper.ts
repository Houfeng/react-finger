/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-touch
 * @author Houfeng <admin@xhou.net>
 */

import { ITouchPoint } from "./ITouchPoint";

export function calcDistance(from: ITouchPoint, to: ITouchPoint) {
  const x = from.x - to.x;
  const y = from.y - to.y;
  return Math.sqrt(x * x + y * y);
}
