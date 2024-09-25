# Hooks-useCallback

## 1. 语法格式

之前的 `useMemo` 能够达到缓存某个变量值的效果，而 `useCallback` 用来对组件内的函数进行缓存，返回的是 **缓存的函数**， 语法格式：

```ts
const memoCallback = useCallback(cb, array)
```

useCallback 返回一个 memorized 回调函数供组件使用，从而防止组件每次 rerender 时反复创建相同的函数，能够节省内存开销，提高性能。

- cb 是一个函数，用于处理业务逻辑，这个 cb 是需要被缓存的函数
- array 是依赖项列表，当 array 中的依赖项发生变化时才会重新执行 useCallback
  - 如果省略 array，则每次更新都会重新计算
  - 如果 array 为空数组，则只在组件第一次初始化时计算一次
  - 如果 array 不为空数组，则只有依赖项变化时，才会重新计算

## 2. 基本实例

当输入框触发 onChange 事件时，会给 kw 重新赋值。

kw 的值改变会导致组件的 rerender，组件的 rerender 会导致反复创建 onChange 函数并添加到 Set 集合中，造成不必要的内存浪费。

```ts
import React, { useState } from 'react';

const set = new Set();

export const Search: React.FC = () => {
  const [kw, setKw] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }
  set.add(onChange);
  console.log('set 中函数的数量为：', set.size);

  return (
    <>
      <input type="text" value={kw} onChange={onChange} />
      <hr />
      <p>{kw}</p>
    </>
  )
}
```

上述代码，每次 input 框内容变化时，都会打印 `set.size` 的值，这个值一直自增 +1，因为每次组件 rerender 都会创建一个新的 onKwChange 的函数添加到 set 集合中。

为了防止 `Search` 组件 rerender 时每次都重新创建 `onKwChange` 函数，可使用 useCallback 对函数进行缓存。

```ts
import React, { useCallback, useState } from 'react';

const set = new Set();

export const Search: React.FC = () => {
  const [kw, setKw] = useState('');

  const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }, [])
  set.add(onKwChange);
  console.log('set 中函数的数量为：', set.size);

  return (
    <>
      <input type="text" value={kw} onChange={onKwChange} />
      <hr />
      <p>{kw}</p>
    </>
  )
}
```

运行代码发现无论 input 的值如何变化，每次打印的 `set.size` 的值均为1，证明使用 useCallback 实现了对函数的缓存。

## 3. useCallback 的案例

### 3.1 问题引入

导入需要的 hooks 函数，并定义需要的 TS 类型：

```ts
import React, { useEffect, useState, useCallback } from 'react'

// 文本框组件的 props 类型
type SearchInputType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
// 单词对象的 TS 类型
type WordType = { id: number, word: String}
```

定义 SearchInput 搜索框子组件，接收父组件传递进来的 onChange 处理函数，每当 input 触发 onChange 事件时，调用 props.onChange 进行处理：

```ts
const SearchInput: React.FC<SearchInputType> = (props) => {
  useEffect(() => {
    console.log('触发了 SearchInput 的 rerender')
  })

  return <input onChange={props.onChange} placeholder="请输入关键字" />
}
```

定义 SearchResult 搜索结果子组件，接受父组件传递来的 query 搜索关键字，在 useEffect 中监听 `props.query` 的变化，从而请求搜索的结果：

```ts
// 子组件：搜索结果
const SearchResult: React.FC<{ query: string }> = (props) => {
  const [list, setList] = useState<WordType[]>([])

  useEffect(() => {
    // 如果 query 为空字符串，则清空当前的列表
    if (!props.query) return setList([])

    // 查询数据
    fetch('https://api.liulongbin.top/v1/words?kw=' + props.query)
      .then((res) => res.json())
      .then((res) => {
        // 为列表赋值
        setList(res.data)
      })
  }, [props.query])

  // 渲染列表数据
  return list.map((item) => <p key={item.id}>{item.word}</p>)
}
```

定义父组件 **SearchBox** 并渲染 **SearchInput** 组件和 **SearchResult** 组件。在父组件中监听 **SearchInput** 的 `onChange` 事件，并把父组件中定义的处理函数 `onKwChange` 传入进去。同时将父组件中定义的关键字 `kw` 传递给 **SearchResult** 组件。

```ts
// 父组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')

  const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  return (
    <div style={{ height: 500 }}>
      <SearchInput onChange={onKwChange} />
      <hr />
      <SearchResult query={kw} />
    </div>
  )
}
```

发现：

- 每当子组件的文本框内容变化时，都会调用 `props.onChange` 将数据发送给父组件。
- 相应的，父组件通过 **onKwChange** 函数可获取到子组件的值，并把值更新到 `kw` 中。当 kw 变化时，会触发父组件的 rerender。
- 而父组件的 rerender 又会重新生成 **onKwChange** 函数并把函数的引用作为 props 传递给子组件。
- 这样，子组件监听到了 props 的变化，最终导致子组件的 rerender。

子组件根本不需要被重新渲染，因为 `props.onChange` 函数的处理逻辑没有变化，只有它的引用每次都在变化。为了解决这个问题，需要用到 **useCallback** 和 **React.memo**。

### 3.2 问题解决

首先，需要让子组件 SearchInput 被缓存，所以需使用 `React.memo` 进行改造：

```ts
// 子组件：搜索框
const SearchInput: React.FC<SearchInputType> = React.memo((props) => {
  useEffect(() => {
    console.log('触发了 SearchInput 的 rerender')
  })

  return <input onChange={props.onChange} placeholder="请输入搜索关键字" />
})
```

使用 `React.memo` 对组件进行缓存后，如果子组件的 props 在两次更新前后没有任何变化，则被 memo 的组件不会 rerender。

故为了实现 SearchInput 的缓存，还需基于 `useCallback` 将父组件传递进来的 **onChange** 进行缓存。

在父组件中针对 **onKwChange** 调用 useCallback。

```ts
const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setKw(e.currentTarget.value)
}, [])
```

最终文本框内容发生变化时，不会导致 SearchInput 组件的 rerender。
