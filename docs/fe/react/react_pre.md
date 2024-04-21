# React 预知识

## 变量命名

var \- 没有块级作用域

let \- 有块级作用域

const \- 和 let 类似，具有块级作用域，但是它只能赋值一次

\- 使用场景：

1. 对于一些常量可以使用 const 声明
2. 对于一些对象（函数）也可以使用 const 声明（这样可以避免对象（函数）被意外修改）

## 解构赋值

```js
// let a, b;
let arr = ["孙悟空", "猪八戒"];

/*
    a = arr[0];
    b = arr[1];
    */
// [a, b] = arr;
const [a, b] = arr;
```

```js
arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧"];
// const [a, b, ,c] = arr; // 可以跳过元素
// const [a, b, ...c ] = arr; // ...变量，会接收后边所有的元素
// console.log('a='+a, 'b='+b, 'c='+c);
```

```js
const obj = {
  name: "孙悟空",
  age: 18,
  gender: "男",
};

let a, b, c;

// ({name:a, age:b, gender:c} = obj); // 将name赋值给a，age赋值给b，gender赋值给c

const { name, gender, age } = obj; // 如果变量名和属性名一致，则可以只写一个

// console.log(a, b, c);
// console.log(name, age, gender);
```

```js
// 利用数组的解构来交换两个变量的位置
a = 10;
b = 20;

[a, b] = [b, a]; // 交换变量a和b的位置

arr = [1, 3, 2];
[arr[1], arr[2]] = [arr[2], arr[1]]; // 交换数组中两个元素的位置

// console.log('a =', a);
// console.log('b =', b);
console.log(arr);
```

## 展开

可以通过 ... 展开一个数组或对象

```js
function fn(a, b, c) {
  return a + b + c;
}

const arr = [1, 2, 3];

// 计算数组中三个数字的和
let result = fn(...arr);
// console.log(result);

// const arr2 = [...arr]; // 相当于将arr浅复制给arr2
const arr2 = [7, 8, 9, ...arr, 4, 5, 6];

// console.log(arr2);

const obj = {
  name: "孙悟空",
  age: 18,
  gender: "男",
};

// const obj2 = {...obj}; // 将obj在新的对象中展开，相当于浅复制
const obj2 = { address: "花果山", ...obj, name: "猪八戒" };

console.log(obj2);
```

## 箭头函数

箭头函数

- 只有一个参数的函数
  参数 => 返回值
- 如果没有参数，或多个参数，参数需要使用()括起来() => 返回值(a, b, c) => 返回值
- 箭头后边的值就是函数的返回值
  - 返回值必须是一个表达式（有值的语句）
  - 如果返回值是对象，必须加()
- 如果需要在箭头函数中定义逻辑，可以直接在箭头后跟一个代码块，代码块中语法和普通函数没有区别

```js
const fn = function (a) {
  return "hello";
};

const fn2 = (a) => a + "hello";
const fn3 = (a, b) => a + "hello";

// console.log(fn2(123));

const sum = (a, b) => a + b;
let result = sum(123, 456);

const fn4 = (a, b) => {
  if (a === 10) {
    a += 5;
  } else if (a === 20) {
    a += 10;
  }
  return a + b;
};

result = fn4(10, 5);

console.log(result);
```

1.箭头函数中没有 arguments

2.箭头函数中没有自己的 this

  - 它的 this 总是外层作用域的 this

3.箭头函数中的 this 无法通过 call()、apply()、bind()修改

4.箭头函数无法作为构造函数使用

```js
function fn(a, b, ...args) {
  // arguments用来保存函数的实参
  // console.log(arguments.length);
  console.log(args);
}

const fn2 = (...args) => {
  console.log(args);
};

const fn3 = () => {
  console.log(this);
};

const obj = {
  hello: () => {
    console.log(this);
  },
};

const obj2 = {
  hello: function () {
    const test = () => {
      console.log("-->", this);
    };

    test();
  },
};

obj2.hello();
// new fn3();
```

## 类

- 类是对象的模板
- 类决定了一个对象中有哪些属性和方法
- 使用 class 关键字来定义一个类

```js
class Person {
  // 可以直接在类中定义属性
  // name = '孙悟空';
  // age = 18;

  // 构造函数
  // 当我们通过new创建对象时，实际上就是在调用类的构造函数
  constructor(name, age) {
    // 将参数赋值给对象中的属性
    // 在构造函数中，可以通过this来引用当前的对象
    // 在构造函数中定义属性
    this.name = name;
    this.age = age;
  }

  // 定义实例方法
  run() {
    console.log("我会跑！");
  }
}

const per = new Person("孙悟空", 18);
const per2 = new Person("猪八戒", 28);
//
console.log(per);
console.log(per2);
// console.log(per === per2);
//
// per.run();
```

类中的所有代码都会在严格模式下执行

    严格模式下其中一个特点就是，函数的this不在是window，而是undefined

注意：

在类中方法的 this 不是固定的

-  以方法形式调用时，this 就是当前的实例
-  以函数形式调用，this 是 undefined

在开发时，在有些场景下，我们希望方法中的 this 是固定的，不会因调用方式不同而改变

-  如果遇到上述需求，可以使用箭头函数来定义类中的方法

-  如果类中的方法是以箭头函数定义的，则方法中的 this 恒为当前实例，不会改变

