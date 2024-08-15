# React 函数组件

## React 事件

### 事件绑定方式

  - `<button onclick="alert(123)">点我一下</button>`
  - `<button id="btn01">点我一下</button>`
  - `document.getElementById('btn01').onclick = function(){};`
  - `document.getElementById('btn01').addEventListener('click', function(){}, false);`

在React中事件需要通过元素的属性来设置。
  - 和原生JS不同，在React中事件的属性需要使用驼峰命名法：
    - `onclick -> onClick`
    - `onchange -> onChange`
  - 属性值不能直接执行代码，而是需要一个回调函数：
    - `onclick="alert(123)" -> onClick={()=>{alert(123)}}`


在React中，无法通过 **return false** 取消默认行为。

### 事件对象

事件对象
  - React事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象。
  - React中的事件对象同样不是原生的事件对象，是经过React包装后的事件对象。
  - 由于对象进行过包装，所以使用过程中我们无需再去考虑兼容性问题。

```js
const App = () => {

  const clickHandler = (event) => {
      event.preventDefault(); // 取消默认行为
      event.stopPropagation(); // 取消事件的冒泡

      alert('我是App中的clickHandler！');
  };
  return <div
      onClick={() => {
          alert('div');
      }}
      style={{width: 200, height: 200, margin: '100px auto', backgroundColor:'#bfa'}}>
      <button onClick={() => {
          alert(123);
      }}>点我一下
      </button>
      <button onClick={clickHandler}>哈哈</button>
      <br/>
      <a href="https://www.baidu.com" onClick={clickHandler}>超链接</a>
  </div>
};

// 导出App
export default App;
```

## React Prop

### Prop 简介
在 React 项目中，LogItem的数据是写死的。

如果将组件中的数据全部写死，将会导致组件无法动态设置，不具有使用价值。

我们希望组件数据可以由外部设置，在组件间，父组件可以通过props（属性）向子组件传递数据。


在函数组件中，属性就相当于是函数的参数，可以通过参数来访问。

可以在函数组件的形参中定义一个props，props指向的是一个对象。

它包含了父组件中传递的所有参数。

props 是只读的，不能修改。

### Prop 应用项目 

**src/App.js**

```js
import Logs from "./Components/Logs/Logs";
// 将组件粘合起来
const App = () => {
  return <div>
    <Logs date={new Date(2021, 7, 20, 19, 0)} LogDesc='React' LogTime='3天' />
    <Logs date={new Date(2021, 8, 20, 19, 0)} LogDesc='React1' LogTime='31天' />
  </div>
}

// 导出App
export default App;

```

**src/Components/Logs/Logs.js**

```js
import LogItem from "./LogItem/LogItem"
import './Logs.css'

// 日志容器
const Logs = (props) => {
  return <div className="logs">

    {/* 在父组件中为子组件设置属性 */}
    <LogItem date={props.date} LogDesc={props.LogDesc} LogTime={props.LogTime} />
  </div>
}

export default Logs
```

**src/Components/Logs/LogItem/LogItem.js**

```js
import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'

const LogItem = (props) => {
  // 在函数组件中，属性相当于函数的参数，可通过参数接受
  return (
    <div className='item'>
      <MyDate date={props.date}></MyDate>
      {/* 内容容器 */}
      <div className='content'>
        <h2 className='desc'>{props.LogDesc}</h2>
        <div className='time'>{props.LogTime}</div>
      </div>
    </div>
  )
}

export default LogItem

```

**src/Components/Logs/LogItem/MyDate/MyDate.js**

```js
import React from 'react'
import './MyDate.css'

const MyDate = (props) => {
  // 获取月份
  const month = props.date.toLocaleString('zh-CN', { month: 'long' });
  // 获取日期
  const date = props.date.getDate();
  return (

    <div>
      {/* 日期容器 */}
      <div className='date'>
        <div className='month'>{month}</div>
        <div className='day'>{date}</div>
      </div>
    </div>
  )
}

export default MyDate
```

### 整理项目目录

因 **src/App.js** 是入口文件，故应将其进行简化，同时对日志项的增加进行修改。


**src/App.js**
```js
import Logs from "./Components/Logs/Logs";

const App = () => {
  return <div>
    <Logs/>
  </div>
};

// 导出App
export default App;
```

**src/Components/Logs/Logs.js**

```js
/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';

const Logs = () => {

  // 模拟一组从服务器中加载的数据
  const logsData = [
    {
      id: '001',
      date: new Date(2021, 1, 20, 18, 30),
      desc: '学习九阳神功',
      time: 30
    },
    {
      id: '002',
      date: new Date(2022, 2, 10, 12, 30),
      desc: '学习降龙十八掌',
      time: 20
    },
    {
      id: '003',
      date: new Date(2022, 2, 11, 11, 30),
      desc: '学习JavaScript',
      time: 40
    },
    {
      id: '004',
      date: new Date(2022, 2, 15, 10, 30),
      desc: '学习React',
      time: 80
    }
  ];

  // 循环遍历数据，生成对应的item

  const logItemDate = logsData.map(itme => <LogItem key={itme.id} date={itme.date} LogDesc={itme.desc} LogTime={itme.time}></LogItem>)

  return <div className="logs">
    {
      logItemDate
      // logsData.map(item => <LogItem {...item}/> )
    }
  </div>
};

export default Logs;
```

