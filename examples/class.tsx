import React from "react";
import ReactDOM from "react-dom";
import { model } from "mota";
import { touch, ITouchEvent } from "../src";
// import "../src/HTMLAttributes";

const root = document.getElementById("root");
const data = { scale: 1 };

@model(data)
@touch
export class App extends React.Component {

  model: any;

  onTap = (event: ITouchEvent) => {
    console.log('onTap', event);
  }

  onScale = (event: ITouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.model.scale = event.scale;
  }

  render() {
    return <div style={{
      width: 260,
      height: 200,
      margin: "auto",
      border: "8px solid #333",
      transitionDuration: ".3s",
      transform: `scale(${this.model.scale}) translateZ(0)`
    }}
      onSwipeLeft={this.onTap}
      onScale={this.onScale}
      onTap={this.onTap}>
      {this.model.scale}
    </div>
  }
}


ReactDOM.render(<App />, root);