```js
class MyClass {
  constructor() {
    // this.fn = this.fn.bind(this); 将fn方法的this绑定为当前实例
  }
  // fn(){
  //     console.log('-->',this);
  // }
  fn = () => {
    console.log("-->", this);
  };
}
const mc = new MyClass();
const test = mc.fn;
mc.fn(); // mc
test(); // undefined

const fn2 = function () {
  console.log(this);
};
// fn2();
```

## 继承

通过继承可以使得类中拥有其他类中的属性和方法

使用 extends 来继承一个类，继承后就相当于将该类的代码复制到了当前类中

当我们使用继承后，被继承的类就称为父类，继承父类的类 称为子类

```js
// 将多个类中的重复代码提取出来
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello = () => {
    console.log("动物在叫");
  };
}

class Dog extends Animal {
  /*
   *   子类继承父类后，将获得父类中所有的属性和方法，
   *       也可以创建同名的属性或方法来对父类进行重写
   * */
  sayHello = () => {
    console.log("汪汪汪！");
  };
}

class Snake extends Animal {
  // 当在子类中重写父类构造函数时，必须在子类构造函数中第一时间调用父类构造函数，否则会报错
  constructor(name, age, len) {
    super(name, age); // 调用父类构造函数
    this.len = len;
  }
  sayHello = () => {
    console.log("嘶嘶嘶~~");
  };
}

const dog = new Dog("旺财", 5);
const snake = new Snake("长虫", 4, 10);
// console.log(dog.name, dog.age);
console.log(snake.name, snake.age, snake.len);
// dog.sayHello();
// snake.sayHello();
```

## 静态属性

直接通过类调用的属性和方法被称为静态属性和静态方法

```js
class MyClass {
  // 使用static开头的属性是静态属性，方法是静态方法
  static name = "哈哈";

  static fn = () => {
    // 注意：静态方法this不是实例对象而是当前的类对象
    console.log(this);
  };
}

console.log(MyClass.name);
MyClass.fn();
```

## 数组的方法

**map()**

-  可以根据原有数组返回一个新数组
-  需要一个回调函数作为参数，回调函数的返回值会成为新数组中的元素
- 回调函数中有三个参数：

 第一个参数：当前元素

 第二个参数：当前元素的索引

 第三个参数：当前数组

**filter()**

- 可以从一个数组中获得符和条件的元素
- 会根据回调函数的结果来决定是否保留元素，true 保留，false 不保留

**find()**

- 可以从一个数组中获得符和条件的第一个元素

**reduce()**

- 可以用来合并数组中的元素
- 需要两个参数：

  回调函数（指定运算规则）(
  prev 上一次运算结果;
  curr 当前值;
  index 当前索引;
  arr 当前数组)
  初始值 - 用来指定第一次运算时 prev，如果不指定则直接从第二个元素开始计算

```js
const arr = [1, 2, 3, 4, 5];
let result = arr.map((item) => {
  return item + 2;
});

result = arr.map((item, index, array) => {
  return item + 2;
});

// console.log(result);

const arr2 = ["孙悟空", "猪八戒", "沙和尚"];
/*
 *   <li>孙悟空</li>
 *   <li>猪八戒</li>
 *   <li>沙和尚</li>
 * */

result = arr2.map((item) => "<li>" + item + "</li>");  // [ '<li>孙悟空</li>', '<li>猪八戒</li>', '<li>沙和尚</li>' ]
result = arr.filter((item) => item % 2 === 0); // [ 2, 4 ]
result = arr.find((item) => item % 2 === 0); // 2

result = arr.reduce((prev, curr, index) => {
  console.log(index, prev, curr);
  return prev + curr;
}, 0);
console.log(result); //15
```

## 模块化

 作为一个模块，我们不希望模块中所有的内容都暴露给外部

 作为导入方，也不希望导入无用的变量

 export（导出）
  - 导出用来决定一个模块中哪些内容可以被外部查看
  - 导出分成两种：
  
    1.默认导出
       - 语法：export default xxx;
       - 一个模块中只能有一个默认导出
    
    2.命名导出

 import（导入）
  - 导入用来将外部模块中的内容导入到当前模块中
  - 导入默认模块
      import a from './m1.js';
      - 导入默认模块时，变量名可以自主指定，无需和模块中的变量名对应
      - 在网页中导入模块时，模块的路径必须写完整（/、./或../开头，扩展名也得写上）
  - 导入指定内容
      import {b, c} from './m1.js';
  - 导入默认及指定内容
      import a, {b, c, obj, fn} from './m1.js';

**m1.js**

```js
const a = 'm1模块中的变量a';
export const b = 20; // 命名导出 b
export const c = 30; // 命名导出 c
const obj = {
    name: '孙悟空'
};
const fn = () => {
    console.log('我是fn');
};

export default a; // 将变量a作为默认导出暴露
export {obj, fn}; // 命名导出

```

**module.html**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>模块化</title>
    <!--
        默认情况下，script标签中不能使用import语句，
            如果想让其支持模块化，必须设置script的type属性为module
    -->
    <script type="module">

        // 导入m1模块中的默认模块
        // import haha from './m1.js';

        // 导入m1模块中的b和c
        // import {b as hello, c, obj, fn} from './m1.js';

        import a, {b, c, obj, fn} from './m1.js';
        console.log(a, b, c, obj);

        fn();
    </script>
</head>
<body>

</body>
</html>
```