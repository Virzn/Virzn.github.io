# React Css

## create-react-app

使用 **create-react-app** 进行react项目创建。

`npx create-react-app react-app`

## 内联样式


```js
import React from "react";

const App = () => {
  const [redBoder, setReadBorder] = React.useState(false);

  const pStyle = {
    color: "red",
    backgroundColor: "#bfa",
    border: redBoder ? "red solid 1px" : "black solid 1px"
  };

  const clickHandler = () => {
    setReadBorder(!redBoder);
  }

  return (
    <div>
      <p style={pStyle}>段落</p>
      <button onClick={clickHandler}>按钮</button>
    </div>
  );
};

export default App;
```

## 外部样式表

```js
import React from "react";
import './App.css'

const App = () => {
  const [redBoder, setReadBorder] = React.useState(false);
  const clickHandler = () => {
    setReadBorder(!redBoder);
  }
  return (
    <div>
      <p className={`p1 ${redBoder ? '' : 'blueBorder'}`}>段落</p>
      <button onClick={clickHandler}>按钮</button>
    </div>
  );
};
export default App;
```

`import './App.css'` 会引起样式表冲突。

适用于引入通用样式，不适合大范围使用。

## CSS-Module

CSS模块

使用步骤：
  1. 创建一个 **xxx.module.css**
  2. 在组件中引入css `import classes from './App.module.css';`
  3. 通过classes来设置类 `className={classes.p1}`

CSS模块可以动态的设置唯一的class值 `App_p1__9v2n6`

**src/App.module.css**

```css
.p1{
  color: red;
  background-color:  #bfa;
  border: red solid 1px;
}
``` 

**src/App.js**
```js
import React from "react";
import classes from './App.module.css'
import A from './A'

const App = () => {
  const [showBorder, setShowBorder] = React.useState(false)
  const clickHandler = () => {
    setShowBorder(!showBorder);
  }
  return (
    <div>
      <A />
      <p className={`${classes.p1} ${showBorder ? classes.Broder : ''}`}>段落</p>
      <button onClick={clickHandler}>按钮</button>
    </div>
  );
};

export default App;
```

我们可以将Css Module理解为外部样式表的一种进化版，它的大部分使用方式都和外部样式表类似，不同点在于使用CSS Module后，网页中元素的类名会自动计算生成并确保唯一，所以使用Css Module后，我们再也不用担心类名重复了。

## Fragment

在React中，JSX必须有且只有一个根元素。这就导致了在有些情况下我们不得不在子元素的外部添加一个额外的父元素。

```js
import React from "react";

const App = () => {
  return (
    <div>
      <div>组件</div>
      <div>组件</div>
      <div>组件</div>
    </div>
  );
};

export default App;
```

将某个组件作为其他组件的容器，但是不返回多余的div。

1. 自定义组件

**src/Out.js**

```js
import React from 'react';

const Out = (props) => {
    return props.children;
};

export default Out;
```

**src/App.js**

```js
import React from 'react';
import Out from './Out'

const App = () => {
    return (
        <Out>
           <div>第一个组件</div>
           <div>第二个组件</div>
           <div>第三个组件</div>
        </Out>
    );
};

export default App;
```

2. Fragment


**src/App.js**

```js
import React from 'react';

const App = () => {
    return (
        <React.Fragment>
           <div>第一个组件</div>
           <div>第二个组件</div>
           <div>第三个组件</div>
        </React.Fragment>
    );
};

export default App;
```

React.Fragment
  - 是一个专门用来作为父容器的组件，它只会将它里边的子元素直接返回，不会创建任何多余的元素。
  - 当我们希望有一个父容器，但同时又不希望父容器在网页中产生多余的结构时，就可以使用Fragment。

:::tip
<></> 和 <React.Fragment></React.Fragment> 相同
:::