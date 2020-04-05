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

  onDocTap = () => {
    console.log('onDocTap');
  }

  onPointDown = (event: ITouchEvent) => {
    console.log("onPointDown", event);
    debugger;
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
      <EventProxy
        onPointDown={this.onPointDown}
        onPinch={this.onPinch}
        onPinchEnd={this.onPinchEnd} />
      <EventProxy onDoubleTap={this.onDocTap} />
      <EventProxy onDoubleTap={this.onDocTap} />
      <Block onTap={() => console.log("test")} >测试</Block>
    </div>
  }
}


ReactDOM.render(<App />, root);
