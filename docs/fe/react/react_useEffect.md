# Hooks-useEffect

## 1. 什么是函数的副作用

函数副作用就是除了返回值外，对外界环境造成的其他影响，即与组件渲染无关的操作。例如**获取数据、修改全局变量、更新DOM等。**

useEffect 是 React 中的 hooks API。通过 useEffect 可执行一些副作用操作。

``` ts
useEffect(fn, deps)
```

- 第一个参数 **fn** 是一个副作用函数，在每次渲染完成后调用。
- 可选依赖项数组，数组每一项内容都会被用来进行渲染前后的对比。
  - 当依赖项变化时，会重新执行 fn 副作用函数。
  - 当依赖项没有变化时，则不执行 fn 副作用函数。

## 2. useEffect 的执行时机

如果没有为 useEffect 指定依赖项数组，则 Effect 中的副作用函数，会在函数组件每次渲染完成后执行。

``` ts
export const Counter: React.FC = () => {

  const [count, setCount] = useState(0)

 // 如果省略依赖项数组，fn函数会在每次更新渲染后执行
  useEffect(() => {
    console.log(count)
  })

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </div>
  )
}
```

## 3. deps 为空数组

此时副作用函数只会在组件首次渲染完成后执行一次。当组件 rerender 时不会触发副作用函数的重新执行。

``` ts
export const Counter: React.FC = () => {

  const [count, setCount] = useState(0)

 // 如果省略依赖项数组，fn函数会在每次更新渲染后执行
  useEffect(() => {
    console.log(count)
  }, [])

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </div>
  )
}
```

## 4. deps 为依赖项数组

想有条件的触发副作用函数的重新执行，需通过 deps 数组指定依赖项列被。

React 会在组件每次渲染完成后，对比渲染前后的每一个依赖项是否变化，只要任何一个依赖项变化，都会触发副作用函数的重新执行。若依赖项数组在渲染前后未变化，则不触发副作用函数的重新执行。

``` ts
export const Counter: React.FC = () => {

  const [count, setCount] = useState(0)

 // 如果省略依赖项数组，fn函数会在每次更新渲染后执行
  useEffect(() => {
    console.log(count)
  }, [count])

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
    </div>
  )
}
```

## 5. 清理副作用

useEffect 可返回一个函数，用于清除副作用的回调。

``` ts
useEffect(() => {
  // 1. 执行副作用操作
  // 2. 返回一个清理副作用函数
  return () => { /* 清理操作 */ }
}, [依赖项])
```

应用场景：当前组件中使用了**定时器**或绑定了**事件监听程序**，可在返回的函数中清楚定时器或解绑监听程序。

## 6. 组件卸载时终止未完成的 Ajax 请求

在父组件 `TestRandomCColor` 中，使用布尔值 flag 控制子组件 `RandomColor` 的展示与隐藏。

``` ts
export const TestRandomColor: React.FC = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => {setShow(prev => !prev)}}>Toggle</button>
      <hr />
      {show && <RandomColor />}
    </>
  )
}
```

在子组件 `RandomColor` 中，通过 `useEffect(fn, [])` 声明一个副作用函数，该副作用函数仅在组件首次渲染完毕后执行，在该副作用函数中，基于 fetch API 请求数据，并在清理函数中使用 `AbortController` 对象自动终止未完成的 Ajax 请求。

``` ts
const RandomColor: React.FC = () => {

  const [color, setColor] = useState('')

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.liulongbin.top/v1/color', {signal: controller.signal})
      .then(res => res.json())
      .then(res => {
        setColor(res.data.color)
        console.log('color:', res)
    })

    return() => controller.abort();
  }, [])

  return (
    <>
      <p>color 的颜色: {color}</p>
    </>
  )
}
```

## 7. 获取鼠标在网页中移动时的位置

声明一个 **MouseInfo** 子组件，监听鼠标的移动并打印鼠标的位置

``` ts
const MouseInfo: React.FC = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    // 1. 要绑定或解绑的 mousemove 事件处理函数
    const mouseMoveHandler = (e: MouseEvent) => {
      if (timerId !== null) return;
      // 节流
      timerId = setTimeout(() => {
        console.log(e.clientX, e.clientY);
        setPosition({ x: e.clientX, y: e.clientY });
        timerId = null;
      }, 500)
    }
    // 2. 组件首次渲染完毕后，为 window 对象绑定 mousemove 事件
    window.addEventListener('mousemove', mouseMoveHandler);
    // 3. 返回一个清理的函数，在每次组件卸载时，为 window 对象解绑 mousemove 事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, [])

  return (
    <>
      <p>鼠标位置：{JSON.stringify(position)}</p>
    </>
  )
}
```

声明父组件控制子组件的显示隐藏。

``` ts
export const TestMouseInfo: React.FC = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      {/* 点击按钮，切换 flag 的值 */}
      <button onClick={() => setShow(prev => !prev)}>Toggle</button>
      <hr />
      {show && <MouseInfo />}
    </>
  )
}
```

## 8. 自定义封装鼠标位置的 hook

