import { EventContext, EventProxy, gesture } from "../src";
import React, { useRef } from "react";

import ReactDOM from "react-dom";

const root = document.getElementById("root");

const onDoubleTap1 = () => {
  console.log('onDoubleTap1');
}

const onDoubleTap2 = () => {
  console.log('onDoubleTap2');
}

const onDoubleTap3 = () => {
  console.log('onDoubleTap3');
}

const onDoubleTap4 = () => {
  console.log('onDoubleTap4');
}

const onTap1 = () => {
  console.log("onTap1");
}

const onTap2 = () => {
  console.log("onTap2");
}

const onTap3 = () => {
  console.log("onTap3");
}

const onTap4 = () => {
  console.log('onTap4')
}

const onPinchStart = () => {
  console.log('onPinchStart');
}

const onPinch = () => {
  console.log('onPinch');
}

const onPinchEnd = () => {
  console.log('onPinchEnd');
}

export const App = (function App() {
  const wrapperRef = useRef<HTMLDivElement>();
  return gesture(
    <div ref={wrapperRef} style={{
      width: 260,
      height: 200,
      margin: "auto",
      border: "8px solid #333",
      transitionDuration: ".3s",
      background: "#fff",
    }}>
      <EventContext.Provider value={wrapperRef} >
        <EventProxy x-gesture-key={1} onTap={onTap3} onDoubleTap={onDoubleTap3} />
        <EventProxy x-gesture-key={2} onTap={onTap4} onDoubleTap={onDoubleTap4}
          onGesturePointerDown={() => { }}
          onGesturePointerMove={() => { }}
          onGesturePointerUp={() => { }}
          onPinchStart={onPinchStart} onPinch={onPinch} onPinchEnd={onPinchEnd} />
        <div onTap={onTap1} onDoubleTap={onDoubleTap1}>onDoubleTap1</div>
        <div onTap={onTap2} onDoubleTap={onDoubleTap2}>onDoubleTap2</div>
      </EventContext.Provider>
    </div>
  )
});


ReactDOM.render(<App />, root);
