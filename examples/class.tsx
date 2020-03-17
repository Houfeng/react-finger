import React from "react";
import ReactDOM from "react-dom";
import { model } from "mota";
import { touch, ITouchEvent } from "../src";
// import "../src/HTMLAttributes";

const root = document.getElementById("root");
const data = {
  originScale: 1,
  scale: 1,
};

@model(data)
@touch
export class App extends React.Component {

  model: any;

  onTap = (event: ITouchEvent) => {
    console.log('onTap', event);
  }

  onPinch = (event: ITouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.model.scale = this.model.originScale * event.scale;
  }

  onPinchEnd = () => {
    this.model.originScale = this.model.scale;
  }

  render() {
    const { originScale, scale } = this.model;
    return <div style={{
      width: 260,
      height: 200,
      margin: "auto",
      border: "8px solid #333",
      transitionDuration: ".3s",
      background: "#fff",
      transform: `scale(${scale}) translateZ(0)`
    }}
      onSwipeLeft={this.onTap}
      onPinch={this.onPinch}
      onPinchEnd={this.onPinchEnd}
      onTap={this.onTap}>
      <div>originScale: {originScale}</div>
      <div>scale: {scale}</div>
    </div>
  }
}


ReactDOM.render(<App />, root);