新建 `hooks/index.ts` 模块，并把刚才获取鼠标位置的代码封装为 `useMousePosition` 的自定义 hook, 并将 delay 延迟时间设置为参数传递。

``` ts
import { useEffect, useState } from "react";

export const useMousePosition = (delay: number = 0) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    // 1. 要绑定或解绑的 mousemove 事件处理函数
    const mouseMoveHandler = (e: MouseEvent) => {
      if (timerId !== null) return;
      // 节流
      timerId = setTimeout(() => {
        console.log(e.clientX, e.clientY);
        setPosition({ x: e.clientX, y: e.clientY });
        timerId = null;
      }, delay)
    }
    // 2. 组件首次渲染完毕后，为 window 对象绑定 mousemove 事件
    window.addEventListener('mousemove', mouseMoveHandler);
    // 3. 返回一个清理的函数，在每次组件卸载时，为 window 对象解绑 mousemove 事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, [delay])

  return position;
}
```

在 `MouseInfo` 组件中，导入封装的自定义 hook 使用。

``` ts
import { useMousePosition } from '@/hooks'

const MouseInfo: React.FC = () => {

  const position = useMousePosition(100);

  return (
    <>
      <p>鼠标位置：{JSON.stringify(position)}</p>
    </>
  )
}
```

## 9. 自定义封装秒数倒计时的 hook

分析：
 1. 用户调用 `useCountDown(5)` 的 hook, 可传递倒计时的秒数，如果未指定秒数则默认值是10秒。
 2. 在 `useCountDown` 中，需要对用户传递进来的数组进行非法值的判断和处理。
 3. 每隔1s让 `count - 1`， 并使用一个布尔值记录按钮的可用状态。
 4. 向外返回每次的秒数和当前的禁用状态。

最终的 `useCountDown` 自定义 hook 如下:

``` ts
export const useCountDown = (seconds: number = 10) => {
  // 对外界传递的数值进行非法值处理：
  // 1. 先求绝对值
  // 2. 再对小数进行四舍五入
  // 3. 如果处理的结果为数字 0，则将默认值设为 10
  seconds = Math.round(Math.abs(seconds)) || 10;
  const [count, setCount] = useState(seconds)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
     const timerId = setTimeout(() => {
      if (count > 1) {
        setCount(prev => prev - 1);
      } else {
        // 清除定时器
        setDisabled(false);
        clearTimeout(timerId);
      }
    }, 1000)

    return () => clearTimeout(timerId);
  }, [count])

  return { count, disabled }
}
```

在组件中调用：

``` ts
export const CountDown: React.FC = () => {

  const { count, disabled } = useCountDown(5)

  return (
    <>
      <button disabled={disabled} onClick={() => console.log('确认协议')}>
        {disabled ? `请仔细阅读本协议内容（${count} 秒）` : '确认此协议'}
      </button>
    </>
  )
}
```

## 10. useEffect 的使用注意事项

- 不要在 useEffect 中改变依赖项的值，否则会造成死循环。
- 多个不同功能的副作用尽量分开声明，不要写到一个 useEffect 中。

## 11. useLayoutEffect 和 useEffect

### 11.1 用法相似

- useLayout 接受一个函数和一个依赖项数组作为参数
- 只有在数组中的依赖项发生改变时才会再次执行副作用函数
- useLayoutEffect 也可返回一个清理函数

### 11.2 两者区别

**执行时机不同：**
  useEffect 中的回调函数在浏览器重新绘制屏幕之后触发
  useLayoutEffect 中的回调函数在浏览器重新绘制屏幕之前触发
**执行过程不同：**
  useEffect 中的回调函数以异步执行，不阻塞浏览器绘制
  useLayoutEffect 中的回调函数同步执行，阻塞浏览器重新绘制

注意：React 保证了 useLayoutEffect 中的代码以及其中任何计划的状态更新都会在浏览器重新绘制屏幕之前得到处理。

### 11.3 useLayoutEffect 的使用示例

点击按钮，把 num 的值置为 0，当页面更新完成后，判断 num 是否等于 0，如果等于 0，则在 useEffect 中将 num 赋值随机数字。

``` ts
export const RenderNumber: React.FC = () => {
  const [num, setNum] = useState(0)

  useEffect(() => {
    if (num === 0) {
      setNum(10 + Math.random() * 100)
    }
  }, [num])

  return (
    <>
      <h3>num: {num}</h3>
      <button onClick={() => setNum(0)}>重置</button>
    </>
  )
}
```

上段代码点击按钮后会出现数字闪烁的情况，页面先将 num 置为0，然后再渲染成随机的数字，由于更新的很快，故出现了闪烁。

可将 useEffect 替换为 useLayoutEffect：

``` ts
export const RenderNumber: React.FC = () => {
  const [num, setNum] = useState(0)

  useLayoutEffect(() => {
    if (num === 0) {
      setNum(10 + Math.random() * 100)
    }
  }, [num])

  return (
    <>
      <h3>num: {num}</h3>
      <button onClick={() => setNum(0)}>重置</button>
    </>
  )
}
```

此时数字不再闪烁，在点击按钮后，num 置为0，但此时页面不会渲染，而是等待 useLayoutEffect 内部状态修改后才会更新页面。
