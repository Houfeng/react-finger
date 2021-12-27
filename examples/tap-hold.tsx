import { EventContext, gesture } from "../src";
import React, { useRef } from "react";

import ReactDOM from "react-dom";

const onTapHold = () => {
  console.log("onTapHold");
};

const onGesturePointerDown = (event: any) => {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

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
        <div onTapHold={onTapHold}>
          <button onPointerUp={onGesturePointerDown}>Inner</button>
          onTapHold
        </div>
      </EventContext.Provider>
    </div>
  )
});


const root = document.getElementById("root");
ReactDOM.render(<App />, root);
