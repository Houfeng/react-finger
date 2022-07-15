import { FingerProxy, FingerProxyContainer, useFingerEvents } from '../src';
import React, { CSSProperties } from "react"

import { createRoot } from "react-dom/client";

const FingerBoxWrapper = FingerProxyContainer("div");

const boxStyle: CSSProperties = {
  margin: 'auto',
  padding: 16,
  borderRadius: 8,
  width: 600,      
  height: 500,
  backgroundColor: '#fff',
  cursor: 'pointer'
};

export function App() {
  const events = useFingerEvents({
    onPinchStart: event => {
      console.log('onPinchStart', event);
    },
    // onPinch: event => {
    //   console.log('onPinch', event.detail);
    // }
  });
  return (
    <FingerBoxWrapper className='box' style={boxStyle} >
      <FingerProxy {...events} />
    </FingerBoxWrapper>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);  
     