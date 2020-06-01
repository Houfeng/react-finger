/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

export interface GesturePoint {
  id?: string;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  timeStamp: number;
}
