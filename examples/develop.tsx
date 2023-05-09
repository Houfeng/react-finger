import { Finger, FingerProxy, FingerProxyContainer, HostPointerEvent } from '../src';
import React, { CSSProperties } from "react"

import { FingerShortcutEvent } from '../src';
import { createRoot } from "react-dom/client";
// import styled from 'styled-components'; 

export const FingerBoxWrapper = FingerProxyContainer("div");
export const FingeredDiv = (Finger('div'));

export const boxStyle: CSSProperties = {
  margin: 'auto',
  padding: 16,
  borderRadius: 8,
  width: 600,
  height: 500,
  backgroundColor: '#fff',
  cursor: 'pointer',
};

export const onShortcut = (event: FingerShortcutEvent) => {
  //event.preventDefault();
  console.log('onShortcut', event.keys);
  event.when(["meta", "c"], () => {
    console.log('FingerProxy onShortcut', event);
  });
  event.when(["meta", "v"], () => {
    console.log('FingerProxy onShortcut', event);
  });
};

function onPointerDown(event: HostPointerEvent) {
  console.log('event', event);
}

export function App() {
  return (
    <FingerBoxWrapper className='box' style={boxStyle} tabIndex={0}>
      <FingerProxy onShortcut={onShortcut} />
      <FingeredDiv
        onTapHold={(event) => console.log('onTapHold', event)}
        onDoubleTap={event => console.log('onDoubleTap', event)}
        onPointerDown={onPointerDown}
      >
        Tap me
      </FingeredDiv >
      <div>123</div>
    </FingerBoxWrapper>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
