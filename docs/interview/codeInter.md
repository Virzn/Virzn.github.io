### 对低代码的理解：

1. 函数复用=》组件复用=》UI组件库=》低代码
2. 方便不懂技术的人进行开发，减少基础程序员的数量
3. 低代码是对用的人来说的，设计者需要考虑很多情况，写的代码会非常多，整体框架代码会非常大，新增一个小功能的话需要写很多相关配置。
4. 简单的场景，复杂的场景比较难实现。
5. 食之无味弃之可惜。

### 排序

#### 冒泡排序：**每轮比较相邻的元素。如果第一个比第二个大，就交换他们两个**

复杂度：时间复杂度：最好O(n^2)，最坏O(n)   空间复杂度：O(1)

```javascript
function bubble(arr){
//外层循环，控制趟数，每一次找到一个最大值
  for (var i = 0; i < arr.length - 1; i++) {
    // 内层循环,控制比较的次数，并且判断两个数的大小
    for (var j = 0; j < arr.length - 1 - i; j++) {
      // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
  	}
	}
  return arr
}
```

#### 选择排序：从未排序序列中找到最大的元素，放到已排序序列的末尾

复杂度：时间复杂度：最好O(N^2)，最坏O(n^2)   空间复杂度：O(1)

```javascript
function selsetSort(arr){
	var index;
	for(var i=0;i<arr.length-1;i++){
		index=i;
		for(var j=i+1;j<arr.length;j++){
			if(arr[index]>arr[j]){//寻找最小值
				index=j;//保存最小值的索引
			}
		}
		if(index!=i){
      var temp =arr[i];
      arr[i]=arr[index];
      arr[index]=temp;
	  }
	}
	return arr;
}
```

#### 插入排序：假设前n-1个元素已有序，现将第n个元素插入到前面已经排好的序列中，使得前n个元素有序

复杂度：时间复杂度：最好O(n)，最坏O(n^2)    空间复杂度：O(1)

```javascript
function insertSort(arr) {
    for (var i=1;i<arr.length; i++) {
      var temp=arr[i];
      var j=i-1;//默认已排序的元素
      while (j>=0 && arr[j]>temp) {  //在已排序好的队列中从后向前扫描
        arr[j+1]=arr[j]; //已排序的元素大于新元素，将该元素移到一下个位置
        j--;
      }
      arr[j+1]=temp;
    }
    return arr
  } 
```

#### 归并排序：先将序列一次次分成子序列，直到子序列长度为1；再将已有序的子序列合并，得到完全有序的序列

复杂度：时间复杂度：O(nlogn)   空间复杂度：O(1)

```javascript
function mergeSort(arr){
  if( arr.length < 2 ) return arr
  let mid = math.floor( arr.length/2 )

  let merge = function( leftArr,rightArr ){
    let resultArr = []
    while(leftArr.length && rightArr.length){
      resultArr.push( leftArr[0] <= rightArr[0] ? leftArr.shift() : resultArr.shift())
    }
    return resultArr.concat(leftArr).concat(resultArr)
  }
  return merge( mergeSort(arr.slice(0,mid)), mergeSort(arr.slice(mid)))
}
```

#### 快速排序：找一个基准，把数组划分为两个比基准大和比基准小的数组，再在这两个新的数组中进行数组划分操作

复杂度：时间复杂度：O(nlogn)    空间复杂度：O（logn）~ O(n) 

```javascript
function quickSort( arr ){
  if( arr.length <=1 ) return arr;
  let mid = Math.floor( arr.length/2 );
  let pivot = arr.splice(mid,1)[0];//以最中间的为基准
  let left =[];
  let right = [l;
  for( let i=0;i<arr.length;i++){
    if( arr[i] <pivot ){
      left.push( arr[i] );
    }else{
      right.push( arr[i] );
    }
  return quickSort( left ).concat( [pivot], quickSort( right ));
}
```

### 深度优先搜索和广度优先搜索

```javascript
function DFS(node) {
  let nodes = []
  if (node !== null) {
  let stack = []
  stack.push(node)
  while (stack.length !== 0) {
    let item = stack.pop()
    nodes.push(item)
    let children = item.children
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i])
    }
  }
	return nodes
  }
}
```

```javascript
function BFS(node) {
  let nodes = []
  if (node != null) {
    let queue = []
    queue.unshift(node)
    while (queue.length != 0) {
      let item = queue.shift()
      nodes.push(item)
      let children = item.children
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
	}
  return nodes
}
```

### 二叉树遍历

```javascript
var preorderTraversal = function(root) {
    // let arr = []
    // var fun =(node)=>{
    //     if(node){
    //         //先添加根节点
    //         arr.push(node.val)
    //         //遍历左子树
    //         fun(node.left)
    //         //遍历右子树
    //         fun(node.right)
    //     }
    // }
    // fun(root)
    if(!root) return []
    let arr = []
    let stack=[root]
    while(stack.length){
        let o =stack.pop()
        arr.push(o.val)
        o.right&&stack.push(o.right)
        o.left&&stack.push(o.left)
    }
    return arr
};

```

```javascript

var inorderTraversal = function(root) {
    var arr = []
    // var fun=(node)=>{
    //     if(node){
    //         fun(node.left)
    //         arr.push(node.val)
    //         fun(node.right)
    //     }
    // }
    // fun(root)
    var stack =[]
    let o = root
    while(stack.length||o){
        while(o){
            stack.push(o)
            o=o.left
        }
        const n = stack.pop()
        arr.push(n.val)
        o=n.right
    }
    return arr
};

```



```js
var postorderTraversal = function(root) {
    let arr = []
    // var fun=(node)=>{
    //     if(node){
    //         fun(node.left)
    //         fun(node.right)
    //         arr.push(node.val)
    //     }
    // }
    // fun(root)
    if(!root) return []
    let stack = [root]
    while(stack.length){
        const o=stack.pop()
        arr.unshift(o.val)
        o.left&&stack.push(o.left)
        o.right&&stack.push(o.right)
    }
    return arr
};
```



### 树形结构转化

