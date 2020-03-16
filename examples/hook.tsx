import React from "react";
import ReactDOM from "react-dom";
import { touch } from "../src";

const root = document.getElementById("root");
export const App = touch(function App() {
  const onTap = () => {
    console.log('onTap');
  }
  return <div style={{
    width: 300,
    height: 200,
    margin: "auto",
    border: "8px solid #333"
  }}
    onSwipeLeft={() => { console.log('onSwipeLeft') }}
    onSwipeRight={() => { console.log('onSwipeRight') }}
    onDoubleTap={() => { console.log('onDoubleTap') }}
    onTap={onTap}>
  </div>
}, {});


ReactDOM.render(<App />, root);
