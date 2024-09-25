# Hooks-useTransition

## 1. 问题引入

useTransition 可将一个更新转为 **低优先级** 的更新，使其可以 **被打断，不阻塞 UI** 对用户操作的响应，能提高用户的使用体验。常用于优化 **视图切换** 时的用户体验。

以下三个标签页组件，其中 Movie 是一个渲染特别耗时的组件，在渲染 Movie 期间页面的 UI 可能会被阻塞， 会造成卡顿的体验。

```ts
import React, { FC } from "react";

export const TabsContainer: FC = () => {

  const [activeTab, setActiveTab] = React.useState('Home')

  const onButtonClick = (name: string) => {
    setActiveTab(name);
  }

  return (
    <>
      <TabButton isActive={activeTab === 'Home'} onClick={() => onButtonClick('Home')}>Home</TabButton>
      <TabButton isActive={activeTab === 'Movie'} onClick={() => onButtonClick('Movie')}>Movie</TabButton>
      <TabButton isActive={activeTab === 'About'} onClick={() => onButtonClick('About')}>About</TabButton>
      <hr />
      {activeTab === 'Home' && <HomeTab />}
      {activeTab === 'Movie' && <MovieTab />}
      {activeTab === 'About' && <AboutTab />}
    </>
  )
}

type TabButtonType = React.PropsWithChildren & { isActive: boolean; onClick: () => void }

const TabButton: FC<TabButtonType> = (props) => {
  return <button className={["btn", props.isActive && 'active'].join(' ')} onClick={props.onClick}>{props.children}</button>
}

const HomeTab: FC = () => {
  return (
    <>HomeTab</>
  )
}

const MovieTab: FC = () => {
  const items = Array(10000).fill('MovieTab').map((item, i) => <p key={i}>{item}</p>)
  return items
}

const AboutTab: FC = () => {
  return (
    <>AboutTab</>
  )
}
```

CSS 内容

```css
.btn {
  margin: 5px;
  background-color: rgb(8, 92, 238);
  color: #fff;
  transition: opacity 0.5s ease;
}

.btn:hover {
  opacity: 0.6;
  transition: opacity 0.5s ease;
}

.btn.active {
  background-color: rgb(3, 150, 0);
}
```

## 2. 语法格式

```ts
import { useTransition } from 'react';

function TabsContainer() {
  const [isPending, startTransition] = useTransition();
  // ....
}
```

**参数：**

调用 `useTransition` 无需传递参数

**返回值（数组）：**

- `isPending` 布尔值：是否存在待处理的 transition，如果值为 true，说明页面上存在待渲染的部分，可给用户展示一个加载的提示；
- `startTransition` 函数：调用此函数，可把**状态的更新**标记为**低优先级**的，不阻塞 UI 对用户操作的响应。

## 3. 问题解决

修改 `TabsContainer` 组件，使用 `useTransition` 把点击按钮后为 `activeTab` 赋值的操作，标记为 **低优先级**。此时 React 会优先响应用户对界面的其他操作，从而保证 UI 不被阻塞：

```ts
export const TabsContainer: FC = () => {

  const [activeTab, setActiveTab] = React.useState('Home');
  const [, startTransition] = useTransition();

  const onButtonClick = (name: string) => {
    // 将某次更新标记为低优先级，防止页面卡顿
    startTransition(() => {
      setActiveTab(name);
    })
  }

  return (
    <>
      <TabButton isActive={activeTab === 'Home'} onClick={() => onButtonClick('Home')}>Home</TabButton>
      <TabButton isActive={activeTab === 'Movie'} onClick={() => onButtonClick('Movie')}>Movie</TabButton>
      <TabButton isActive={activeTab === 'About'} onClick={() => onButtonClick('About')}>About</TabButton>
      <hr />
      {activeTab === 'Home' && <HomeTab />}
      {activeTab === 'Movie' && <MovieTab />}
      {activeTab === 'About' && <AboutTab />}
    </>
  )
}
```

此时点击 Movie 按钮后，状态的更新被标记为 **低优先级**，About 按钮的 **hover 效果和点击操作**都会被立即响应。

## 4. 使用 isPending 展示加载状态

调用 `useTransition` 期间，接收 `isPending` 参数：

```ts
  const [isPending, startTransition] = useTransition();
```

将标签页的渲染，抽离为 `renderTabs` 函数中：

```ts
  const renderTabs = () => {
    if (isPending) return <p>Loading...</p>
    switch (activeTab) {
      case 'Home':
        return <HomeTab />
      case 'Movie':
        return <MovieTab />
      case 'About':
        return <AboutTab />
    }
  }
```

调用 `renderTabs` 函数，渲染标签页到组件中：

```ts
  {renderTabs()}
```

## 5. 注意事项

- 传递给 `startTransition` 的函数必须是同步的。React 会立即执行此函数，并将在其执行期间发生的所有状态更新标记为 transition。如果在其执行期间，尝试稍后执行状态更新（例如在一个定时器中执行状态更新），这些状态更新不会被标记为 transition；
- **标记为 transition 的状态更新被其他状态更新打断。**例如在 transition 中更新图表组件，并在图表组件仍在重新渲染时继续在输入框输入，React将首先处理输入框的更新，之后重新启动对图表组件的渲染工作；
- transition 更新不能用于控制文本输入。