```javascript
function createTree(arr) {
  const map = {};
  let root = null;
  for (const node of arr) {
    map[node.name] = {
      name: node.name,
      children: []
    }
  }
  for (const node of arr) {
    if (!node.parent) {
      root = map[node.name]
    } else {
      const parent = map[node.parent]
      if (parent) {
        parent.children.push(map[node.name])
      }
    }
  }
  const removeCHild = node => {
    if (node.children.length === 0) {
      delete node.children;
    } else {
      for (const child of node.children) {
        removeCHild(child)
      }
    }
  }
  removeCHild(root)
  return root;
}

const arr1 = [{name: 'father'}, 
              {name: 'son1',parent: 'father'}, 
              {name: 'son2',parent: 'father'}, 
              {name: 'son3',parent: 'son1'}];

console.log(JSON.stringify(createTree(arr1)));
```

### 手写new

```javascript
//Fun为构造函数, args表示传参
function myNew(Fun, ...args) {
    // 1.在内存中创建一个新对象
    let obj = {};
    // 2.把新对象的原型指针指向构造函数的原型属性
    obj.__proto__ = Fun.prototype;
    // 3.改变this指向，并且执行构造函数内部的代码（传参）
    let res = Fun.apply(obj, args);
    // 4.判断函数执行结果的类型
    return res instanceof Object ? res : obj;
}
let obj = myNew(One, "XiaoMing", "18");
console.log("newObj:", obj);
```

### 手写apply

```javascript
/*
apply 函数的实现步骤：

1,判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2,判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3,将函数作为上下文对象的一个属性。
4,判断参数值是否传入
5,使用上下文对象来调用这个方法，并保存返回结果。
6,删除刚才新增的属性
7,返回结果
*/

// apply 函数实现
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```

### 手写bind

```javascript
/*
bind 函数的实现步骤：

1,判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2,保存当前函数的引用，获取其余传入参数值。
3,创建一个函数返回
4,函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，
  这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
*/
// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
      fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
```

### 手写call

```javascript
/**
call 函数的实现步骤：
1,判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2,判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3,处理传入的参数，截取第一个参数后的所有参数。
4,将函数作为上下文对象的一个属性。
5,使用上下文对象来调用这个方法，并保存返回结果。
6,删除刚才新增的属性。
7,返回结果。
*/

// call函数实现
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
      result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```

### 手写instanceof

```javascript
function myInstanceof(left, right) {
  //排除基本数据类型和null，直接返回false
  if (!['function', 'object'].includes(typeof left) || left === null) return false
  let proto = Object.getPrototypeOf(left) // 获取对象的原型
  let prototype = right.prototype; // 获取构造函数的 prototype 对象
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
console.log( myInstanceof(null, Object) )
```

### 手写柯里化转换

```javascript
//将函数进行柯里化转换
function hyCurrying(fn){
  return function curryFn(...args){
    if(args.length >= fn.length){
      return fn.apply(this, args)
    }else{
      return function(...newArgs){
        return curryFn.apply(this, args.concat(newArgs))
      }
    }
  }
}
```

### 递归实现深拷贝

```javascript
// 递归调用
const deepCopy = (obj) => {
  // 判断传入的值是否为一个对象
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  // 判断对象的类型 注意这里不考虑包装类对象
  if (Object.prototype.toString.call(obj) === "[object Date]") {
    return new Date(obj);
  }
  if (Object.prototype.toString.call(obj) === "[object RegExp]") {
    return new RegExp(obj);
  }
  if (Object.prototype.toString.call(obj) === "[object Undefined]") {
    return new Error(obj);
  }
  // 判断obj是对象和函数
  let newObj = Array.isArray(obj)  ? [] : {}
  for(let item in obj){
    if(obj.hasOwnProperty(item)){//key为obj非原型链上的属性
      newObj[item] = typeof obj[item] === 'object' ? newObj[item] = deepCopy(obj[item]) : newObj[item] = obj[item]
    }
  }
  return newObj
};
```

### 实现vue的响应式

```javascript
class myVue{
  constructor(obj_instance){
    this.$data = obj_instance.data()
    Observer(this.$data)
    Compile(obj_instance.el, this)
  }
}

//数据劫持--监听实例中的数据
function Observer(data_insatnce){
  //数据劫持的出口 
  if(!data_insatnce || typeof data_insatnce != 'object') return 
  const dependency = new Dependency()

  Object.keys(data_insatnce).forEach(key=>{
    let value = data_insatnce[key]
    Observer(value)
    Object.defineProperty(data_insatnce, key, {
      enumerable:true,
      configurable:true,
      get: () => {
        Dependency.temp && dependency.addSub(Dependency.temp)
        return value
      },
      set: newValue => {
        value = newValue
        Observer(newValue)
        dependency.notify()
      }
    })
  })
}

//html模板解析--替换DOM
function Compile(element, vm){
  vm.$el = document.querySelector(element)
  const fragment = document.createDocumentFragment()
  let child
  while(child = vm.$el.firstChild){
    //append会改变原来的dom，此相当于把第一个结点从原dom中移除
    fragment.append(child)
  }
  fragment_compile(fragment)
  //替换文档碎片内容
  function fragment_compile(node){
    const pattern = /\{\{\s*(\S+)\s*\}\}/
    if(node.nodeType === 3){//结点为文本结点
      const xxx = node.nodeValue//读取结点的文本值
      const result_regex = pattern.exec(node.nodeValue)
      if(result_regex){
        const arr = result_regex[1].split('.')
        const value = arr.reduce((total,current)=>total[current],vm.$data)
        node.nodeValue = xxx.replace(pattern, value)
        //创建订阅者
        new Watcher(vm, result_regex[1], newValue =>{
          node.nodeValue = xxx.replace(pattern, newValue)
        })
      }
      return 
    }
    if(node.nodeType === 1 && node.nodeName === 'INPUT'){
      const attr = Array.from(node.attributes)
      attr.forEach(i=>{
        if(i.nodeName === 'v-model'){
          const value = i.nodeValue.split('.').reduce(( total, current )=>total[current], this.vm.$data)
          node.value = value
          new Watcher(vm, i.nodeValue, newValue => {
            node.value = newValue
          })
          node.addEventListener('input', (e)=>{
            const arr1 = i.nodeValue.split('.')
            const arr2 =arr1.slice(0,arr1.length-1)
            const final = arr2.reduce((total,current)=>total[current],vm.$data)
            final[arr1[arr1.length-1]] = e.target.value
          })
        }
      })
    }
    node.childNodes.forEach(child => fragment_compile(child))
  }
  vm.$el.appendChild(fragment)
}

//依赖--收集和通知订阅者
class Dependency{
  constructor(){
    this.subscribers = []
  }
  addSub(sub){
    this.subscribers.push(sub)
  }
  notify(){
    this.subscribers.forEach(sub => sub.update())
  }
}

//订阅者类
class Watcher{
  constructor(vm, key, callback){
    this.vm = vm
    this.key = key
    this.callback = callback
    Dependency.temp = this
    key.split('.').reduce((total, current) => total[current],vm.$data)
    Dependency.temp = null
  }
  update(){
    const value = this.key.split('.').reduce((total, current) => total[current],this.vm.$data)
    this.callback()
  }
}
```

