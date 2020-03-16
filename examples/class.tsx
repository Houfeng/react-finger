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
    this.model.scale = event.scale;
    console.log('onScale', event.scale);
  }

  render() {
    return <div style={{
      width: 300,
      height: 400,
      margin: "auto",
      border: "8px solid #333",
      transform: `scale(${this.model.scale})`
    }}
      onScale={this.onScale}
      onTap={this.onTap}>
    </div>
  }
}


ReactDOM.render(<App />, root);
