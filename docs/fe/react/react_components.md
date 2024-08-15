# React 组件

## React 组件简介

在React中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。

React中定义组件的方式有两种:基于函数的组件和基于类的组件。


## 基于函数的组件

基于函数的组件其实就是一个会返回JSX(React元素)的普通的JS函数。
  - 函数组件就是一个返回JSX的普通。
  - 组件的首字母必须是大写。

函数返回 js。

**index.js**

```js
import ReactDOM from 'react-dom/client';
import App from './App'

// function App(){
//   return <div>helloooooo</div>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));

//  React组件可通过JSX渲染
root.render(<App/>)
```

**App.js**

```js
const App = () => {
  return <div>我是App组件！</div>
};

// 导出App
export default App;
```

## 类组件

类组件添加render() 方法，返回值是js。

修改 **App.js**

```js
import React from "react";
// 类组件继承Component，
class App extends React.Component {
  render() {
    return <div>类组件</div>;
  }
}
// 导出App
export default App;
```

## 组件修改练习

将 React 项目目录下的项目进行组件化修改。

 ```
 根目录
  - public
    - index.html (添加标签 <div id='root'></div>)
  - src
    - Components // 组件
      - Logs // 日志容器
        - LogItem // 日志项容器
          - MyDate // 日期的容器
            - MyDate.css
            - MyDate.js
          - LogItem.css
          - LogItem.js
        - Logs.css
        - Logs.js
    - App.js
    - index.js
    - index.css
 ```

**src/index.js**

```js
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css'

// function App(){
//   return <div>helloooooo</div>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));

//  React组件可通过JSX渲染
root.render(<App/>)
```

**src/App.js**

```js
import Logs from "./Components/Logs/Logs";
// 将组件粘合起来
const App = () => {
  return <div>
    <Logs/>
  </div>
}

// 导出App
export default App;
```

**src/index.css**

```css
*{
  box-sizing: border-box;
}

body {
  background-color: #bfbfbf;
  margin: 0;
}
```

**src/Components/Logs/Logs.js**

```js
import LogItem from "./LogItem/LogItem"
import './Logs.css'

// 日志容器
const Logs = () => {
  return <div className="logs">
    <LogItem/>
  </div>
}
export default Logs
```

**src/Components/Logs/Logs.css**

```css
/* 外层容器样式 */
.logs{
  background-color: #eae2b7;
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, .2); /*  阴影 */
}
```

**src/Components/Logs/LogItem/LogItem.js**

```js
import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'

const LogItem = () => {
  return (
    <div className='item'>
      <MyDate></MyDate>
      {/* 内容容器 */}
      <div className='content'>
        <h2 className='desc'>学习React</h2>
        <div className='time'>100分钟</div>
      </div>
    </div>
  )
}

export default LogItem
```

**src/Components/Logs/LogItem/LogItem.css**

```css
/* 设置item */
.item{
  background-color: #FCBF49;
  display: flex;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, .2); /*  阴影 */
  margin: 16px 0;
  padding: 4px;
}

/* 设置内容样式 */
.content{
  flex: auto;
  text-align: center;
  font-weight: bold;
}

.time{
  color: red;
}
```
**src/Components/Logs/LogItem/MyDate/MyDate.js**

```js
import React from 'react'
import './MyDate.css'

const MyDate = () => {
  return (
    <div>
      {/* 日期容器 */}
      <div className='date'>
        <div className='month'>三月</div>
        <div className='day'>13</div>
      </div>
    </div>
  )
}
export default MyDate
```
**src/Components/Logs/LogItem/MyDate/MyDate.css**

```css
.date{
  width: 90px;
  background-color: white;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
}

.month{
  height: 30px;
  line-height: 30px;
  background-color: red;

}

.day{
  height: 60px;
  line-height: 60px;
  font-size: 40px;
}
```









