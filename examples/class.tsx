import { EventContext, EventProxy, GestureEvent, gesture } from "../src";
import React, { createRef } from "react";

import ReactDOM from "react-dom";
import { model } from "mota";
import styled from "styled-components";

const Block = styled.div`
  background: red;
`;

console.log(React.createElement(Block));
console.log(console.log(React.createElement(React.forwardRef(() => {
  return <h1></h1>
}))))

const root = document.getElementById("root");
const data = {
  originX: 0,
  originY: 0,
  originScale: 1,
  x: 0,
  y: 0,
  scale: 1,
};

@model(data)
@gesture
export class App extends React.Component {

  model: any;

  onTap = (event: GestureEvent) => {
    console.log('onTap', event);
  }

  onPinch = (event: GestureEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.model.scale = this.model.originScale * event.scale;
    this.model.x = this.model.originX + event.moveX;
    this.model.y = this.model.originY + event.moveY;
  }

  onPinchEnd = () => {
    this.model.originScale = this.model.scale;
    this.model.originX = this.model.x;
    this.model.originY = this.model.y;
  }

  onDocTap = (event: any) => {
    console.log('onDocTap', event);
  }

  onDocTap1 = () => {
    console.log('onDocTap1');
  }

  onSwipe = (event: GestureEvent) => {
    console.log("swipe", event.direction);
  }

  onPointDown = (event: GestureEvent) => {
    console.log("onPointDown", event);
  }

  onGesturePointerMove = (event: GestureEvent) => {
    console.log('onGesturePointerMove', event.moveX, event.moveY);
  }

  boxRef = createRef<HTMLDivElement>();

  render() {
    const { originScale, scale, x, y } = this.model;
    return <EventContext.Provider value={this.boxRef}>
      <div ref={this.boxRef} style={{
        width: 260,
        height: 200,
        margin: "auto",
        border: "8px solid #333",
        //transitionDuration: ".3s",
        background: "#fff",
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      }}>
        <div>originScale: {originScale}</div>
        <div>scale: {scale}</div>
        <div>x: {x}, y: {y}</div>
        <div onTap={event => console.log("tap", event)}>tap</div>
        {/* <EventProxy onDoubleTap={this.onDocTap} /> */}
        <EventProxy
          onGesturePointerMove={this.onGesturePointerMove}
          onPinch={this.onPinch}
          onPinchEnd={this.onPinchEnd}
          onSwipe={this.onSwipe}
          onDoubleTap={this.onDocTap}
        />
      </div>
    </EventContext.Provider>
  }
}


ReactDOM.render(<App />, root);