### 手写diff算法

```javascript
/**
新旧结点替换规则
  1，如果新旧节点不是同一节点，那么暴力删除旧结点，创建新节点
  2，只能同级比较，不能够跨层比较，如果跨层那就暴力删除旧结点，创建新节点。
  3，如果是相同结点
    新节点没有children，没有就直接把旧的替换成新的文本
    新节点有children，旧的也有children（diff核心）
      旧前和新前：匹配：旧前指针++，新前指针++
      旧后和新后：匹配：旧前指针--，新前指针--
      旧前和新后：匹配：旧前指针++，新前指针--
      旧后和新前：匹配：旧后指针--，新前指针++
      以上条件都不满足，查找：
      创建或删除：
    新的有children，旧的没有，创建子元素添加，删除旧内容


  如果要提升性能，一定要加入key，key是唯一标识，在更改前后，确认是不是同一节点。
*/

//node结点格式
let vnode1 = h('h1', {}, '哈哈')
let vnode2 = h('h1', {}, [
  h('p',{},'文字')
])
//h函数的作用：对传入的参数进行处理，并将参数返回到vnode函数中生成虚拟结点
var h = function(sel, data, params){
  //h函数的第三个参数是字符串时，意味着他没有子元素
  if(typeof params === 'string'){
    return vnode(sel, data, undefined, params, undefined, data.key)
  }else if(Array.isArray(params)){
    //h函数的第三个参数为数组，意味着有子元素
    let children = []
    for(let item of params){
      children.push(item)
    }
    return vnode(sel, data, children, undefined, undefined, data.key)
  }
}

//构建node，生成虚拟结点（当前结点标签名，结点的属性，子节点，当前结点下的文本，当前虚拟结点的真实结点，当前结点的key）
var vnode = function(sel, data, children, text, elm, key){
  let key = data.key
  return {sel, data, children, text, elm, key}
}

//vnode为新节点，就是要创建的结点
var createElement = function(vnode){
  //创建dom结点
  let domNode = document.createElement(vnode.sel)
  //判断有没有子节点，children属性是不是为undefined
  if(vnode.children == undefined){
    domNode.innerText = vnode.text
  }else if(Array.isArray(vnode.children)){//新的节点有children
    //说明内部有子节点，递归创建子节点
    for(let child of vnode.children){
      let childDom = createElement(child)
      domNode.appendChild(childDom)
    }
  }
  //补充elm属性
  vnode.elm = domNode
  return domNode
}

//patch函数为对比的入口
var patch = function(oldVnode, newVnode){
  //如果oldVnode没有sel，证明是非虚拟结点（让其变成虚拟结点）
  if(oldVnode.sel == undefined){
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),//sel
      {},//data
      [],//params
      undefined,//text
      oldVnode//elm
    )
  }
  //判断旧虚拟结点 和 新的虚拟结点 是不是同一节点
  if(oldVnode.sel === newVnode.sel){
    patchVnode(oldVnode,newVnode)
  }else{
    //暴力替换，把新的虚拟结点创建为dom结点
    let newVnodeElm = createElement(newVnode)
    //获取旧的虚拟结点 。elm就是真正的结点
    let oldVnodeElm = oldVnode.elm
    //创建新的节点
    if(newVnodeElm){
      oldVnodeElm.parentNode.insertBefore(newVnodeElm,oldVnodeElm)
    }
    //删除旧结点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}

//patchVnode用来比较两个虚拟结点，并更新其新子节点对应的真实dom结点
var patchVnode = function(oldVnode,newVnode){
  //判断新节点有没有children
  if(newVnode.children === undefined){
    if(newVnode.text !== oldVnode.text){
      oldVnode.elm.innerText = newVnode.text
    }
  }else{//新的有子节点
    if(oldVnode.children !== undefined && oldVnode.children.length>=0){//新的虚拟结点有children，旧的也有
      //diff核心
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    }else{//新的虚拟结点有children，旧的没有
      //把旧结点的内容清空
      oldVnode.elm.innerHTML = ""
      //遍历新的子节点，创建dom元素，添加到页面
      for( let child of newVnode.children){
        let childDom = createElement(child)
        oldVnode.elm.appendChild(childDom)
      }
    }
  }
}

//判断两个虚拟结点是否为同一节点
var sameVnode = function(vnode1, vnode2){
  return vnode1.key == vnode2.key
}


var updateChildren = function(parentElm, oldCh, newCh){
  let oldStartIdx = 0//旧前指针
  let oldEndIdx = oldCh.length-1//旧后指针
  let newStartIdx = 0//新前指针
  let newEndIdx = newCh.length-1//新后指针
  let oldStartVnode = oldCh[0]//旧前虚拟结点
  let oldEndVnode = oldCh[oldEndIdx]//旧后虚拟结点
  let newStartVnode = newCh[0]//新前虚拟结点
  let newEndVnode =newCh[newEndIdx]//新后虚拟结点
  while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
    
    if(oldStartVnode==undefined){
      oldStartVnode = oldCh[++oldStartIdx]
    }else if(oldEndVnode==undefined){
      oldEndVnode = oldCh[--oldEndIdx]
    }else if(sameVnode(oldStartVnode, newStartVnode)){//旧前和新前对比
      patchVnode(oldStartVnode, newStartVnode)  
      if(newStartVnode) newStartVnode.elm = oldEndVnode?.elm
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]

    }else if(sameVnode(oldEndVnode, newEndVnode)){//旧后和新后
      patchVnode(oldEndVnode, newEndVnode)  
      if(newEndVnode) newEndVnode.elm = oldEndVnode?.elm
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]

    }else if(sameVnode(oldStartVnode, newEndVnode)){//旧前和新后
      patchVnode(oldStartVnode, newEndVnode)  
      if(newEndVnode) newEndVnode.elm = oldStartVnode?.elm
      //把旧前指定的结点移动到旧后指向的结点的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    }else if(sameVnode(oldEndVnode, newStartVnode)){//旧后和新前
      patchVnode(oldEndVnode, newStartVnode)  
      if(newStartVnode) newStartVnode.elm = oldEndVnode?.elm
      //将旧后指定的结点移动到旧前指向的结点的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    }else{//以上都不满足则查找
      //创建一个对象，存放虚拟结点
      const keyMap = {} 
      for(let i = oldStartIdx;i<=oldEndIdx;i++){
        const key = oldCh[i]?.key
        if(key) keyMap[key] = i
      }
      //在旧结点中查找新前匹配的结点
      let idxInOld = keyMap[newStartVnode.key]
      if(idxInOld){
        //如果有，说明该数据在新旧虚拟结点中都存在  
        const elmMove = oldCh[idxInOld]
        patchVnode(elmMove, newStartVnode)
        oldCh[idxInOld] = undefined
        parentElm.insertBefore(elmMove.elm, oldStartVnode)

      }else{
        //如果没有找到，则是新节点，创建
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      //新数据指针+1
      newStartVnode = newCh[++newStartIdx]
    }
  }
  //结束while的两种情况（新增和删除）
  if(oldStartIdx > oldEndIdx){
    const before = newCh[newEndIdx=1]?newCh[newEndIdx].elm:null
    for(let i = newStartIdx; i<=newEndIdx;i++){
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  }else{
    //进入删除
    for(let i = oldStartIdx; i<=oldEndIdx;i++){
      parentElm.removeChild(oldCh[i].elm)
    }
  }
}
```

