# Hooks-useReducer

当状态更新逻辑较为复杂时，可考虑使用 useReducer。 useReducer 可同时更新多个状态， 而且能把状态的修改从组件中独立出来。

相对于 useState，useReducer 能更好的描述“如何更新状态”。例如：组件负责发出行为，useReducer 负责更新状态。

好处是：**让代码逻辑更清晰，代码行为更易预测。**

在某个函数式组件中，状态很多，修改过程很复杂，此时可考虑使用 useReducer 定义和管理状态。

## 1. useReducer 语法

``` ts
const [state, dispatch] = useReducer(reducer, initState, initAction?)
```

其中：

- **reducer** 是一个函数，类似于 `(prevState, action) => newState`。形参 `prevState` 表示旧状态，形参 `action` 表示本次的行为，返回值 `newState` 表示处理完毕后的新状态。
- **initState** 表示初始状态， 即默认值。
- **initAction** 是进行状态初始化时的处理函数，是可选的，如果提供了 initAction 函数，则会把 initState 传递给 initAction 函数进行处理，initAction 的返回值会被当做初始状态。
- 返回值 state 是状态值。dispatch 是更新 state 的方法，让他接受 action 作为参数，useReducer 只需调用 `dispatch(action)` 方法传入的 action 即可更新 state。

## 2. 定义组件的基础结构

定义名为 `Father` 的父组件：

``` ts
export const Father: React.FC = () => {
  return (
    <div>
      <button>修改 name 名</button>
      <div className='father'>
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

定义名为 `Son1` 和 `Son2`的子组件：

``` ts
const Son1: React.FC = () => {
  return (
    <div className='son1'>我是 Son1 组件</div>
  )
}

const Son2: React.FC = () => {
  return (
    <div className='son2'>我是 Son2 组件</div>
  )
}
```

在 `index.css ` 中添加对应的样式：

``` css
.father {
  display: flex;
  justify-content: space-between;
  width: 100vw;
}

.son1 {
  background-color: orange;
  min-height: 300px;
  flex: 1;
  padding: 10px;
}

