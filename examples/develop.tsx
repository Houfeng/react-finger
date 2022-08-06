import { Finger, FingerProxy, FingerProxyContainer } from '../src';
import React, { CSSProperties } from "react"

import { FingerShortcutEvent } from '../src';
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

const onShortcut = (event: FingerShortcutEvent) => {
  event.when(["f", "a"], () => {
    console.log('FingerProxy onShortcut', event);
  }); 
};
 
export function App() {

  return (
    <FingerBoxWrapper className='box' style={boxStyle} tabIndex={0}>
      <FingerProxy onShortcut={onShortcut} />
      <FingeredDiv onTap={(event) => console.log('onTap', event)}>
        Tap me
      </FingeredDiv >
    </FingerBoxWrapper>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