### 手写promise（简单版）

```javascript
class myPromise{
  static PENGING = '待定'
  static FULFILED = '成功'
  static REJECTED = '拒绝'
  constructor(func){
    this.status = myPromise.PENGING
    this.result = null
    this.resolveCallbacks = []//保存回调函数
    this.rejectCallbacks = []//保存回调函数
    //加入try，catch原因，在原生的构造函数中throw一个异常会直接执行reject
    try{
      func(this.resolve.bind(this), this.reject.bind(this))
    }catch(error){
      this.reject(error)
    }
  }
  resolve(result){
    setTimeout(()=>{
      if(this.status = myPromise.PENGING){
        this.status = myPromise.FULFILED
        this.result = result
        this.resolveCallbacks.forEach(callback => { callback(result) })
      }
    })
  }
  reject(result){
    setTimeout(()=>{
      if(this.status = myPromise.PENGING){
        this.status = myPromise.REJECTED
        this.result = result
        this.rejectCallbacks.forEach(callback => { callback( result ) })
      }
    })
  }
  then(onFULFILED,onREJECTED){
    return new myPromise((resolve, reject)=>{
      //当其中一个回调函数为undefined 
      onFULFILED = typeof onFULFILED === 'function' ? onFULFILED:()=>{}
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED:()=>{}
      if(this.status = myPromise.PENGING){
        this.resolveCallbacks.push(onFULFILED)
        this.resolveCallbacks.push(onREJECTED)
      }
      if(this.status == myPromise.FULFILED){
        setTimeout( () => { onFULFILED( this.result ) })
      }
      if(this.status === myPromise.REJECTED){
        setTimeout( () => { onREJECTED( this.result ) })
      }
    })
  } 
}

let mypromise = new myPromise((resolve,reject)=>{
  resolve(111)
}).then(res=>{
  console.log(res);
})
```

### 手写实现reduce

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  if (this.length === 0 && !initialValue) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  let result = initialValue || this[0];
  for (let i = initialValue ? 0 : 1; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
}
```

### 三数之和

```javascript
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};
```

### 两数之和

```javascript
function findZeroSum(nums) {
  const numMap = new Map();
  const result = [];

  // 计数每个数字出现的次数
  nums.forEach(num => {
      numMap.set(num, (numMap.get(num) || 0) + 1);
  });

  // 遍历数组，寻找两数之和为0的数字对
  nums.forEach(num => {
      const complement = -num;
      // 如果当前数字和补数不相等，且补数存在于 Map 中，且补数出现次数大于0，则找到一组数字对
      if (num !== complement && numMap.has(complement) && numMap.get(complement) > 0) {
          result.push([num, complement]);
          // 减少补数的出现次数
          numMap.set(complement, numMap.get(complement) - 1);
          // 减少当前数字的出现次数
          numMap.set(num, numMap.get(num) - 1);
      }
  });

  return result;
}

// 示例用法
const nums = [2, 4, -2, -4, 3, 0, 1, -1, 1, -1];
const zeroSumPairs = findZeroSum(nums);
console.log(zeroSumPairs); // 输出 [[1, -1], [1, -1]]
```

### 斐波那契数列

```typescript
// 递归
function fibonacciRecursive(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }
}

// 示例
console.log(fibonacciRecursive(10)); // 输出斐波那契数列的第10个数


// 非递归
function fibonacciIterative(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}