.son2 {
  background-color: lightblue;
  min-height: 300px;
  flex: 1;
  padding: 10px;
}
```

## 3. 定义 useReducer 的基础结构

按需导入 `useReducer` 函数：

``` ts
import React, { useReducer } from 'react'
```

**定义初始数据:**

``` ts
const defaultState = {
  name: '张三',
  age: 18,
};
```

定义 `reducer` 函数，作用是：**根据旧状态，进行一系列处理，最终返回新状态：**

``` ts
// reducer 函数形参中，第一个参数为上一次的旧状态
const reducer = (prevState) => {
  console.log('prevState', prevState);
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  return prevState;
};
```

在 `Father` 组件中，调用 `useReducer(reducerFn, defaultState)` 函数，并得到 reducer 返回的状态：

``` ts
export const Father: React.FC = () => {

  const [state] = useReducer(reducer, defaultState);

  return (
    <div>
      <button>修改 name 名</button>
      <div className='father'>
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

为 reducer 中的 initState 指定数据类型：

``` ts
type UserType = typeof defaultState;

const defaultState = {
  name: '张三',
  age: 18,
};

// reducer 函数形参中，第一个参数为上一次的旧状态
const reducer = (prevState: UserType) => {
  console.log('prevState', prevState);
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  return prevState;
};
```

## 4. 使用 initAction 处理初始数据

定义名为 `initAction` 处理函数，如果初始数据中的 age 为小数、负数、0时，对 age 进行非法值处理：

``` ts
// 形参：初始状态
// 返回值：处理好的初始状态
const initAction = (initState: UserType) => {
  return {...initState, age: Math.round(Math.abs(initState.age)) || 18};
};
```

在 `Father` 组件中，使用 `initAction` 函数：

``` ts
export const Father: React.FC = () => {

  const [state] = useReducer(reducer, defaultState, initAction);
  console.log('state', state);

  return (
    <div>
      <button>修改 name 名</button>
      <div className='father'>
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

## 5. 在 Father 组件中点击按钮修改 name

**1. 错误示范：**

``` ts
export const Father: React.FC = () => {

  const [state] = useReducer(reducer, defaultState, initAction);
  console.log('state', state);

  const changeName = () => {
    state.name = '李四';
  }

  return (
    <div>
      <button onClick={changeName} >修改 name 名</button>
      <p>{JSON.stringify(state)}</p>
      <div className='father'>
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

存储在 useReducer 中的数据是“不可改变”的。想要修改 useReducer 中的数据，必须触发 reducer 函数的重新计算，根据 reducer 形参中的旧状态对象 initState，经过一系列处理，返回一个“全新的”状态。

**2. 正确操作**

为了能够触发 reducer 函数的重新执行，需要在调用 `useReducer()` 后接收返回的 `dispatch()` 函数。并在 button 点击事件处理函数中调用，从而触发 reducer 函数的重新计算。

```ts
  const [state, dispatch] = useReducer(reducer, defaultState, initAction);
  console.log('state', state);

  const changeName = () => {
    state.name = '李四';
    dispatch();
  }
```

**3. 调用 dispatch 传递参数给 reducer**

在 Father 父组件按钮点击回调中，调用 **dispatch()** 函数并将参数传递给 **reducer** 的第二个形参：

```ts
const changeName = () => {
  state.name = '李四';
  dispatch({
    type: 'UPDATA_NAME',
    payload: '李四',
  });
}
```

修改 `reducer` 函数的形参，添加名为 `action` 的第二个形参，用来接收 `dispatch` 传递过来的数据，并根据接收的 `action.type` 标识符，**决定进行怎样的更新操作**，最终 return 一个计算好的新状态：

```ts
const reducer = (prevState: UserType, action) => {
  console.log('action', action);
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  // return prevState;

  // 匹配
  switch (action.type) {
    case 'UPDATA_NAME':
      return {...prevState, name: action.payload};
    // 兜底：如果没有任何匹配操作，返回上一次旧状态
    default:
      return prevState;
  }
};
```

为 `action` 添加类型：

```ts
type ActionType = {
  type: string;
  payload: string;
};

// reducer 函数形参中，第一个参数为上一次的旧状态
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('action', action);
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  // return prevState;

  // 匹配
  switch (action.type) {
    case 'UPDATA_NAME':
      return {...prevState, name: action.payload};
    // 兜底：如果没有任何匹配操作，返回上一次旧状态
    default:
      return prevState;
  }
};
```

## 6. 将用户信息渲染到子组件中

在 Father 父组件中，通过展开运算符将 state 数据对象绑定为 `Son1` 和 `Son2` 的 props 属性：

```ts
export const Father: React.FC = () => {

  const [state, dispatch] = useReducer(reducer, defaultState, initAction);
  console.log('state', state);

  const changeName = () => {
    state.name = '李四';
    dispatch({ type: 'UPDATE_NAME', payload: '李四' })
  }

  return (
    <div>
      <button onClick={changeName} >修改 name 名</button>
      <p>{JSON.stringify(state)}</p>
      <div className='father'>
        <Son1 {...state}/>
        <Son2 {...state}/>
      </div>
    </div>
  )
}
```

在子组件中，指定 props 类型为 `React.FC<UserType>`，并使用 props 接收和渲染数据：

```ts
const Son1: React.FC<UserType> = (props) => {
  return (
    <div className='son1'>
      <p>{JSON.stringify(props)}</p>
    </div>
  )
}

const Son2: React.FC<UserType> = (props) => {
  return (
    <div className='son2'>
      <p>{JSON.stringify(props)}</p>
    </div>
  )
}
```

## 7. 在子组件中实现点击按钮 age 自增/自减操作

扩充 `ActionType` 的类型：

```ts
type ActionType = {
  type: 'UPDATE_NAME';
  payload: string;
} | {
  type: 'INCREMENT';
  payload: number;
} | {
  type: 'DECERMENT';
  payload: number;
};
```

在 `reducer` 中添加 `INCERMENT` 和 `DECERMENT` 的 case 匹配：

```ts
// reducer 函数形参中，第一个参数为上一次的旧状态
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('action', action);
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  // return prevState;

  // 匹配
  switch (action.type) {
    case 'UPDATE_NAME':
      return {...prevState, name: action.payload};
    case 'INCREMENT':
      return {...prevState, age: prevState.age + action.payload};
    case 'DECERMENT':
      return {...prevState, age: prevState.age - action.payload};
    // 兜底：如果没有任何匹配操作，返回上一次旧状态
    default:
      return prevState;
  }
};
```

在子组件 `Son1` / `Son2` 中添加按钮，绑定点击事件，其中 `dispatch` 为父组件中传入函数，子组件接受使用。

```ts
const Son1: React.FC<UserType & {dispatch: React.Dispatch<ActionType>}> = (props) => {
  const add = () => {
    props.dispatch({ type: 'INCREMENT', payload: 1 });
  };
  return (
    <div className='son1'>
      <p>{JSON.stringify(props)}</p>
      <button onClick={add}>+1</button>
    </div>
  )
}

const Son2: React.FC<UserType & {dispatch: React.Dispatch<ActionType>}> = (props) => {
  const sub = () => {
    props.dispatch({ type: 'DECERMENT', payload: 1 });
  };
  return (
    <div className='son2'>
      <p>{JSON.stringify(props)}</p>
      <button onClick={sub}>-1</button>
    </div>
  )
}
```

父组件传参：

```ts
<div>
  <button onClick={changeName} >修改 name 名</button>
  <p>{JSON.stringify(state)}</p>
  <div className='father'>
    <Son1 {...state} dispatch={dispatch}/>
    <Son2 {...state} dispatch={dispatch}/>
  </div>
</div>
```

## 8. 在 GrandSon 组件中实现重置按钮

扩展 `ActionType` 类型：

```ts
type ActionType = {
  type: 'UPDATE_NAME';
  payload: string;
} | {
  type: 'INCREMENT';
  payload: number;
} | {
  type: 'DECERMENT';
  payload: number;
} | {
  type: 'RESET';
};
```

在 `reducer` 中添加 `RESET` 的 case 判断：

```ts
  // 匹配
  switch (action.type) {
    case 'UPDATE_NAME':
      return {...prevState, name: action.payload};
    case 'INCREMENT':
      return {...prevState, age: prevState.age + action.payload};
    case 'DECERMENT':
      return {...prevState, age: prevState.age - action.payload};
    case 'RESET':
      return {name: '张三', age: 18};
    // 兜底：如果没有任何匹配操作，返回上一次旧状态
    default:
      return prevState;
  }
```

在 `GrandSon` 组件中，添加重置按钮，并绑定点击事件处理函数：

```ts
const GrandSon: React.FC<{dispatch: React.Dispatch<ActionType>}> = (props) => {
  const reset = () => {
    props.dispatch({ type: 'RESET'});
  }
  return (
    <>
      <p>GrandSon</p>
      <button onClick={reset}>reset</button>
    </>
  )
}
```

## 9. 使用 Immer 编写更简洁的 reducer 更新逻辑

安装 **immer** 相关依赖包

```ts
npm install immer use-immer -S
```

从 `use-immer` 中导入 `useImmerReducer` 函数，并替换 React 官方的 `useReducer` 函数的调用：

```ts
import { useImmerReducer } from 'use-immer';

export const Father: React.FC = () => {
  const [state, dispatch] = useImmerReducer(reducer, defaultState, initAction);
}
```

修改 reducer 函数中的业务逻辑，`case` 代码块中不再需要 return 不可变的新对象了，只需要在 prevState 上进行修改即可。 **Immer 内部会复制并返回新对象。**

```ts
// reducer 函数形参中，第一个参数为上一次的旧状态
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('action', action);
  // 在 reducer 函数中，必须向外返回一个处理好的新状态
  // return prevState;

  // 匹配
  switch (action.type) {
    case 'UPDATE_NAME':
      prevState.name = action.payload;
      break;
    case 'INCREMENT':
      prevState.age += action.payload;
      break;
    case 'DECERMENT':
      prevState.age -= action.payload;
      break;
    case 'RESET':
      return defaultState;
    // 兜底：如果没有任何匹配操作，返回上一次旧状态
    default:
      return prevState;
  }
};
```
