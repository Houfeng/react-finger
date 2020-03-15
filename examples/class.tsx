import React from "react";
import ReactDOM from "react-dom";
import { model } from "mota";
import { touch } from "../src";
// import "../src/HTMLAttributes";

const root = document.getElementById("root");
const data = {};

@model(data)
@touch
export class App extends React.Component {

  onTap = () => {
    console.log('onTap');
  }

  render() {
    return <div style={{
      width: 300,
      height: 200,
      margin: "auto",
      border: "8px solid #333"
    }}
      onSwipeLeft={() => { console.log('onSwipeLeft') }}
      onSwipeRight={() => { console.log('onSwipeRight') }}
      onDoubleTap={() => { console.log('onDoubleTap') }}
      onTap={this.onTap}>
    </div>
  }
}


ReactDOM.render(<App />, root);
