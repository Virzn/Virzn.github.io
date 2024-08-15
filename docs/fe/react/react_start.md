# React 入门

## React 简介

React 是一个用于构建用户界面的 JavaScript 库，用来为现代的网络构建用户界面。React还有React Native框架，通过它让我们可以直接使用 JavaScript 来编写原生应用。

React的特点：虚拟DOM、声明式、基于组件、支持服务器端渲染。

> 特点？

1. 虚拟DOM。
2. 声明式。
3. 基于组件。
4. 支持服务器端渲染。
5. 快速、简单、易学。

> 优点

1. 它提高了应用的性能。
2. 可以方便在客户端和服务器端使用。
3. 由于使用 JSX，代码的可读性更好。
4. 使用React，编写 UI 测试用例变得非常容易。

**为什么学？**

1.原生JS操作DOM繁琐，效率低。

2.使用JS直接操作DOM,浏览器会进行大量的重绘重排。

3.原生JS没有组件化编码方案，代码复用低。

## HelloWorld

使用React开发web项目，需引入两个js脚本：

```js
react.development.js
```
  - react核心库，只要使用react就必须要引入。 
  - 下载地址：https://unpkg.com/react@18.0.0/umd/react.development.js

```js
react-dom.development.js
```
  - react的dom包，使用react开发web应用时必须引入。
  - 下载地址：https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js


**React.createElement()**
  - 用来创建一个React元素。
  - 参数：
    1. 元素名/组件名。
    2. 元素中的属性 id class。
    3. 元素的子元素或内容。

**ReactDOM.createRoot()**
  - 创建react根元素，需要一个DOM元素作为一个参数。

**root.render(dom)**
  - 将dom元素渲染至根元素中。

```html

<body>
    <div id="root"></div>
    
    <script src="./script/react.development.js"></script>
    <script src="./script/react-dom.development.js"></script>

    <script>

      const div = React.createElement('div', {}, 'ReactDiv') //创建一个react元素, 通过虚拟DOM转为真实DOM
      
      console.log(div);

      // 获取根元素对应的react元素
      // ReactDOM.createRoot(); 创建react根元素，需要一个DOM元素作为一个参数
      const root = ReactDOM.createRoot(document.getElementById('root'));

      // 将div渲染至根元素
      root.render(div)

    </script>

</body>

```

## 三个API

**React.createElement()**

  - 用来创建一个React元素。
  - 参数：
    1. 元素名/组件名。
    2. 元素中的属性 id class。
      - class需使用className设置。
      - 设置事件时，属性名需为驼峰命名。
    3. 元素的子元素或内容。

  - 注意：
    React 元素最终会转换为真实的DOM元素。
    React 元素一旦创建就无法修改，只能通过新创建的元素进行替换。

```html

<body>
  <button id="btn">顶部按钮</button>  
  <div id="root"></div>
  <script src="./script/react.development.js"></script>
  <script src="./script/react-dom.development.js"></script>
  <script>
    //创建一个react元素, 通过虚拟DOM转为真实DOM
    const button = React.createElement('button', { type: 'button', className: 'he', onClick: ()=>{alert('111')} }, '按钮1')
    // button元素
    const div = React.createElement('div', {}, 'button前div' , button)
    // 获取根元素对应的react元素
    // ReactDOM.createRoot(); 创建react根元素，需要一个DOM元素作为一个参数
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // 将div渲染至根元素
    root.render(div)
    // 获取顶部按钮
    const btn = document.getElementById('btn')
    btn.addEventListener('click', () =>{
      console.log('顶部按钮点击');
      // 点击按钮后，修改div中 的按钮文字
      // 重新创建新元素button
      const button = React.createElement('button', { type: 'button', className: 'he', onClick: ()=>{alert('111')} }, '修改后按钮')      
      const div = React.createElement('div', {}, '新创建div', button)
      // 将button重新渲染，root根元素渲染，清除其他内容
      // 调用render时，React通过diff算法，比较差异，进行差异化更新
      root.render(div)
    })
  </script>
</body>

```


**ReactDOM.createRoot(domName)**

  - 创建根元素，接收参数为一个DOM元素。

**root.render()**

  - 用来将React元素渲染到根元素中。
  - 根元素中所有内容都会被react元素替换。
  - 当重复调用render时，react会通过diff算法进行渲染的差异比较，确保只修改发生变化的元素。

  ```html
<body>
  <div id="root"></div>
  <script src="./script/react.development.js"></script>
  <script src="./script/react-dom.development.js"></script>
  <script>
    //创建一个react元素, 通过虚拟DOM转为真实DOM
    const button = React.createElement('button', { type: 'button', className: 'he', onClick: ()=>{alert('111')} }, '按钮1')
    // button元素
    const div = React.createElement('div', {}, 'button前div' , button)
    // 获取根元素对应的react元素
    // ReactDOM.createRoot(); 创建react根元素，需要一个DOM元素作为一个参数
    const root = ReactDOM.createRoot(document.getElementById('root'));
    // 将div渲染至根元素
    root.render(div)
  </script>
</body>
  ```

## JSX

JSX 是 React.createElement() 的语法糖。

JSX在执行前，都会被babel转换为JS代码。

