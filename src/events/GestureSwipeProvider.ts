import { GestureProvider } from "../core/GestureProviders";

export const GestureSwipeProvider: GestureProvider = {
  handlePointerDown: function (events, context, pointer) {
    console.log("Swipe.handlePointerDown", events, context, pointer);
  },
  handlePointerMove: function (events, context, pointer) {
    console.log("Swipe.handlePointerMove", events, context, pointer);
  },
  handlePointerUp: function (events, context, pointer) {
    console.log("Swipe.handlePointerUp", events, context, pointer);
  },
  handlePointerCancel: function (events, context, pointer) {
    console.log("Swipe.handlePointerCancel", events, context, pointer);
  },
};
