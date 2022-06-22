import { Finger, FingerProxy, FingerProxyContainer, useFingerEvents } from '../src';
import React, { CSSProperties, useState } from "react"

import { createRoot } from "react-dom/client";

const FingerDiv = Finger("div");
const FingerBoxWrapper = FingerProxyContainer("div");

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
  const events = useFingerEvents({ 
    // onPointerDown: event => {
    //   console.log('onPointerDown', event);
    // },  
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
    <FingerBoxWrapper className='box' style={boxStyle} >
      <FingerProxy {...events} />
      <button onClick={() => setDirection('xx')}>
        click
      </button>
      {direction}
      <FingerDiv
        onTap={event => { event.stopPropagation() }}
        onSwipe={event => {
          event.stopPropagation();
          console.log('event.direction', event.direction);
        }}
      >
        xxx
      </FingerDiv>
    </FingerBoxWrapper>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);  