// 示例
console.log(fibonacciIterative(10)); // 输出斐波那契数列的第10个数
```

### JavaScript继承

#### 原型链继承

实现方式：将子类的原型链指向父类的对象实例

原理：子类实例child的__proto__指向Child的原型链prototype，而Child.prototype指向Parent类的对象实例，该父类对象实例的__proto__指向Parent.prototype,所以Child可继承Parent的构造函数属性、方法和原型链属性、方法。

优点：父类构造函数的属性，父类原型的属性。

缺点：无法向父类构造函数传参，所有实例共享父类实例的属性，若父类共有属性为引用类型，一个子类实例更改父类构造函数共有属性时会导致继承的共有属性发生变化；

```javascript
function Parent(){
  this.name = "parent";
  this.list = ['a'];
}
function Child(){}
Child.prototype = new Parent();
var child = new Child();
```

#### 构造函数继承

实现方式：在子类构造函数中使用call或者apply劫持父类构造函数方法，并传入参数

原理：使用call或者apply更改子类函数的作用域，使this执行父类构造函数，子类因此可以继承父类共有属性

优点：可解决原型链继承的缺点

缺点：不可继承父类的原型链方法

```javascript
function Parent(name, id){
  this.id = id;
  this.name = name;
  this.printName = function(){ console.log(this.name) }
}
Parent.prototype.sayName = function(){ console.log(this.name) };
function Child(name, id){ Parent.call(this, name, id) }
var child = new Child("jin", "1");
child.printName(); // jin
child.sayName() // Error
```

#### 组合继承

综合使用构造函数继承和原型链继承

优点：可继承父类原型上的属性，且可传参；每个新实例引入的构造函数是私有的

缺点：会执行两次父类的构造函数，消耗较大内存，子类的构造函数会代替原型上的那个父类构造函数

```javascript
function Parent(name, id){
  this.id = id;
  this.name = name;
  this.list = ['a'];
  this.printName = function(){
    console.log(this.name);
  }
}
Parent.prototype.sayName = function(){
  console.log(this.name);
};
function Child(name, id){
  Parent.call(this, name, id);
}
Child.prototype = new Parent();
var child = new Child("jin", "1");
child.printName(); // jin
child.sayName() // jin

var a = new Child();
var b = new Child();
a.list.push('b');
console.log(b.list); // ['a']
```

#### 原型式继承

原理：类似Object.create，用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象，结果是将子对象的__proto__指向父对象

缺点：共享引用类型

```javascript
var parent = {
  names: ['a']
}
function copy(object) {
  function F() {}
  F.prototype = object;    
  return new F();
}
var child = copy(parent);
```

#### 寄生式继承

原理：二次封装原型式继承，并拓展

优点：可添加新的属性和方法

```javascript
function createObject(obj) {
  var o = copy(obj);
  o.getNames = function() {
    console.log(this.names);
    return this.names;
  }
  return o;
}
```

#### 寄生组合式继承

原理：改进组合继承，利用寄生式继承的思想继承原型

```javascript
function inheritPrototype(subClass, superClass) {
  // 复制一份父类的原型
  var p = copy(superClass.prototype);
  // 修正构造函数
  p.constructor = subClass;
  // 设置子类原型
  subClass.prototype = p;
}

function Parent(name, id){
  this.id = id;
  this.name = name;
  this.list = ['a'];
  this.printName = function(){
    console.log(this.name);
  }
}
Parent.prototype.sayName = function(){
  console.log(this.name);
};
function Child(name, id){
  Parent.call(this, name, id);
  // Parent.apply(this, arguments);
}
inheritPrototype(Child, Parent);
```

#### ES6的class类继承

```javascript
class Student extends Person{}
```

### 如何画一个三角形

### 

```css
div {
  width:0px;
  height:0px;
  border-top:10px solid red;
  border-right:10px solid transparent;
  border-bottom:10px solid transparent;
  border-left:10px solid transparent;
}
```

### 画一条 0.5px的线

```javascript
<meta name="viewport" content="width=device-width,initial-sacle=0.5">
//width=device-width表示将viewport视窗的宽度调整为设备的宽度，这个宽度通常是指物理上宽度。
//缩放到原来的0.5倍，如果是1px那么就会变成0.5px
//viewport只针对于移动端，只在移动端上才能看到效果
.half-px {
  width: 300px;
  background-color: #000;
  height: 1px;//设置1px，然后启动缩放
  transform: scale(0.5)
}
```

### 实现一个扇形

```css
div{
    border: 100px solid transparent;
    width: 0;
    heigt: 0;
    border-radius: 100px;
    border-top-color: red;
}
```

### 实现简单的EventBus（事件总线）

```javascript
class EventBus {
  constructor() {
    this.list = new Map();
  }
  emit(event, ...args) {//注册事件，传递参数
    if (this.list.has(event)) {//把参数传进函数
      for (let fn of this.list.get(event)) {
        fn.apply(null, args);
      }
    }
  }
  on(event, fn) {//监听事件，定义处理时间函数
    if (this.list.has(event)) {//如果事件已经被多个处理函数处理，
      //在原有函数中加入新的处理函数
      this.list.set(event, [...this.list.get(event), fn]);//在原有事件
    } else {
      //如果事件没有被其他函数处理，初始化处理函数
      this.list.set(event, [fn]);
    }
  }
  off(event, fn) {
    if (!arguments.length) {//默认清空所有事件
      this.list.clear();
    }
    if (arguments.length === 1) {//一个参数，删除这个事件，对应的处理函数也没了
      this.list.delete(event);
    }
    if (this.list.has(event) && fn) {//两个参数
      //找到处理的函数，注销这个处理函数
      let fns = this.list.get(event);
      for (let i = 0; i < fns.length; i++) {
        if (fns[i] === fn || fns[i].fn === fn) {
          // fns[i].fn用来移除once注册的事件
          fns.splice(i, 1);
        }
      }
      //更新事件的处理函数
      this.list.set(event, [...fns]);
    }
  }
	//注册一个处理事件的函数、，但是它只能执行一次，执行完就被注销
  once(event, fn) {
    let self = this;
    function handler() {
      self.off(event, handler);
      fn.apply(null, arguments); // emit里面调用时会给on方法传参
    }
    handler.fn = fn; // off里面根据这个判断销毁事件
    this.on(event, handler);
  }
}
let obj = new EventBus();
```

### 原生draggable相关

原生html实现拖拽

```html
<style>
    body,
    html {
        margin: 0;
        padding: 0;
    }
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

