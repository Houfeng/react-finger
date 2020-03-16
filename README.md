# Mota Touch

Mota Touch 基于 Mota 同时兼容 PC & Mobile 的事件扩展，让基于 React + Mota 的移动应用
开发变得更加便捷。

## 基本使用

安装所需依赖，如果已经安装了 react、react-dom、mota，可单独安装 mota-touch，
注意 Mota 版本需要是 `>=4.0.0`

```
npm install react react-dom mota mota-touch --save
```

在类组件中使用

```jsx
import React from 'react';
import { model } from 'mota';
import { touch } from 'mota-touch';

@model(YourModel)
@touch
export class App extends React.Component {

  onTap = (event)=>{
    console.log('onTap', event);
  };

  render(){
    return <div onTap={this.onTap}></div>
  }

}

```

在函数组件中使用

```jsx
import React from 'react';
import { model } from 'mota';
import { touch } from 'mota-touch';

const App = touch(()=>{
  const onTap = ()=>{
    console.log('onTap', event);
  }
  return <div onTap={this.onTap}></div>
});

```

## 事件支持

Mota Touch 支持多种常用的手势事件，并且所有事件都自动兼容 PC & Mobile

```ts
  "onTap",
  "onTapHold",
  "onDoubleTap",
  "onSwipe",
  "onSwipeUp",
  "onSwipeRight",
  "onSwipeDown",
  "onSwipeLeft",
  "onPointDown",
  "onPointMove",
  "onPointUp"
```