# React Finger

React Finger 是一个面向 React 且同时兼容 PC & Mobile 的手势事件库。

## 基本使用

```
npm install react-finger --save
```

在类组件中使用

```jsx

```

在函数组件中使用

```jsx

```

## 事件支持

React Finger 支持多种常用的手势事件，并且所有事件都自动兼容 PC & Mobile

事件 | 说明  
------- | -------  
onPointerDown  | 按下
onPointerMove  | 移动
onPointerUp | 弹起
onPointerCancel | 取消
onTap  | 快速点按 
onTapHold  | 长按超过 600ms  
onDoubleTap  | 快速连按 (300ms 内)  
onSwipe  | 任意滑动
onSwipeUp  | 向上滑动 
onSwipeRight  | 向右滑动 
onSwipeDown  | 向下滑动  
onSwipeLeft  | 向左滑动
onPinchStart  | 多指手势开始 (当前权支持两指缩放) 
onPinch  | 多指手势更新 (当前权支持两指缩放) 
onPinchEnd  | 多指手势结束 (当前权支持两指缩放) 