<body>
    <div draggable="true" class="box"></div>
    <script>
        let box = document.querySelector('.box');
        // 用于保存鼠标在节点中的位置
        let initX = null,
            initY = null;
        box.addEventListener('dragstart', (e) => {
        	// 在开始拖拽,保存鼠标在节点中的位置，该位置是相对位置
            initX = e.offsetX;
            initY = e.offsetY;
            // console.log('鼠标相对盒子的位置：'+initX,initY);
        })
        box.addEventListener('drag', (e) => {
            //clientX是鼠标距离浏览器顶部的距离，计算盒子距顶部的距离需要减去盒子和鼠标的相对距离
            let _left = e.clientX - initX
            let _top = e.clientY - initY
            box.style.left = _left + 'px';
            box.style.top = _top + 'px';
            // console.log('盒子相对顶部和左侧的位置：'+_left,_top);
        })
        box.addEventListener('dragend', (e) => {
            let _left = e.clientX - initX
            let _top = e.clientY - initY
            box.style.left = _left + 'px';
            box.style.top = _top + 'px';
            console.log('拖拽完成后盒子相对顶部和左侧的位置：'+_left,_top);
        })
    </script>
</body>
```

拖拽排序

```html
<style>
    ul li {
      list-style: none;
      height: 20px;
      width: 20px;
      padding: 10px 40px;
      margin-top: 5px;
      background-color: darkgray;
    }
    .moving {
      background-color: transparent;
      color: transparent;
      border: 1px dashed black;
    }
</style>
<body>
  <ul class="draList">
    <li draggable="true">1</li>
    <li draggable="true">2</li>
    <li draggable="true">3</li>
  </ul>
  <script>
    // 获取列表dom
    let list = document.querySelector('.draList');
    let cruentItem// 创建cruentItem存放将要拖动的元素
    list.ondragover = e => {//当某被拖动的对象在另一对象容器范围内拖动时触发此事件
      e.preventDefault();
    }
    list.ondragstart = e => {//用户开始拖动元素时触发
      setTimeout(() => {// 此处使用setTimeout延迟被拖动的原始元素的样式
        e.target.classList.add("moving");
      }, 0)
      // 存储被拖动元素
      cruentItem = e.target;
      // 拖动时默认行为是复制，此处可以改为移动
      e.dataTransfer.effectAllowed = 'move';
    }
    // 拖动中
    list.ondragenter = e => {
      // 阻止默认事件，否则元素会先回到拖动开始时的位置，再到拖动结束的位置
      e.preventDefault();
      // 拖动事件期间排除被拖动元素自身，以及事件代理对象ul
      if (e.target == cruentItem || e.target == list) {
        return;
      }
      // list.children获取的是类数组，类数组没有数组的方法，所以要通过Array.from转换为真正的数组
      let itmeList = Array.from(list.children);
      // 获取当前拖动元素位置的下标
      let tiemListIndex = itmeList.indexOf(cruentItem);
      // 获取当前拖动元素所移动到的位置的元素的下标
      let targetIndex = itmeList.indexOf(e.target);
      // 如果当前拖动元素下标小于目标元素下标说明是往下移动，否则网上移动
      if (tiemListIndex < targetIndex) {
        console.log('往下移动');
        // 当前拖动元素插入到目标元素前面，且nextElementSibling目标元素的下一个兄弟元素
        list.insertBefore(cruentItem, e.target.nextElementSibling)
      } else {
        console.log('往上移动');
        list.insertBefore(cruentItem, e.target)
      }
    }
    // 拖动结束
    list.ondragend = e => {
      e.target.classList.remove('moving')// 结束后移除虚线样式
    }
  </script>
```

两个盒子之间进行元素拖动

```html
<style>
    #container2, #container1{
        width: 100px;
            height: 100px;
            border: 2px solid black;
            margin-top: 20px;
        }
        .item{
            width: 100%;
            height: 20px;
            background-color:blue;
            margin: 2px 2px 2px 2px;
        }
    </style>
<body>
    <div id="container1">
        <div class="item" draggable="true">1</div>
        <div class="item" draggable="true">2</div>
        <div class="item" draggable="true">3</div>
    </div>
    <div id="container2"></div>
    <script>
        var dragItem = null;
        // 给可拖动元素添加拖动事件监听器
        var items = document.querySelectorAll(".item");
        items.forEach(function (item) {
            item.addEventListener("dragstart", function (event) {
                dragItem = event.target;
            });
        });
        // 给目标容器添加拖放事件监听器
        var container2 = document.getElementById("container2");
        container2.addEventListener("dragover", function (event) {
            event.preventDefault(); // 防止浏览器默认行为
        });
        container2.addEventListener("drop", function (event) {
            event.preventDefault();
            container2.appendChild(dragItem); // 将拖动的元素添加到目标容器中
        });
        var container1 = document.getElementById("container1");
        container1.addEventListener("dragover", function (event) {
            event.preventDefault(); // 防止浏览器默认行为
        });
        container1.addEventListener("drop", function (event) {
            event.preventDefault();
            container1.appendChild(dragItem); // 将拖动的元素添加到目标容器中
        });
    </script>
