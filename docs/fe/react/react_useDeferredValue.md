# Hooks-useDeferredValue

## 1. 问题引入

在搜索框案例中，SearchResult 组件会根据用户输入的 **关键字**，循环生成大量的 p 标签，因此是一个渲染比较耗时的组件。

```ts
import { FC, useState } from "react";

export const SearchBox: FC = () => {

  const [kw, setKw] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }
  return (
    <div>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      <SearchResults query={kw} />
    </div>
  )
}

const SearchResults: FC<{query: string}> = (props) => {
  if (!props.query) return
  const items = Array(10000).fill(props.query).map((item, i) => <p key={i}>{item}</p>)
  return items
}
```

此案例不能使用 `useTransition` 进行性能优化，因为 `useTransition` 会把状态更新标记为 **低优先级，被标记为 transition 的状态更新会被其他状态更新打断**。因此在高频输入时，会导致 **中间的输入状态丢失** 的问题。

```ts
import { FC, useState, useTransition } from "react";

export const SearchBox: FC = () => {

  const [kw, setKw] = useState('');
  const [, startTransition] = useTransition();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {})
    setKw(e.target.value);
  }
  return (
    <div>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      <SearchResults query={kw} />
    </div>
  )
}

const SearchResults: FC<{query: string}> = (props) => {
  if (!props.query) return
  const items = Array(10000).fill(props.query).map((item, i) => <p key={i}>{item}</p>)
  return items
}
```

## 2. 语法格式

`useDeferredValue` 提供一个 state 的延迟版本，根据其返回的 **延迟的 state 能够推迟更新 UI 中的某一部分**，从而达到性能优化的目的。

```ts
import {useState, useDeferredValue} from 'react';

function SearchPage() {
  const [kw, setKw] = useState('')
  // 根据 kw 得到延迟的 kw
  const defererKw = useDeferredValue(kw)
}
```

`useDeferredValue` 的返回值为一个延迟版本的状态：

- 在组件首次渲染期间，返回值将与传入的值相同
- 在组建更新期间，React 将 **首先使用旧值** 重新渲染 UI 结构，这能 **跳过** 某些复杂组件的 rerender，从而提高渲染效率。随后，React 将使用新值更新 deferredValue，并在后台使用新值重新渲染是一个 **低优先级的更新**。这也意味着如果在后台使用新值更新时 value 再次改变，他会打断那次更新。

## 3. 问题解决

按需导入 `useDeferredValue`，并进行搜索功能的性能优化：

```ts
import { FC, useState, useDeferredValue, memo } from "react";

export const SearchBox: FC = () => {

  const [kw, setKw] = useState('');
  // 基于kw，创建一个延迟的 kw 值
  const deferredKw = useDeferredValue(kw);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }
  return (
    <div>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      {/* 将延迟版的 kw 值，传递给子组件 */}
      <SearchResults query={deferredKw} />
    </div>
  )
}

const SearchResults: FC<{query: string}> = memo((props) => {
  if (!props.query) return
  const items = Array(10000).fill(props.query).map((item, i) => <p key={i}>{item}</p>)
  return items
})
```

## 4. 表明内容已过时

当 `kw` 的值频繁更新时，`deferredKw` 的值会明显滞后，此时用户在页面上看到的列表数据并不是最新的，为了防止用户感到困惑，可以给内容添加 opacity 不透明度，**表明当前看到的内容已过时。**

```ts
import { FC, useState, useDeferredValue, memo } from "react";

export const SearchBox: FC = () => {

  const [kw, setKw] = useState('');
  // 基于kw，创建一个延迟的 kw 值
  const deferredKw = useDeferredValue(kw);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }
  return (
    <div>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      {/* 将延迟版的 kw 值，传递给子组件 */}
      <div style={{opacity: kw !== deferredKw ? 0.3 : 1, transition: 'opacity 0.5s ease'}}>
      <SearchResults query={deferredKw} />
      </div>
    </div>
  )
}

const SearchResults: FC<{query: string}> = memo((props) => {
  if (!props.query) return
  const items = Array(10000).fill(props.query).map((item, i) => <p key={i}>{item}</p>)
  return items
})
```
