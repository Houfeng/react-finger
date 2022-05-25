import React from "react"
import { gesture } from '../src';
import { render } from "react-dom";

export const Demo = React.forwardRef((
  props: {}, ref: React.ForwardedRef<HTMLDivElement>
) => {
  return <div ref={ref}>{JSON.stringify(props)}</div>
})

const P = gesture(Demo);

export function App() {
  return (
    <div>
      <P
        onGesturePointerDown={() => console.log('onGesturePointerDown')}
        ref={ref => console.log('ref', ref)}
      >
        你好
      </P>
    </div>
  );
}

render(<App />, document.getElementById("root"));