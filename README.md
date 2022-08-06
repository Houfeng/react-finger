<h1 align="center">
  <br/>
  <img src="https://houfeng.net/react-finger/logo.png" alt="React Finger">
</h1>

React Finger is a library of gesture/shortcuts events for React that allows developers to use a single set of events for both desktop and mobile devices.

# Install

```
npm install react-finger --save
```

# Events

**Gesture Events**  
- **onTap**: Quickly tap the mouse or touch point
- **onTapHold**: Hold for more than 600ms
- **onDoubleTap**: Quick tap twice (within 300ms)
- **onSwipe**: Swipe freely
- **onSwipeUp**: Swipe up
- **onSwipeRight**: Swipe right
- **onSwipeDown**: Swipes down
- **onSwipeLeft**: Swipe left
- **onPinchStart**: Multi-finger gesture start (supports two-finger scale/move/rotate)
- **onPinch**: Multi-finger gesture update (supports two-finger scale/move/rotate)
- **onPinchEnd**: Multi-finger gesture end (supports two-finger scale/move/rotate)
  
**Basic Events**  
- **onFingerDown**: Press the mouse or touch point
- **onFingerMove**: Press & Moves the mouse or touch point
- **onFingerUp**: Bounce the mouse or touch point
- **onFingerCancel**: Cancels the mouse or touch point
  
**Shortcuts Events**  
- **onShortcut**: When the shortcut key is pressed
  
**Host Events**  
- **onPointerDown**: Press the mouse or touch point
- **onPointerMove**: Moves the mouse or touch point
- **onPointerUp**: Bounce the mouse or touch point
- **onPointerCancel**: Cancels the mouse or touch point
- **onKeyDown**: When the keyboard is pressed
- **onKeyUp**: When the keyboard comes up
  
# Usage

**Example 1:** Hello React Finger

```jsx
import { Finger } from "react-finger";

const FingeredDiv = Finger("div");

function Demo(){
  return (
    <FingeredDiv 
      onTap = { event=>console.log('onTap',event) }
      onSwipe = { event=>console.log('onSwipe',event.direction) }
    > 
      Something...
    </FingeredDiv>
  );
}
```

**Example 2:** Using useFingerEvents

```jsx
import { useFingerEvents } from "react-finger";

function Demo(){
  const events = useFingerEvents({
    onTap: event=>console.log('onTap',event),
    onSwipe: event=>console.log('onSwipe',event.direction),
  });
  return (
    <div {...events}> Something... </div>
  );
}
```

**Example 3:** Using createFingerEvents

```jsx
import { createFingerEvents } from "react-finger";

class Demo extends Component {
  events = createFingerEvents({
    onTap: event=>console.log('onTap',event),
    onSwipe: event=>console.log('onSwipe',event.direction),
  });
  render() {
    return (
      <div {...this.events}> Something... </div>
    );
  }
}
```

**Example 4:** Bound to the Document

```jsx
import { FingerProxy } from "react-finger";

function Demo(){
  return (
    <FingerProxy 
      onTap = { event=>console.log('Tap on the document',event) }
    />
  );
}
```

**Example 5:** Bound to the Boundary

```jsx
import { FingerProxy, FingerProxyContainer } from "react-finger";

const YourBoundaryWrapper = FingerProxyContainer("div");

function Demo(){
  return (
    <YourBoundaryWrapper>
      Something...
      <FingerProxy 
        onTap = { event=>console.log('Tap on the Boundary',event) }
      />
      Something...
    </YourBoundaryWrapper>
  );
}
```

**Example 6:** Binding shortcut keys

```jsx
import { FingerProxy, FingerProxyContainer } from "react-finger";

const FingeredDiv = Finger("div");

function Demo(){
  return (
    <FingeredDiv 
      onShortcut = { event => {
        event.when(['control','shift','a'], ()=>{
          // Something...
        });
        event.when(['control','shift','b'], ()=>{
          // Something...
        });
      }}
    />
  );
}
```