```

### 链表每k组反转

```javascript
const myReverse = (head, tail) => {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head];
}
var reverseKGroup = function(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;

    while (head) {
        let tail = pre;
        // 查看剩余部分长度是否大于等于 k
        for (let i = 0; i < k; ++i) {
            tail = tail.next;
            if (!tail) {
                return hair.next;
            }
        }
        const nex = tail.next;
        [head, tail] = myReverse(head, tail);
        // 把子链表重新接回原链表
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
};
```

### 字符串中第一个只出现一次的字符位置

### 

```javascript
var firstUniqChar = function(s) {
    const frequency = _.countBy(s);
    for (const [i, ch] of Array.from(s).entries()) {
        if (frequency[ch] === 1) {
            return i;
        }
    }
    return -1;
};
```

### 发布订阅

```javascript
class Event{
  constructor(){
    // 使用一个对象保存事件名和对应回调函数列表
    this.events = {};
  }
  
  // 订阅事件，将事件名和对应的回调函数添加到事件列表中
  on(eventName, callBack){
    if(!this.events[eventName]){
      // 事件名不存在就创建一个空表
      this.events[eventName] = [];
    }
    // 将回调函数添加到事件列表中
    this.events[eventName].push(callBack);
    // 返回回调函数本身，用于取消订阅
    return callBack;
  }
  
  // 取消订阅事件，将事件名和回调函数从时间列表中移除
  off(eventName, callBackRemove){
    if(!this.events[eventName]){
      // 事件名不存在就直接返回
      return;
    }
    // 用filter过滤到对应的回调事件，保留 callBack != callBackRemove
    this.events[eventName] = this.events[eventName].filter(callBack => callBack != callBackRemove)
  }

  // 触发事件，执行对应的事件名下的所有回调函数
  emit(eventName, ...args){
    // 检查事件名对应的回调函数列表是否存在
    if (!this.events[eventName]) {
        // 如果事件名对应的回调函数列表不存在，则直接返回
        return;
    }
    // 遍历事件列表中的每个回调函数，并执行它们，传入参数 args
    for (const callback of this.events[eventName]) {
        callback(...args);
    }
  }
}
const e = new Event();

function addCallback(a, b){
  console.log(`${a} + ${b} = ${a + b}`)
}
// 首先需要订阅事件
e.on('add', addCallback);
e.emit('add', 1, 2)
e.off('add', addCallback)
e.emit('add', 1, 2)
```

### 实现深拷贝

### 实现深拷贝

```javascript
function deepCopy(obj, hash = new WeakMap()) {
  // 如果是原始值类型，直接返回
  if (Object(obj) !== obj) return obj;
  // 日期对象直接创建一个新的日期对象
  if (obj instanceof Date) return new Date(obj);
  // 正则对象直接创建一个新的正则对象
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  // 如果循环引用，则直接返回之前的复制对象
  if (hash.has(obj)) return hash.get(obj);
  // 如果是数组或者普通对象，则递归拷贝每个元素或属性
  const result = obj instanceof Array ? [] : obj.constructor ? new obj.constructor() : Object.create(null);
  // 记录当前对象和拷贝对象的对应关系，以解决循环引用问题
  hash.set(obj, result);

  if (obj instanceof Map)
    Array.from(obj, ([key, val]) => result.set(key, deepCopy(val, hash)));
  if (obj instanceof Set)
    Array.from(obj, (key) => result.add(deepCopy(key, hash)));

  return Object.assign(result, ...Object.keys(obj).map(
    key => ({ [key]: deepCopy(obj[key], hash) })
  ));
}

// 示例使用
const original = {
  number: 1,
  bool: false,
  string: 'a',
  date: new Date(),
  undef: undefined,
  null: null,
  array: [1, 2, 3],
  deepObject: {
    message: 'Hello'
  },
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  regExp: new RegExp('\\w+', 'g')
};

const copied = deepCopy(original);
console.log(copied);
```

### 二叉树的镜像（即翻转二叉树）

### 

```javascript
var invertTree = function(root) {
    //我们先定义节点交换函数
    const invertNode = function(root, left, right) {
        let temp = left;
        left = right;
        right = temp;
        root.left = left;
        root.right = right;
    }
    //使用层序遍历
    let queue = [];
    if(root === null) {
        return root;
    } 
    queue.push(root);
    while(queue.length) {
        let length = queue.length;
        while(length--) {
            let node = queue.shift();
            //节点处理逻辑
            invertNode(node, node.left, node.right);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
    return root;
};
```

### 二叉树层序遍历

```typescript
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

var levelOrder = function(root) {
    if (!root) return []; // 如果根节点为空，则返回空数组
    const result = []; // 用于存储层次遍历的结果
    const queue = [root]; // 创建一个队列，并将根节点入队
    while (queue.length > 0) {
        const levelSize = queue.length; // 当前层的节点数量
        const level = []; // 用于存储当前层节点的值
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // 出队一个节点
            level.push(node.val); // 将节点值存入当前层数组
            // 如果节点有左子节点，则将左子节点入队
            if (node.left) {
                queue.push(node.left);
            }
            // 如果节点有右子节点，则将右子节点入队
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(level); // 将当前层的节点值数组存入结果数组
    }
    return result;
};

// 测试用例
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(levelOrder(root)); // 输出：[[3], [9, 20], [15, 7]]
```

### 二叉树宽度

```javascript
var widthOfBinaryTree = function(root) {
if (!root) return 0;

    let maxWidth = 0;
    const queue = [{ node: root, index: 0 }];

    while (queue.length) {
        const levelSize = queue.length;
        let levelMinIndex = queue[0].index; // 初始化当前层最左边的索引
        let firstIndex, lastIndex;

        for (let i = 0; i < levelSize; i++) {
            const { node, index } = queue.shift();
            const currentIndex = index - levelMinIndex; // 重新计算当前索引以防止数值溢出
            if (i === 0) firstIndex = currentIndex; // 当前层第一个节点的索引
            if (i === levelSize - 1) lastIndex = currentIndex; // 当前层最后一个节点的索引

            if (node.left) queue.push({ node: node.left, index: currentIndex * 2 + 1 });
            if (node.right) queue.push({ node: node.right, index: currentIndex * 2 + 2 });
        }

        const currentWidth = lastIndex - firstIndex + 1;
        maxWidth = Math.max(maxWidth, currentWidth);
    }

    return maxWidth;
};

// 根据数组 [1,3,2,5,3,null,9] 手动创建二叉树
const node5 = new TreeNode(5);
const node3_right = new TreeNode(3);
const node9 = new TreeNode(9);

const node3_left = new TreeNode(3, node5, node3_right);
const node2 = new TreeNode(2, null, node9);

const root = new TreeNode(1, node3_left, node2);
console.log(root);

// 示例对象树
let objTree = {
  val: 1,
  left: {
    val: 3,
    left: { val: 5, left: null, right: null },
    right: { val: 3, left: null, right: null }
  },
  right: {
    val: 2,
    left: null,
    right: { val: 9, left: null, right: null }
  }
};
```

### 用 axios 封装一个请求库

这个封装的请求库提供了基本的请求拦截、响应处理和错误处理功能。你可以根据实际项目需求进一步扩展和定制这个库，例如添加更多的请求方法、处理更复杂的业务逻辑、集成状态管理等。

```javascript
// http.js
import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://api.example.com', // API的base_url
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加请求头，如添加token
    // config.headers['Authorization'] = 'Bearer ' + yourToken;
    return config;
  },
  error => {
    // 请求错误处理
    console.error('Request Error:', error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 可以在这里根据后端返回的数据结构做相应的处理
    // 例如，如果后端返回的格式是 { code: 200, message: 'Success', data: {...} }
    const res = response.data;
    if (res.code !== 200) {
      // 如果返回的code不是200，则抛出错误
      console.error('Response Error:', res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      // 如果code是200，则返回data
      return res.data;
    }
  },
  error => {
    // 响应错误处理
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

// 导出封装后的get和post方法
export default {
  get: (url, params) => service.get(url, { params }),
  post: (url, data) => service.post(url, data)
};
```

现在你可以在其他文件中导入这个模块来发送请求：

```javascript
// 使用封装的请求库发送GET请求
import http from './http';

http.get('/user', { id: 123 })
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.error(error);
  });

// 使用封装的请求库发送POST请求
http.post('/user', { name: 'John', age: 30 })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
```

### 链表反转js对象树结构，要求删掉type为指定的叶子节点

```javascript
function removeSpecificLeafNodes(obj, typeToRemove) {
  function isLeafNode(node) {
    return !node.children || node.children.length === 0;
  }

  function iterateAndRemove(node) {
    if (Array.isArray(node.children)) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        if (isLeafNode(node.children[i]) && node.children[i].type === typeToRemove) {
          // 删除指定type的叶子节点
          node.children.splice(i, 1);
        } else {
          // 递归处理非叶子节点
          iterateAndRemove(node.children[i]);
        }
      }
    }
  }

  // 对象深拷贝，避免修改原始对象
  let newObj = JSON.parse(JSON.stringify(obj));
  iterateAndRemove(newObj);
  return newObj;
}

// 示例对象树
let objTree = {
  type: 'root',
  children: [
    {
      type: 'internal',
      children: [
        { type: 'leaf', value: '1' },
        { type: 'leaf', value: '2' }
      ]
    },
    {
      type: 'leaf',
      value: '3'
    },
    {
      type: 'internal',
      children: [{ type: 'leaf', value: '4' }]
    }
  ]
};

// 调用函数，移除type为'leaf'的叶子节点
let updatedTree = removeSpecificLeafNodes(objTree, 'leaf');
console.log(updatedTree);
```

### 重排链表

```javascript
var reorderList = function (head) {
  //获取链表
  var arr = []
  while (head) {
    arr.push(head)
    head = head.next
  }
  //利用双指针进行交换
  var i = 0
  var j = arr.length - 1
  while (i < j) {
    arr[i].next = arr[j]
    i++
    arr[j].next = arr[i]
    j--
  }
  arr[i].next = null
  return arr
};
```

### 判断40亿数字中是否有某个数字

位图是一种非常节省空间的数据结构，其中每个位(bit)对应一个元素，只需用1位就能表示一个数字是否存在。这种方法对数字范围有限的情况非常有效，但对于40亿个数字来说，我们还是需要大约500MB的内存空间。

```javascript
// 这是一个简化的示例，我们假设数字范围较小
function BitMap(size) {
  this.bitArray = new Uint8Array(size);
}

BitMap.prototype.set = function(number) {
  const byteIndex = Math.floor(number / 8);
  const bitIndex = number % 8;
  this.bitArray[byteIndex] |= (1 << bitIndex);
};

BitMap.prototype.get = function(number) {
  const byteIndex = Math.floor(number / 8);
  const bitIndex = number % 8;
  return (this.bitArray[byteIndex] & (1 << bitIndex)) !== 0;
};

// 示例
const bitmap = new BitMap(1000); // 我们需要根据实际数字范围进行调整
bitmap.set(2); // 将数字2添加到位图中
console.log(bitmap.get(2)); // 输出 true
console.log(bitmap.get(3)); // 输出 false，因为数字3没有被添加到位图中
```

布隆过滤器是一种空间效率极高的随机数据结构，它利用多个哈希函数对元素进行映射。布隆过滤器可以告诉你一个元素绝对不在集合中或可能在集合中。布隆过滤器有一定的误判率，但这种误判只会发生在判断元素存在的情况下，它不会错误地告诉你一个存在的元素不存在。

```javascript
// 这是一个简化的布隆过滤器实现
function BloomFilter(size, hashFunctionCount) {
  this.bitArray = new Uint8Array(size);
  this.hashFunctions = [];
  
  // 简单的哈希函数工厂，实际中需要更复杂的哈希函数
  for (let i = 0; i < hashFunctionCount; i++) {
    this.hashFunctions.push((str) => {
      let hash = 0;
      for (let j = 0; j < str.length; j++) {
        hash = (hash << 5) - hash + str.charCodeAt(j);
        hash |= 0; // 转换为32位整数
      }
      return Math.abs(hash) % size;
    });
  }
}

BloomFilter.prototype.add = function(item) {
  const strItem = item.toString();
  this.hashFunctions.forEach((hashFunction) => {
    const hash = hashFunction(strItem);
    this.bitArray[hash] = 1;
  });
};

BloomFilter.prototype.contains = function(item) {
  const strItem = item.toString();
  return this.hashFunctions.every((hashFunction) => {
    const hash = hashFunction(strItem);
    return this.bitArray[hash] === 1;
  });
};

// 示例
const bloomFilter = new BloomFilter(1000, 3); // 调整参数以优化误判率和空间使用
bloomFilter.add(2);
console.log(bloomFilter.contains(2)); // 输出 true 或 false（如果发生误判）
console.log(bloomFilter.contains(3)); // 输出 false
```