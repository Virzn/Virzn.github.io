# React 订餐项目

## 项目架构

```
APP
  - 搜索框
  - 食物列表
    - 列表项
      - +/-
  - 购物车
    - 购物车详情页面
      - 头部
      - 列表
    - 结算页
      - 列表
      - 结算底部

```

## 项目准备

不同视口的宽度是不同的，因此需要动态设置。

**src/index.js**

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import './index.css';

// 设置移动端的适配
// 除以几视口的宽度就是多少rem，现在我们设置视口的总宽度为750rem
document.documentElement.style.fontSize = 100 / 750 + 'vw';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
```

**src/App.js**

```js
import React from "react";

const App = () => {
  return (
      <div style={{width: '750rem', height:'200px', backgroundColor: 'red'}}>
        
      </div>
  );
};

export default App;
```

## 食物列表 Meals组件