```html
<body>
  <div id="root"></div>


  <script type="text/babel">

    // 创建一个React元素 <button>按钮</button>
    // 命令式编程
    // const button = React.createElement('button', {},'按钮')

    // 声明式编程，结果导向的编程
    // 在React中可通过JSX（JS扩展）创建React元素，JSX被JS翻译为JS，才能被React执行
    // 引入babel使用JSX，进行翻译
    // const button =  <button>按钮</button>

    const div = <div>
      div
      <button>按钮</button>
    </div>

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(div);
  </script>
</body>
```

**注意事项**
  1. JSX 不是字符串，不用加引号。
  2. JSX 中html标签小写，React组件大写开头。
  3. JSX 中只有一个根标签。
  4. JSX 的标签必须正确结束（自结束标签必须有/）。
  5. JSX 中可以使用{}嵌入表达式 有值就可。
  6. 在表达式是空值、布尔值、undefined不会显示。
  7. JSX 中属性可直接在标签中设置。
      - class需要用className命名。
      - style必须用对象设置，并且属性名使用驼峰命名。
```
style={{backgroundColor: 'red'}}   
```

```html
<body>
  <div id="root"></div>
  <script type="text/babel">
    const name = 'sunwukong'

    function fun(){
      return 'function1'
    }

    const div = <div id='box' onClick={()=> {console.log('通过箭头函数为div绑定点击事件');}} className='box1' style={{backgroundColor: 'red'}} >div
      {name}
      {1+1}
      {fun()}
      </div>
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(div);
  </script>
</body>
```


## 渲染列表

{} 只能用来放js表达式，而不能放语句（if for）。

```html
<body>
  <div id="root"></div>
  <script type="text/babel">
    const name = 'sunwukong'
    const lang = 'chinese'

    let div;
    
    if(lang == 'english') {
      div = <div>english{name}</div>
    }else if (lang == 'chinese'){
      div= <div>chinese{name}</div>
    }
    // jsx自动将数组元素在页面显示
    // 预期：以ul li 标签进行渲染
    const arr = ['name1', 'name2', 'name3']
    // const list = <div>{arr}</div>

    // 修改v1
    // const arr1 = [];
    // for(let i = 0; i< arr.length; i++) {
    //   arr1.push(<li>{arr[i]}</li>)
    // }

    // 修改v2
    // const arr1 = arr.map(item => {
    //   return <li>{item}</li>
    // })

    // const list = <div>{arr1}</div>

    // 修改v3
    const list = <ul>{arr.map(item => <li>{item}</li>)}</ul>

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(list);
  </script>

</body>
```


## 虚拟DOM

在 React 中,操作的元素称为React元素,并不是真正的DOM。

在React通过虚拟DOM 将React元素和原生DOM,进行映射,最后进行真实DOM的转换。
  
虚拟DOM的好处:
  - 降低API复杂度。
  - 解决兼容问题。
  - 提示性能(减少DOM不必要操作)。

每当调用root.render(),页面就会重新渲染。
  React会通过diff算法,进行差异化更新。

比较两次数据时，React会先比较父元素，父元素如果不同，直接所有元素全部替换。

父元素一致，在去逐个比较子元素，直到找到所有发生变化的元素为止。

当新旧两组数据完全一致，所以没有任何DOM对象被修改。


当我们在JSX中显示数组中，数组中每一个元素都需要设置一个唯一key，否则控制台会显示红色警告。

重新渲染页面时，React会按照顺序依次比较对应的元素，当渲染一个列表时如果不指定key，同样也会按照顺序进行比较，如果列表的顺序永远不会发生变化，这么做当然没有问题，但是如果列表的顺序会发生变化，这可能会导致性能问题出现。


在列表的最前边插入了一个新元素，其他元素内容并没有发生变化，但是由于新元素插入到了开始位置，其余元素的位置全都发生变化，而React默认是根据位置比较元素，所以此时，所有元素都会被修改。

为了解决这个问题，React为列表设计了一个key属性，key的作用相当于ID，只是无法在页面中查看，当设置key以后，再比较元素时，就会比较相同key的元素，而不是按照顺序进行比较。

在渲染一个列表时，通常会给列表项设置一个唯一的key来避免上述问题（这个key在当前列表中唯一即可）。

注意：
  1. 开发中一般会采用数据的id作为key。
  2. 尽量不要使用元素的index作为key。
      - 索引会跟着元素顺序的改变而改变，所以使用索引做key跟没有key是一样的，唯一的不同就是，控制台的警告没了。
      - 当元素的顺序不会发生变化时，用索引做key也没有什么问题。


```html
<body>
  <button id="btn">按钮</button>
  <hr />
  <div id="root"></div>
  <script type="text/babel">

    // 创建数据
    const data = ['孙悟空', '猪八戒', '沙悟净']

    // 创建列表
    const list = <ul>
      {data.map(item => <li>{item}</li>)}
    </ul>
    // 获取根元素
    const root = ReactDOM.createRoot(document.getElementById('root'))
    // 渲染元素
    root.render(list)
    document.getElementById('btn').onclick = function () {
      // 重新渲染页面
      // 创建数据
      const data = ['孙悟空', '猪八戒', '沙悟净']
      // 创建列表
      const list = <ul>
        {/* data.map(item => <li>{item}1</li>) */}
        {data.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      // 渲染元素
      root.render(list)
    }
  </script>

</body>

```