import React from "react";
import ReactDOM from "react-dom";
import { model } from "mota";
import { touch, ITouchEvent } from "../src";
// import "../src/HTMLAttributes";
import { EventProxy } from '../src/EventProxy';

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

  onDocTap = () => {
    console.log('onDocTap');
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
      onTap={this.onTap}>
      <div>originScale: {originScale}</div>
      <div>scale: {scale}</div>
      <EventProxy key="0"
        onPinch={this.onPinch}
        onPinchEnd={this.onPinchEnd} />
      <EventProxy key="1" onDoubleTap={this.onDocTap} />
      <EventProxy key="2" onDoubleTap={this.onDocTap} />
    </div>
  }
}


ReactDOM.render(<App />, root);
