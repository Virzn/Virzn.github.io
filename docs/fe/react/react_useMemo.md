# Hooks-useMemo

## 1. memo 函数

当父组件被重新渲染时，也会触发子组件的重新渲染，这样就多出了无意义的性能开销。如果子组件的状态没有变化，则子组件仍会被重新渲染。

在 React 中可通过 `React.memo()` 函数来解决上述问题，从而提高性能。

`React.meme()` 语法格式：

```ts
const 组件 = React.memo(函数式组件)
```

父组件声明了 count 和 flag 两个状态， 子组件依赖于父组件通过 props 传递的 num。当父组件修改 flag 时，子组件也会被重新渲染：

```ts
import React, { useEffect, useState } from "react";

export const Father: React.FC = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  return (
    <>
      <h1>父组件</h1>
      <p>count: {count}</p>
      <p>flag: {String(flag)}</p>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <button onClick={() => setFlag(prev => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}

const Son: React.FC<{num: number}> = ({num}) => {
  useEffect(() => {
    console.log('子组件渲染了')
  })
  return (
    <>
      <h3>子组件 {num}</h3>
    </>
  )
}
```

可使用 `React.memo(函数式组件)` 将子组件包裹起来，只有子组件依赖的 props 发生变化时，才会触发子组件的重新渲染。

```ts
const Son: React.FC<{num: number}> = React.memo(({num}) => {
  useEffect(() => {
    console.log('子组件渲染了')
  })
  return (
    <>
      <h3>子组件 {num}</h3>
    </>
  )
})
```

## 2. useMemo - 问题引入

在 `Father` 组件中添加一个计算属性，根据 Flag 值的真假，动态返回一段文本内容，并把计算的结果显示到页面上：

```ts
// 父组件
export const Father: React.FC = () => {
  // 定义 count 和 flag 两个状态
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  // 根据布尔值进行计算，动态返回内容
  const tips = () => {
    console.log('触发了 tips 的重新计算')
    return flag ? <p>哪里贵了，不要睁着眼瞎说好不好</p> : <p>这些年有没有努力工作，工资涨没涨</p>
  }

  return (
    <>
      <h1>父组件</h1>
      <p>count 的值是：{count}</p>
      <p>flag 的值是：{String(flag)}</p>
      {tips()}
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}
```

上述代码中，点击父组件的 +1 按钮，发现 count 在自增，而 flag 的值不会发生变化。此时也会触发 tips 函数的重新执行，造成了性能浪费。

希望如果 `flag` 没有发生变化，避免 `tips` 函数的重新计算，从而优化性能。此时需要用到 React Hooks 提供的 **useMemo** API

## 3. useMemo - 语法格式

UseMemo 语法格式：

```ts
const memorizedValue = useMemo(cb, array)

const memoValue = useMemo(() => {
  return 计算得到的值
}, [value]) // 表示监听 value 的变化
```

其中：

- **cd**：这是一个函数，用户处理计算的逻辑，必须使用 return 返回计算的结果；
- **array**：数组存储的是依赖项，只要依赖项变化，都会触发 cd 的重新执行。

对于第二个参数：

- 不传数组，每次更新都会重新计算
- 空数组，只计算一次
- 依赖对应的值，对应值变化时会重新执行 cb

## 4. useMemo - 使用 useMemo 解决问题

导入 useMemo：

```ts
import React, { useEffect, useState, useMemo } from 'react';
```

在 Father 中，使用 `useMemo` 对 `tips` 进行改造：

```ts
export const Father: React.FC = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // 根据布尔值进行计算，返回内容
  console.log('重新渲染')
  const tips = useMemo(() => {
    console.log('触发了 tips 的重新计算')
    return flag ? <p>哪里贵了，不要睁着眼瞎说好不好</p> : <p>这些年有没有努力工作，工资涨没涨</p>
  }, [flag]);

  return (
    <>
      <h1>父组件</h1>
      <p>count: {count}</p>
      <p>flag: {String(flag)}</p>
      {tips}
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <button onClick={() => setFlag(prev => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}
```

此时，点击 Father 中的 +1 按钮，并不会触发 `tips` 的重新计算，而是会使用上一次缓存的值进行渲染。只有依赖项 `flag` 变化时， 才会触发 `tips` 的重新执行。
