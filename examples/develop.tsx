import { GestureProxy, useGestureEvents } from '../src';
import React, { CSSProperties } from "react"

import { createRoot } from "react-dom/client";

const boxStyle: CSSProperties = {
  margin: 'auto',
  padding: 16,
  borderRadius: 8,
  width: 300,
  height: 300,
  backgroundColor: '#fff'
};

export function App() {
  const events = useGestureEvents({
    onPointerDown: event => {
      console.log('onPointerDown', event);
    },
    onTap: event => {
      console.log('onTap', event);
    },
    onTapHold: event => {
      console.log('onTapHold', event);
    },
    onDoubleTap: event => {
      console.log('onDoubleTap', event);
    },
    onSwipe: event => {
      console.log('onSwipe', event.direction, event);
    },
    onSwipeLeft: event => {
      console.log('onSwipeLeft', event.direction, event);
    }
  });
  return (
    <div style={boxStyle}{...events} >
      <GestureProxy />
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);  