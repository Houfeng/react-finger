import { GestureProvider } from "../core/GestureProviders";

export const GesturePinchProvider: GestureProvider = {
  handlePointerDown: function (events, context, pointer) {
    console.log("Pinch.handlePointerDown", events, context, pointer);
  },
  handlePointerMove: function (events, context, pointer) {
    console.log("Pinch.handlePointerMove", events, context, pointer);
  },
  handlePointerUp: function (events, context, pointer) {
    console.log("Pinch.handlePointerUp", events, context, pointer);
  },
  handlePointerCancel: function (events, context, pointer) {
    console.log("Pinch.handlePointerCancel", events, context, pointer);
  },
};