## React 状态 State

### 引出问题

以加减计数器为例。

**src/App.js**

```js
import "./App.css";

const App = () => {
  let counter = 1;

  const addHandler = () => {
    counter++;
  };

  const lessHandler = () => {
    counter--;
  };
  return (
    <div className="app">
      <h1>{counter}</h1>
      <button onClick={addHandler}>+</button>
      <button onClick={lessHandler}>-</button>
    </div>
  );
};

// 导出App
export default App;
```

**src/App.css**

```css
.app {
  width: 300px;
  height: 300px;
  margin: 50px auto;
  background-color: #bfa;
  text-align: center;
}

.app button {
  width: 100px;
  font-size: 50px;
  margin: 0 20px;
}
```

此时在页面中点击按钮时，counter 的数据发生了改变，但是页面显示仍是初始值。

### 状态 State

在 React 中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染。要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染。这里我们就需要一个特殊变量，当这个变量被修改使，组件会自动重新渲染。

state 相当于一个变量，只是这个变量在 React 中进行了注册。React 会监控这个变量的变化，当 state 发生变化时，会自动触发组件的重新渲染，使得我们的修改可以在页面中呈现出来。

在函数组件中，我们需要通过钩子函数，获取 state，使用钩子 **useState()** 来创建 state。

它需要一个值作为参数，这个值就是 state 的初始值。

- 该函数会返回一个数组。
  - 数组中第一个元素，是初始值。
    - 初始值只用来显示数据，直接修改不会触发组件的重新渲染。
  - 数组中的第二个元素，是一个函数，通常会命名为 setXxx。
    - 这个函数用来修改 state，调用其修改 state 后会触发组件的重新渲染，并且使用函数中的值作为新的 state 值。

**src/App.js**

```js
import "./App.css";
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(1);

  const addHandler = () => {
    setCounter(counter + 1);
  };

  const lessHandler = () => {
    setCounter(counter - 1);
  };

  return (
    <div className="app">
      <h1>{counter}</h1>
      <button onClick={addHandler}>+</button>
      <button onClick={lessHandler}>-</button>
    </div>
  );
};

// 导出App
export default App;
```

### State 注意

- state实际就是一个被React管理的变量，当通过 **setState()** 修改变量的值时，会触发组件的自动重新渲染。
- 只有state值发生变化时，组件才会重新渲染。
- 当state的值是对象时，会使用新的对象替换旧的对象，`const [user, setUser] = useState({name: 's', age: '19'})` -> `setUser({name: 'ww'})` ， 修改后的user会只有name属性。正确修改：`setUser({...user, name: 'ww'})`。
- 当通过 **setState()** 去修改一个state时，并不表示修改当前的state,它修改的是组件下一次渲染时state值。
- **setState()** 会触发组件的重新渲染，它是异步的，当调用 **setState()** 需要用到旧的state的值时，要注意；有可能会出现计算错误的情况；为了避免，可通过为 **setState()** 传递回调函数的形式修改state。


此时情况仍然存在。

```js
  const addHandler = () => {
    // setCounter(counter + 1)
    setTimeout(()=>{
      setCounter(()=>{
        // setState 中回调函数的返回值，会成为新的state
        return counter + 1
      })
    },1000)
  }
```
setState 中回调函数执行时，React会将最新的state作为参数传递。

```js
  const addHandler = () => {
    // setCounter(counter + 1)

    setTimeout(()=>{
      // setCounter((prevCounter)=>{
      //   // setState 中回调函数的返回值，会成为新的state
      //   // 回调函数执行时，React会将最新的state作为参数传递
      //   return prevCounter + 1
      // })
      setCounter(prevCounter => prevCounter + 1)
    },1000)
  }
```

## React Ref dom

获取原生的DOM对象
  1. 可以使用传统的document来对DOM进行操作。
  2. 直接从React处获取DOM对象。

    步骤：
      1. 创建一个存储DOM对象的容器；
          - 使用 **useRef()** 钩子函数；
            - 钩子函数的注意事项：；
                - React中的钩子函数只能用于函数组件或自定义钩子；
                - 钩子函数只能直接在函数组件中调用；
      2. 将容器设置为想要获取DOM对象元素的ref属性 `<h1 ref={xxx}>....</h1>`；
          - React会自动将当前元素的DOM对象，设置为容器current属性；

```js
import './App.css';
import { useRef, useState } from "react";

const App = () => {
  console.log('组件被渲染了');

  // 创建一个容器
  const h1Ref = useRef();
  const CliclH = () => {
    h1Ref.current.innerHTML = '111111'
    console.log(h1Ref.current);
  }


  return <div className='app' ref={h1Ref}>
    <h1>222222222</h1>
    <button onClick={CliclH}>1</button>
    <button>2</button>
  </div>
};

// 导出App
export default App;
```

**useRef()**
  - 返回的就是一个普通的JS对象 `{current:undefined}`。
  - 所以我们直接创建一个js对象，也可以代替 **useRef()** 。
  - 区别：
    - 我们创建的对象，组件每次重新渲染都会创建一个新对象；
    - **useRef()** 创建的对象，可以确保每次渲染获取到的都是同一个对象；
  - 当你需要一个对象不会因为组件的重新渲染而改变时，就可以使用**useRef()**。


