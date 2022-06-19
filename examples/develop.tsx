import { GestureProxy, useGestureEvents } from '../src';
import React, { CSSProperties, useState } from "react"

import { createRoot } from "react-dom/client";

const boxStyle: CSSProperties = {
  margin: 'auto',
  padding: 16,
  borderRadius: 8,
  width: 300,
  height: 300,
  backgroundColor: '#fff',
  cursor: 'pointer'
};

let prevEvents: any;

export function App() {
  const [direction, setDirection] = useState('none');
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
      setDirection(event.direction);
    },     
    onSwipeLeft: event => {
      console.log('onSwipeLeft', event.direction, event);
    }
  });
  if (!prevEvents) prevEvents = events;
  return (
    <div style={boxStyle} {...events} >
      <GestureProxy />
      <button onClick={() => setDirection('xx')}>
        click
      </button>
      {direction}
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);  