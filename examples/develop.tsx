import { GestureProxy, GestureProxyContainer, Gestured, useGestureEvents } from '../src';
import React, { CSSProperties, useState } from "react"

import { createRoot } from "react-dom/client";

const GesturedDiv = Gestured("div");
const GestureWrapper = GestureProxyContainer("div");

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
    <GestureWrapper className='box' style={boxStyle} >
      <GestureProxy {...events} />
      <button onClick={() => setDirection('xx')}>
        click
      </button>
      {direction}
      <GesturedDiv
        onTap={event => { event.stopPropagation() }}
        onSwipe={event => {
          event.stopPropagation();
          console.log('event.direction', event.direction);
        }}
      >
        xxx
      </GesturedDiv>
    </GestureWrapper>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);  