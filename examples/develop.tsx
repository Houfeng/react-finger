import React, { CSSProperties } from "react"

import { composeGestureEvents } from '../src/GestureEvents';
import { createRoot } from "react-dom/client";

const boxStyle: CSSProperties = {
  margin: 'auto',
  padding: 16,
  borderRadius: 8,
  width: 300,
  height: 300,
  backgroundColor: '#fff'
}; 

const events = composeGestureEvents({
  onTap: event => {
    event.stopPropagation();
    event.preventDefault();
    console.log('onTap', event);
  }
});

export function App() { 
  return (
    <div style={boxStyle} {...events}>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);