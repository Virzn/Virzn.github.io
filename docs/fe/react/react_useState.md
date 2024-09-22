# Hooks-useState

## 准备工作

**步骤1**

基于 Vite 创建 React + TS 项目

**步骤2**

在 Vite 项目中配置 **@** 路径提示

1. 安装 node 的类型声明：

``` 
npm i -D @types/node
```
2. 配置 vite.config.ts 文件

``` ts
// 1. 以 ES6 模块化的方式，从 node 的 path 模块中，导入 join 函数
import { join } from 'path'

export default defineConfig({
  plugins: [react()],
  // 2. 在 resolve.alias 对象下，配置 @ 的指向路径
  resolve: {
    alias: {
      '@': join(__dirname, './src/'),
    },
  }
})

```

**步骤3**

配置 config.json 文件，在 compilerOptions 节点下，新增 `"baseURl":"."` 和 `"paths": { "@/*": [ "src/*"]}` 两项

``` ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    //  other.......
  },
  "include": ["src"]
}

```

## 基本用法

**useState** 使函数组件有自己的状态， 他是一个管理状态的 hooks API。 通过 useState 可实现状态的初始化、读取、更新。

``` ts
const [ stateName, setStateName] = useState(default)
```

## 状态改变时，会触发函数组件的重新执行

在函数组件中使用 setState 定义状态变化后，均会触发函数组件的重新执行，**从而根据最新的数据更新渲染 DOM 结构**。

注意：当函数式组件被重新执行时，不会重复调用 useState() 给数据赋初值，会复用上一次的 state 的值。


## 以函数的形式为状态赋初始值

使用 useState 定义状态时，除了可以直接给定初始值，还可通过函数返回值的形式，为状态赋初始值。

``` ts
const [ stateName, setStateName] = useState(() => default)
```

注意：以函数的形式为状态赋初始值时，只有组件首次被渲染才会执行 fn 函数；当组件被更新时，会以更新前的值作为状态的初始值，赋初始值的函数不会执行。

## useState 异步变更状态

调用 useState() 会返回一个 变更状态的函数，这个函数内部以异步的形式修改状态。

## 结合 useEffect 监听状态变化

useEffect 可监听依赖项状态的变化，并执行对应的回调函数。

``` ts
useEffect(() => { /* 依赖项变化时，执行回调函数 */}, [依赖项])
```

useEffect 在组件首次渲染时，也会执行。

## 注意事项

### 1. 更新对象类型的值

如果要更新对象类型的值，并触发组件的重新渲染，则必须使用展开运算符或 Object.assign() 生成一个新对象，用新对象覆盖旧对象，才能正常触发组件的重新渲染。

``` ts
export const UserInfo: React.FC = () => {
  const [ user, setUser] = useState({
    name: 'zhangsan',
    age: 18,
    sex: '男',
  })

  const onChangeUserInfo = () => {
    // 直接修改无作用
    user.name = 'lisi';
    // 方法1
    // setUser({...user})
    // 方法2
    setUser(Object.assign({}, user))

  }
  return (
    <>
      <h1>用户信息</h1>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>性别：{user.sex}</p>
      <hr />
      <button onClick={onChangeUserInfo}>修改用户信息</button>
    </>
  )
}
```


### 2. 值更新不及时

当连续多次以相同的操作更新状态值时，React 内部会对传递过来的新值进行比较，如果值相同，则会屏蔽后续的更新行为，从而防止组件频繁渲染的问题。

``` ts
export const Count: React.FC = () => {

  const [ count, setCount ] = useState(0);

  const countChange = () => {
    // 0 -> 1
    setCount(count + 1);
    // 1 -> 2
    setCount(count + 1);
  }

  return (
    <>
      <h1>Count值：{count}</h1>
      <button onClick={countChange}>+1</button>
    </>
  );
}
```

这段代码只能让其从0到1，因为其为异步的，setCount 异步更新状态值，前后两次调用传递进去的值均为1。React 内部遇到两次相同的状态，会默认阻止组件的再次更新。

可使用**函数的方法**给状态赋新值。当函数执行时才通过函数的形参，拿到当前的状态值，并基于它返回的新的状态值。

``` ts
export const Count: React.FC = () => {

  const [ count, setCount ] = useState(0);

  const countChange = () => {
    // // 0 -> 1
    // setCount(count + 1);
    // // 1 -> 2
    // setCount(count + 1);
    // setCount(newValue)
    // setCount((prev) => 基于prev计算新值)
    // 修改状态值时，如果新值依赖于旧值（基于旧值计算），此时需通过 fn 函数的形参拿到旧值进行计算
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <h1>Count值：{count}</h1>
      <button onClick={countChange}>+1</button>
    </>
  );
}
```

### 3. 使用 setState 实现组件强制更新

在函数组件中，可通过 useState 模拟 forceUpdata 的强制刷新操作。因为只要 useState 的状态发生了变化，就会触发函数组件的重新渲染，从而达到强制刷新的目的。

``` ts
export const FUpdate: React.FC = () => {
  
  const [, forceUpdata] =  useState([])
  const onRefresh = () => forceUpdata([])
  return (
    <>
      <button onClick={onRefresh}>强制刷新组件----{Date.now()}</button>
    </>
  )
}
```

每次传入的对象地址均不同，故会使组件刷新。