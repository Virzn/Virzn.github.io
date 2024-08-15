# React 类组件

注意 Props、 State、 响应函数、等在类组件和函数组件中使用的区别。

```js
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='app'>
        h1111111
      </div>
    )
  }
}

export default App
```

## Props

类组件中的 **props** 是存储在类的实例对象中的，可直接通过 `this.props` 进行访问。

**App.js**

```js
import React, { Component } from 'react'
import './App.css'
import User from './components/User'

class App extends Component {
  render() {
    return (
      <div className='app'>
        h1111111
        <User name='祝' age='11' sex='4'></User>
      </div>
    )
  }
}

export default App
```

**User.js**

```js
import React, { Component } from 'react'

export class User extends Component {
  render() {
    console.log(this.props);
    return (
      <ul>
        <li>姓名：{this.props.name}</li>
        <li>性别：{this.props.sex}</li>
        <li>年龄：{this.props.age}</li>
      </ul>
    )
  }
}

export default User
```

## State

在类组件中， **state** 统一存储在实例对象的state属性中，可通过 `this.state` 访问，通过 **this.setState()** 进行修改。

当通过 **this.setState()** 修改State时，只会修改需要修改的，其他保留，仅限于直接存储于state中的属性。

**User.js**

```js
import React, { Component } from 'react'

export class User extends Component {

  state = {
    count: 0,
  }

  render() {
    console.log(this.state.count);
    return (
      <div>
        <h1>{this.state.count}</h1>
      </div>
    )
  }
}

export default User
```

## 响应函数

函数组件中，响应函数直接以函数的形式定义在组件中，但是在类组件中，响应函数是以类的方法进行定义。

```js
import React, { Component } from 'react'

export class User extends Component {

  state = {
    count: 0,
  }

  clickHandler = () => {
    // this.setState({count: this.state.count + 1})
    this.setState( prevCount => {
      return {
        count : prevCount.count + 1
      }
    })
  };

  render() {
    console.log(this.state.count);
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.clickHandler}>点击</button>
      </div>
    )
  }
}

export default User
```

## Ref DOM

获取Dom
1. 创建一个属性，存储DOM对象
2. 将属性设置为指定元素的ref值



```js
import React, { Component } from 'react'

export class User extends Component {
  // 存储DOM对象
  divRef = React.createRef()

  clickHandler = () => {
    console.log(this.divRef.current);
  };

  render() {
    return (
      // 设置ref
      <div ref={this.divRef}>
        <button onClick={this.clickHandler}>点击</button>
      </div>
    )
  }
}

export default User
```
