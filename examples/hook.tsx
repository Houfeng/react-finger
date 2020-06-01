import React from "react";
import ReactDOM from "react-dom";
import { gesture } from "../src";

const root = document.getElementById("root");
export const App = gesture(function App() {
  const onTap = () => {
    console.log('onTap');
  }
  return <div style={{
    width: 260,
    height: 200,
    margin: "auto",
    border: "8px solid #333",
    transitionDuration: ".3s",
    background: "#fff",
  }}
    onSwipeLeft={() => { console.log('onSwipeLeft') }}
    onSwipeRight={() => { console.log('onSwipeRight') }}
    onDoubleTap={() => { console.log('onDoubleTap') }}
    onTap={onTap}>
  </div>
});


ReactDOM.render(<App />, root);
