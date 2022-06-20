# React Finger

React Finger is a library of gesture events for React that allows developers to use a single set of events for both desktop and mobile devices.

# Install

```
npm install react-finger --save
```

# Events

```bash
onPointerDown: 按下
onPointerMove:  移动
onPointerUp: 弹起
onPointerCancel: 取消
onTap: 快速点按 
onTapHold: 长按超过 600ms  
onDoubleTap: 快速连按 (300ms 内)  
onSwipe: 任意滑动
onSwipeUp: 向上滑动 
onSwipeRight: 向右滑动 
onSwipeDown: 向下滑动  
onSwipeLeft: 向左滑动
onPinchStart: 多指手势开始 (当前权支持两指缩放) 
onPinch: 多指手势更新 (当前权支持两指缩放) 
onPinchEnd: 多指手势结束 (当前权支持两指缩放) 
```

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