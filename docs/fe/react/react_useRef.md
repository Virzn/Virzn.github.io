# Hooks-useRef

## 1. 两个作用

useRef 函数返回一个可变的 ref 对象，该对象只有一个 **current** 属性。可在调用 useRef 时为其指定初始值。并且返回的 ref 对象在组件的整个生命周期内保持不变。

``` ts
// 1. 导入 useRef
import { useRef } from 'react'

// 2. 调用 useRef 创建 ref 对象
const refObj = useRef('default');

// 3. 通过 ref.current 访问 ref 存储的值

```

useRef 可用来解决以下两个问题：
  - 获取 DOM 元素或子组件的实例对象；
  - 存储渲染周期之间的共享数据；

## 2. 获取 DOM 元素的实例

获取 input 元素对象的焦点

``` ts

import React, { useRef } from 'react'

export const InputFocus: React.FC = () => {

  const text = '获取焦点'

  const inpurRef = useRef<HTMLInputElement>(null)

  const getFocus = () => {
    inpurRef.current?.focus()
  }

  return (
    <div>
      <input ref={inpurRef} type='text'></input>
      <button onClick={getFocus}>{text}</button>
    </div>
  )
}

```

## 3. 存储渲染周期之间的共享数据

基于 useRef 创建 `prevCountRef` 的数据对象，用来存储上一次的旧 count 值。每当点击按钮触发 count 自增时，都把最新的旧值赋值给 `prevCountRef.current` 。

``` typeScript

export const Count: React.FC = () => {

  const [ count, setCount ] = useState(0);
  const prevCountRef = useRef(0);
  const add = () => {
    prevCountRef.current = count;
    setCount(count + 1);
  };

  return (
    <>
      <h1>Count值: {count}, 旧值是: {prevCountRef.current}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}

```

## 4. 注意事项

### 4.1 组件 rerender 时 useRef 不会被重新初始化

在 RefTimer 组件中，点击 +1 按钮，会让 count 值自增，从而触发 RefTimer 组件给 rerender。但是，RefTimer 组件中的时间戳保持不变，说明组件每次渲染，不会重复调用 useRef 函数进行初始化。

``` ts
export const RefTimer: React.FC = () => {

  const [ count, setCount ] = useState(0);
  const time = useRef(Date.now());

  return (
    <>
      <h1>Count值: {count}, timer 值是: {time.current}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </>
  )
}
```

### 4.2 ref.current 变化时不会造成组件的 rerender

点击给 ref 赋新值的按钮时，为 **time.current** 赋新值，执行结果为：

1. 终端中输出了最新的 **this.current**
2. 没有触发 **RefTimer** 组件的 **rerender**

证明了 **ref.current** 变化时，不会造成组件的 **rerender。**

``` ts
export const RefTimer: React.FC = () => {

  const [ count, setCount ] = useState(0);
  const time = useRef(Date.now())

  const uodateTime = () => {
    time.current = Date.now()
    console.log('time.current', time.current)
  }

  return (
    <>
      <h1>Count值: {count}, timer 值是: {time.current}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <button onClick={uodateTime}>time赋值</button>
    </>
  )
}
```

### 4.3 ref.current 不能作为其他 Hooks 的依赖项

**ref.current** 值的变化不会造成组件的 **rerender**，而且 React 也不会跟踪 **ref.current** 的变化，因此 **ref.current** 不能作为其他 **hooks( useMemo, useCallback, useEffect 等)** 的依赖性。

``` ts
export const RefTimer: React.FC = () => {

  const [ count, setCount ] = useState(0);
  const time = useRef(Date.now())

  console.log('组件渲染')
  const uodateTime = () => {
    time.current = Date.now()
    console.log('time.current', time.current)
  }

  // 组件每次渲染完毕后，会触发 useEffect 中的回调。如果给了依赖项，会根据依赖项是否发送变化，决定是否触发回调。
  useEffect(() => {
    console.log('Effect time.current', time.current)
  }, [time.current])

  return (
    <>
      <h1>Count值: {count}, timer 值是: {time.current}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <button onClick={uodateTime}>time赋值</button>
    </>
  )
}
```

**useEffect** 会在组件首次渲染时执行一次。后续 **time.current** 发送变化时，并不会触发 **useEffect** 的重新执行，因此不能将其作为其他 **Hooks** 函数的依赖性。

## 5. forwardRef

ref 的作用是获取实例，由于函数组件不存在实例，因此无法通过 ref 获取函数组件的实例引用。 而 **React.forwardRef** 就是用来解决这个问题的。

**React.forwardRef** 会创建一个 React 组件，该组件能够将其接收到的 ref 属性转发给自己的组件树。

### 5.1 无法直接使用 ref 引用函数组件

下方代码中，父组件想通过 ref 引用子组件。在父组件中 `<Child ref={childRef}/>` 这段函数会出现错误。函数组件没有实例对象，无法被直接引用。

``` ts
const Child: React.FC = () => {
  const [ count, setCount ] = useState(0);

  return (
    <>
    <h1>Count值: {count}</h1>
    <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </>
  )
}

export const Father: React.FC = () => {

  const childRef = useRef()

  return (
    <>
    <h1>父组件</h1>
    <hr />
    <Child ref={childRef}/>
    </>
  )
}
```

浏览器终端出现这样的错误提示：

```
Warning:
Function components cannot be given refs. Attempts to access this ref will fail.
Did you mean to use React.forwardRef()?
```

### 5.2 forward 的基本使用

在使用函数组件时，无法直接通过 ref 引用函数组件。因为在默认情况下，自己的组件不会暴露内部 DOM 节点的 ref。

