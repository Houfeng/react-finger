import { Finger, FingerProxy, FingerProxyContainer, useFingerEvents } from '../src';
import React, { CSSProperties } from "react"

import { createRoot } from "react-dom/client";

const FingerBoxWrapper = FingerProxyContainer("div");
const FingeredDiv = Finger('div');

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
      <FingeredDiv onTap={(event) => console.log('onTap', event)}>
        Tap me
      </FingeredDiv> 
    </FingerBoxWrapper>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
