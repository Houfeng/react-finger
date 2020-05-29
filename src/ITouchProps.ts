/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-touch
 * @author Houfeng <admin@xhou.net>
 */

import { ITouchHandler } from "./ITouchHandler";

export interface ITouchProps {
  [name: string]: ITouchHandler;
}