正确方法为使用 React.forwardRef() 把函数组件包装起来。

``` ts
const Child = React.forwardRef(() => {
  const [ count, setCount ] = useState(0);

  return (
    <>
    <h1>Count值: {count}</h1>
    <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </>
  )
})

export const Father: React.FC = () => {

  const childRef = useRef()
  const showwRef = () => {
    // 此时打印的ref 为 undefined
    console.log(childRef.current)
  }
  return (
    <>
    <h1>父组件</h1>
    <button onClick={showwRef}>showRef</button>
    <hr />
    <Child ref={childRef}/>
    </>
  )
}
```

此时父组件中打印的 ref 为 undefined，因为子组件 Child 没有向外暴漏任何自己内部的东西。

## 6. useImperativeHandle

直接使用 ref 获取 DOM 实例，会全面暴露 DOM 实例上的 API，从而导致外部使用 ref 时有更大的自由度。在实际开发时，应严格控制 ref 的暴露颗粒度，控制它能调用的方法，只向外暴露主要的功能函数，其他功能函数不暴露。

React 官方提供 `useImperativeHandle` 的目的就是希望在使用 ref 时，可自定义暴露给外部组件哪些功能函数或属性。

语法结构：

```
useImperativeHandle(通过forwardRef接收到的父组件的ref对象, () => 自定义ref对象, [依赖项数组])
```

1. 第一个参数为父组件传递的 ref；

2. 第二个参数是一个函数，返回的对象会自动绑定到 ref 上。 即子组件可以将自己内部的方法或者值通过 useImperativeHandle 添加到父组件中 useRef 定义的对象中；

3. 第三个参数是函数依赖的值（可选）。若 createHandle 函数中使用到了子组件内部定义的变量，则还需要将该变量作为依赖变量成为 useImperativeHandle 的第3个参数；

依赖项数组可选。

### 6.1 useImperativeHandle 基本使用

在被 **React.forwardRef()** 包裹的组件中，需要结合 **useImperativeHandle** 这个 hooks API，向外按需暴露。

``` ts
const Child = React.forwardRef((_, ref) => {

  const [ count, setCount ] = useState(0);
  // 向外暴露一个对象
  useImperativeHandle(ref, () => ({
    name: 'childRef',
  }));

  return (
    <>
    <h1>Count值: {count}</h1>
    <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </>
  )
})
```

此时父组件中打印出来的 ref 即为子组件中向外暴漏的内容。

### 6.2 基于 useImperativeHandle 按需向外暴露成员

子组件中，向外暴漏 count 和 setCount() 两个成员。

在负组件中添加重置按钮，重置子组件的值。需子组件将 count 和 setCount() 向外暴漏，并在父组件中接收使用。

``` ts
const Child = React.forwardRef((_, ref) => {

  const [ count, setCount ] = useState(0);

  useImperativeHandle(ref, () => ({
    count,
    setCount,
  }));

  return (
    <>
    <h1>Count值: {count}</h1>
    <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </>
  )
})

export const Father: React.FC = () => {

  const childRef = useRef<{count: number, setCount: (newValue: number) => void}>()
  const showwRef = () => {
    console.log(childRef.current)
  }
  const reSetCount = () => {
    childRef?.current?.setCount(0);
  }
  return (
    <>
    <h1>父组件</h1>
    <button onClick={showwRef}>showRef</button>
    <button onClick={reSetCount}>重置</button>
    <hr />
    <Child ref={childRef}/>
    </>
  )
}
```

### 6.3 控制成员暴露粒度

在 Child 中，希望对外暴露一个重置 count 为 0 的函数，而不希望直接把 setCount() 暴露出去。因为父组件调用 setCount() 时可以传任何数值。因此可基于 useImperativeHandle 控制成员的暴露粒度。

``` ts
const Child = React.forwardRef((_, ref) => {

  const [ count, setCount ] = useState(0);

  useImperativeHandle(ref, () => ({
    count,
    reSet: () => setCount(0),
  }));

  return (
    <>
    <h1>Count值: {count}</h1>
    <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </>
  )
})

export const Father: React.FC = () => {

  const childRef = useRef<{count: number, reSet: () => void}>()
  const showwRef = () => {
    console.log(childRef.current)
  }
  const reSetCount = () => {
    childRef?.current?.reSet();
  }
  return (
    <>
    <h1>父组件</h1>
    <button onClick={showwRef}>showRef</button>
    <button onClick={reSetCount}>重置</button>
    <hr />
    <Child ref={childRef}/>
    </>
  )
}
```

### 6.4 第三个参数

三种用法：

**1. 空数组：** 只在子组件首次被渲染时，执行 **useImperativeHandle** 中的 fn 回调，从而把 return 的对象作为父组件接收到的 ref。

**2. 依赖项数组：** 子组件首次被渲染时，依赖项改变时，会执行 **useImperativeHandle** 中的 fn 回调，从而让父组件通过 ref 拿到依赖的新值。

**3. 省略依赖项数组：** 此时，组件内任何 state 的变化，都会导致 **useImperativeHandle** 中回调的重新执行。

## 注意点

- **不要滥用 ref。** 应该仅在没法通过 prop 来表达命令式行为时，才使用 ref。例如：滚动到指定节点、聚焦某个节点、触发一次动画、选择文本。
- **如果可通过 prop 实现，就不应该使用 ref。** 不应该从一个 Model 组件暴露出 (open, close) 这样的命令式句柄，最好像 `<Modal isOpen={isOpen} />` 这样，将 isOpen 作为一个 prop。副作用可帮助我们通过 prop 来暴露一些命令式的行为。
