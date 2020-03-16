import React from "react";
import ReactDOM from "react-dom";
import { model } from "mota";
import { touch, ITouchEvent } from "../src";
// import "../src/HTMLAttributes";

const root = document.getElementById("root");
const data = {};

@model(data)
@touch
export class App extends React.Component {

  onTap = (event: ITouchEvent) => {
    console.log('onTap', event);
  }

  render() {
    return <div style={{
      width: 300,
      height: 200,
      margin: "auto",
      border: "8px solid #333"
    }}
      //onPointMove={(event) => { console.log('onPointMove', event) }}
      onSwipeLeft={(event) => { console.log('onSwipeLeft', event) }}
      onSwipeRight={(event) => { console.log('onSwipeRight', event) }}
      onDoubleTap={(event) => { console.log('onDoubleTap', event) }}
      onTap={this.onTap}>
    </div>
  }
}


ReactDOM.render(<App />, root);
