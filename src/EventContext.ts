/**
 * Copyright (c) 2015-present Houfeng
 * @homepage https://github.com/Houfeng/mota-gesture
 * @author Houfeng <admin@xhou.net>
 */

import { EventProxyTarget } from "./EventProxyTarget";
import { createContext } from "react";

export const EventContext = createContext<EventProxyTarget>(document);
