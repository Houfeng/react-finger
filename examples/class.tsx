import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { model } from "mota";
import { touch, ITouchEvent, EventProxy } from "../src";

const Block = styled.div`
  background: red;
`;

console.log(React.createElement(Block));
console.log(console.log(React.createElement(React.forwardRef(() => {
  return <h1></h1>
}))))

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

  onDocTap = (event: any) => {
    console.log('onDocTap', event);
  }

  onDocTap1 = () => {
    console.log('onDocTap1');
  }

  onPointDown = (event: ITouchEvent) => {
    console.log("onPointDown", event);
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
    }}>
      <div>originScale: {originScale}</div>
      <div>scale: {scale}</div>
      <div onTap={event => console.log("tap", event)}>tap</div>
      {/* <EventProxy onDoubleTap={this.onDocTap} /> */}
      <EventProxy onDoubleTap={this.onDocTap} />
    </div>
  }
}


ReactDOM.render(<App />, root);
