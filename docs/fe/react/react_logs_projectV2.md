# React 项目优化

## 添加UI/Card 进行样式复用

使用 **props.children** 表示组件的标签体

创建 `src/Components/UI/Card/Card.js`
```js
import React from 'react'
import './Card.css'

const Card = (props) => {
  console.log(props.children);
  return (
    <div className={`card ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Card
```

创建 **src/Components/UI/Card/Card.css**
```css
.card{
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, .2); /*  阴影 */
}
```

在 **src/Components/Logs/Logs.js** 中引入Card，使用
```js
/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';
import Card from "../UI/Card/Card";
const Logs = () => {

  // 模拟一组从服务器中加载的数据
  const logsData = [
    {
      id: '001',
      date: new Date(2021, 1, 20, 18, 30),
      desc: '学习九阳神功',
      time: 30
    },
    {
      id: '002',
      date: new Date(2022, 2, 10, 12, 30),
      desc: '学习降龙十八掌',
      time: 20
    },
    {
      id: '003',
      date: new Date(2022, 2, 11, 11, 30),
      desc: '学习JavaScript',
      time: 40
    },
    {
      id: '004',
      date: new Date(2022, 2, 15, 10, 30),
      desc: '学习React',
      time: 80
    }
  ];

  // 循环遍历数据，生成对应的item
  const logItemData = logsData.map(itme => <LogItem key={itme.id} date={itme.date} LogDesc={itme.desc} LogTime={itme.time}></LogItem>)

  return <Card className="logs">
    {
      logItemData
      // logsData.map(item => <LogItem {...item}/> )
    }
  </Card>
};

export default Logs;
```

在 **src/Components/Logs/Logs.css** 中删除 **src/Components/UI/Card/Card.css** 已经定义的公共样式
```css
.card{
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, .2); /*  阴影 */
}
```

在 **src/Components/Logs/LogItem/LogItem.js** 中引入Card
```js
import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Card from '../../UI/Card/Card'

const LogItem = (props) => {
  // 在函数组件中，属性相当于函数的参数，可通过参数接受
  return (
    <Card className='item'>
      <MyDate date={props.date}></MyDate>
      {/* 内容容器 */}
      <div className='content'>
        <h2 className='desc'>{props.LogDesc}</h2>
        <div className='time'>{props.LogTime}</div>
      </div>
    </Card>
  )
}

export default LogItem
```


在 **src/Components/Logs/LogItem/LogItem.css** 中删除 **src/Components/UI/Card/Card.css** 已经定义的公共样式
```css
.card{
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0, .2); /*  阴影 */
}
```

## 设置表单添加

添加 **src/Components/LogsForm** 用来存放表单代码

**src/Components/LogsForm/LogsForm.js**
```js
import React from 'react'
import Card from '../UI/Card/Card'
import './LogsForm.css'

const LogsForm = () => {
  return (
    <Card className='log-form'>
      <form>
        <div className='form-item'>
          <label htmlFor='date'>日期</label>
          <input id='date' type='date'></input>
        </div>
        <div className='form-item'>
          <label htmlFor='desc'>内容</label>
          <input id='desc' type='text'></input>
        </div>
        <div className='form-item'>
          <label htmlFor='time'>时长</label>
          <input id='time' type='text'></input>
        </div>
        <div className='form-btn'>
          <button>添加</button>
        </div>
      </form>
    </Card>
  )
}

export default LogsForm
```

**src/Components/LogsForm/LogsForm.css**
```css
.log-form {
  background-color: #eae2b7;
  margin-bottom: 16px;
  padding: 10px;
}
.form-item {
  height: 30px;
  line-height: 30px;
  margin: 10px 0;
  display: flex;
  flex-flow: row;
}
.form-item label {
  text-align: center;
  padding: 0 4px;
}
.form-item input {
  flex: auto;
}
.form-btn {
  text-align: center;
}
.form-btn button {
  width: 100px;
  height: 50px;
  border:  none;
  background-color: saddlebrown;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
}
```

针对表单项及列表项均需要设置 width 和 margin 故在其父组件中进行设置，即App.css中。同时在 **App.js** 中引入表单。


**src/App.js**
```js
import Logs from "./Components/Logs/Logs";
import LogsForm from "./Components/LogsForm/LogsForm";
import './App.css'

const App = () => {
  return <div className="app">
    <LogsForm/>
    <Logs/>
  </div>
};

// 导出App
export default App;
```

**src/App.css**
```css
.app{
  width: 800px;
  margin: 50px auto;
}
```

## 获取表单数据

需求：

当表单项发生变化时，获取用户输入的内容。
```js
  const descRef = React.useRef()

  // 创建响应函数，监听表单项变化
  const descChangeHandler = () => {
    const desc = document.getElementById('desc')
    // desc.value
    console.log('descRef.current.value',descRef.current.value);
  }

  <input id='desc' ref={descRef} onChange={descChangeHandler} type='text'></input>
```

通过 **e 事件对象** 获取，保存了当前事件触发时的所有信息。 **e.target.value**。



**src/Components/LogsForm/LogsForm.js**

```js
import React from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = () => {
  // 创建三个变量，用来存储表单中的数据
  let inputDate = '';
  let inputDesc = '';
  let inputTime = 0;

  // 创建一个响应函数，监听日期的变化
  const dateChangeHandler = (e) => {
    // 获取到当前触发事件的对象
    // 事件对象中保存了当前事件触发时的所有信息
    // event.target 执行的是触发事件的对象（DOM对象）
    //console.log(e.target.value);
    inputDate = e.target.value;
  };

  // 监听内容的变化
  const descChangeHandler = (e) => {
    inputDesc = e.target.value;
  };

  //监听时长的变化
  const timeChangeHandler = (e) => {
    inputTime = e.target.value;
  };

  // 当表单提交时，汇总表单中的数据
  /*
  *   在React中，通常表单不需要自行提交
  *       而是要通过React提交
  * */
  const formSubmitHandler = (e) => {
    // 取消表单的默认行为
    e.preventDefault();
    // 获取表单项中的数据日期、内容、时长
    // 将数据拼装为一个对象
    const newLog = {
      date: new Date(inputDate),
      desc: inputDesc,
      time: +inputTime
    };
    console.log(newLog);
  };
  return (
    <Card className="logs-form">
      <form onSubmit={formSubmitHandler}>
        <div className="form-item">
          <label htmlFor="date">日期</label>
          <input onChange={dateChangeHandler} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="desc">内容</label>
          <input onChange={descChangeHandler} id="desc" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长</label>
          <input onChange={timeChangeHandler} id="time" type="number" />
        </div>
        <div className="form-btn">
          <button>添加</button>
        </div>
      </form>
    </Card>
  );
};

export default LogsForm;
```

## 数据双向绑定

提交表单后，进行表单旧数据清空。

将表单数据存储在state中，然后将state设置为表单项的value值，实现双向绑定。此时表单成为一个受控组件。

```js
import React from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = () => {
  // 创建三个变量，用来存储表单中的数据
  const [inputDate, setInputDate] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const [inputTime, setInputTime] = React.useState('');

  // 创建一个响应函数，监听日期的变化
  const dateChangeHandler = (e) => {
    // 获取到当前触发事件的对象
    // 事件对象中保存了当前事件触发时的所有信息
    // event.target 执行的是触发事件的对象（DOM对象）
    //console.log(e.target.value);
    setInputDate(e.target.value);
  };

  // 监听内容的变化
  const descChangeHandler = (e) => {
    setInputDesc(e.target.value);
  };

  //监听时长的变化
  const timeChangeHandler = (e) => {
    setInputTime(e.target.value);
  };
  const formSubmitHandler = (e) => {
    // 取消表单的默认行为
    e.preventDefault();
    // 获取表单项中的数据日期、内容、时长
    // 将数据拼装为一个对象
    const newLog = {
      date: new Date(inputDate),
      desc: inputDesc,
      time: +inputTime
    };
    // 清空旧数据
    setInputDate('');
    setInputDesc('');
    setInputTime('');
    console.log(newLog);
  };
  return (
    <Card className="logs-form">
      <form onSubmit={formSubmitHandler}>
        <div className="form-item">
          <label htmlFor="date">日期</label>
          <input onChange={dateChangeHandler} value={inputDate} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="desc">内容</label>
          <input onChange={descChangeHandler} value={inputDesc} id="desc" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长</label>
          <input onChange={timeChangeHandler} value={inputTime} id="time" type="number" />
        </div>
        <div className="form-btn">
          <button>添加</button>
        </div>
      </form>
    </Card>
  );
};

export default LogsForm;
```

或者创建一个表单对象，存放各个属性。

```js
import React from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = () => {
  // 创建一个表单变量
  const [formData, setFormData] = React.useState({
    inputDate: '',
    inputDesc: '',
    inputTime: '',
  });


  // 创建一个响应函数，监听日期的变化
  const dateChangeHandler = (e) => {
    // 获取到当前触发事件的对象
    // 事件对象中保存了当前事件触发时的所有信息
    // event.target 执行的是触发事件的对象（DOM对象）
    //console.log(e.target.value);
    // setInputDate(e.target.value);
    setFormData({
      ...formData,
      inputDate: e.target.value
    })
  };

  // 监听内容的变化
  const descChangeHandler = (e) => {
    // setInputDesc(e.target.value);
    setFormData({
      ...formData,
      inputDesc: e.target.value
    })
  };

  //监听时长的变化
  const timeChangeHandler = (e) => {
    // setInputTime(e.target.value);
    setFormData({
      ...formData,
      inputTime: e.target.value
    })
  };

  // 当表单提交时，汇总表单中的数据
  /*
  *   在React中，通常表单不需要自行提交
  *       而是要通过React提交
  * */
  const formSubmitHandler = (e) => {
    // 取消表单的默认行为
    e.preventDefault();
    // 获取表单项中的数据日期、内容、时长
    // 将数据拼装为一个对象
    const newLog = {
      date: new Date(formData.inputDate),
      desc: formData.inputDesc,
      time: +formData.inputTime
    };

    // 清空旧数据
    setFormData({
      inputDate: '',
      inputDesc: '',
      inputTime: '',
    })

    console.log(newLog);
  };
  return (
    <Card className="logs-form">
      <form onSubmit={formSubmitHandler}>
        <div className="form-item">
          <label htmlFor="date">日期</label>
          <input onChange={dateChangeHandler} value={formData.inputDate} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="desc">内容</label>
          <input onChange={descChangeHandler} value={formData.inputDesc} id="desc" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长</label>
          <input onChange={timeChangeHandler} value={formData.inputTime} id="time" type="number" />
        </div>
        <div className="form-btn">
          <button>添加</button>
        </div>
      </form>
    </Card>
  );
};

export default LogsForm;
```

## 添加新日志

目前数据列表是在 **Logs/LogsData** 中进行展示，而表单数据则是在 **LogsForm** 中，两者的交互需要进行组件间传参，并且 **LogsData** 可能并不是一个组件中需要使用，故将其放在公用祖先元素- **App.js** 中进行传递。

**state的提升**

将 **src/Components/Logs/Logs.js** 中的数组定义抽取出来，提升至 **App.js** 中，并使用 **ustState()** 实现双向绑定，只会通过组件通信，将数组列表的值传递给 **Log.js**，并在其中接收使用。

**src/App.js**

```js
import React from 'react';
import Logs from "./Components/Logs/Logs";
import LogsForm from "./Components/LogsForm/LogsForm";
import './App.css'

const App = () => {
  // 数据
  const [logsData, setLogsData] = React.useState([
    {
        id: '001',
        date: new Date(2021, 1, 20, 18, 30),
        desc: '学习九阳神功',
        time: 30
    },
    {
        id: '002',
        date: new Date(2022, 2, 10, 12, 30),
        desc: '学习降龙十八掌',
        time: 20
    },
    {
        id: '003',
        date: new Date(2022, 2, 11, 11, 30),
        desc: '学习JavaScript',
        time: 40
    },
    {
        id: '004',
        date: new Date(2022, 2, 15, 10, 30),
        desc: '学习React',
        time: 80
    }
  ]);
  return <div className="app">
    <LogsForm/>
    <Logs logsData={logsData}/>
  </div>
};

// 导出App
export default App;
```

**src/Components/Logs/Logs.js** 

```js
/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';
import Card from "../UI/Card/Card";
const Logs = (props) => {  
  // 循环遍历数据，生成对应的item
  const logItemData = props.logsData.map(itme => <LogItem key={itme.id} date={itme.date} LogDesc={itme.desc} LogTime={itme.time}></LogItem>)
  return <Card className="logs">
    {
      logItemData
      // logsData.map(item => <LogItem {...item}/> )
    }
  </Card>
};
export default Logs;
```

此时新增的数据是在 **src/Components/LogsForm/LogsForm.js** 中，对其进行处理需要在 **App.js** 中添加一个保存的函数 **onSaveLogHandler** ，并将其通过 **onSaveLog** 传递给 **LogsForm.js** ，在其中通过 **props.onSaveLog** 进行接收，并在点击添加按钮之后调用父组件的方法，将新增的数据作为参数传递给父组件，在父组件中进行添加。

**src/App.js**

```js
import React from 'react';
import Logs from "./Components/Logs/Logs";
import LogsForm from "./Components/LogsForm/LogsForm";
import './App.css'

const App = () => {
    // 数据
  const [logsData, setLogsData] = React.useState([
    {
        id: '001',
        date: new Date(2021, 1, 20, 18, 30),
        desc: '学习九阳神功',
        time: 30
    },
    {
        id: '002',
        date: new Date(2022, 2, 10, 12, 30),
        desc: '学习降龙十八掌',
        time: 20
    },
    {
        id: '003',
        date: new Date(2022, 2, 11, 11, 30),
        desc: '学习JavaScript',
        time: 40
    },
    {
        id: '004',
        date: new Date(2022, 2, 15, 10, 30),
        desc: '学习React',
        time: 80
    }
  ]);
  // 将LogsForm中的数据传递给App组件，通过App组件进行数据的添加。
  const onSaveLogHandler = (newLog) => {
    // 向新日志添加id
    newLog.id = Date.now() + ''
    setLogsData([newLog, ...logsData]);
  }
  return <div className="app">
    <LogsForm onSaveLog={onSaveLogHandler}/>
    <Logs logsData={logsData}/>
  </div>
};

// 导出App
export default App;
```
**src/Components/LogsForm/LogsForm.js**

```js
import React from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = (props) => {
  // 创建三个变量，用来存储表单中的数据
  const [inputDate, setInputDate] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const [inputTime, setInputTime] = React.useState('');

  console.log('props',props.onSaveLog);

  // 创建一个响应函数，监听日期的变化
  const dateChangeHandler = (e) => {
    setInputDate(e.target.value);
  };

  // 监听内容的变化
  const descChangeHandler = (e) => {
    setInputDesc(e.target.value);
  };

  //监听时长的变化
  const timeChangeHandler = (e) => {
    setInputTime(e.target.value);
  };
  const formSubmitHandler = (e) => {
    // 取消表单的默认行为
    e.preventDefault();
    // 获取表单项中的数据日期、内容、时长
    // 将数据拼装为一个对象
    const newLog = {
      date: new Date(inputDate),
      desc: inputDesc,
      time: +inputTime
    };

    // 添加数据时调用父组件添加方法
    props.onSaveLog(newLog)

    // 清空旧数据
    setInputDate('');
    setInputDesc('');
    setInputTime('');
    console.log(newLog);
  };
  return (
    <Card className="logs-form">
      <form onSubmit={formSubmitHandler}>
        <div className="form-item">
          <label htmlFor="date">日期</label>
          <input onChange={dateChangeHandler} value={inputDate} id="date" type="date" />
        </div>
        <div className="form-item">
          <label htmlFor="desc">内容</label>
          <input onChange={descChangeHandler} value={inputDesc} id="desc" type="text" />
        </div>
        <div className="form-item">
          <label htmlFor="time">时长</label>
          <input onChange={timeChangeHandler} value={inputTime} id="time" type="number" />
        </div>
        <div className="form-btn">
          <button>添加</button>
        </div>
      </form>
    </Card>
  );
};

export default LogsForm;
```

## 删除日志

首先需要在 **src\Components\Logs\LogItem\LogItem.js** 中添加删除按钮，点击删除按钮进行删除确认，确认通过后进行删除。

**src\Components\Logs\LogItem\LogItem.js**

```js
import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Card from '../../UI/Card/Card'

const LogItem = (props) => {
  
  const deleteItemHandler = () =>{
    const isDel = window.confirm('Are you sure you want to delete');
    if(isDel) {
      // 删除即从state中移除数据
      props.onDeleteLog()
    }
  }

  return (
    <Card className='item'>
      <MyDate date={props.date}></MyDate>
      {/* 内容容器 */}
      <div className='content'>
        <h2 className='desc'>{props.LogDesc}</h2>
        <div className='time'>{props.LogTime}</div>
      </div>

      <div>
        <div className='delete' onClick={deleteItemHandler}>×</div>
      </div>
    </Card>
  )
}

export default LogItem
```
**src\Components\Logs\LogItem\LogItem.css**
```css
/* 设置item */
.item{
  background-color: #FCBF49;
  display: flex;
  margin: 16px 0;
  padding: 4px;
}

/* 设置内容样式 */
.content{
  flex: auto;
  text-align: center;
  font-weight: bold;
}

.time{
  color: red;
}

.delete {
  margin-right: 10px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
  -webkit-transition: .3s;
  -moz-transition: .3s;
  -ms-transition: .3s;
  -o-transition: .3s;
}

.delete:hover {
  color: red;
  transform: rotate(1turn);
  -webkit-transform: rotate(1turn);
  -moz-transform: rotate(1turn);
  -ms-transform: rotate(1turn);
  -o-transform: rotate(1turn);
}
```

删除函数则在 **src/App.js** 中进行定义，接收 **id** 作为删除依据，通过 **App.js-Logs.js-LogItme.js** 进行传递。

**src/App.js** 
```js
import React from 'react';
import Logs from "./Components/Logs/Logs";
import LogsForm from "./Components/LogsForm/LogsForm";
import './App.css'

const App = () => {
    // 数据
    const [logsData, setLogsData] = React.useState([
      {
          id: '001',
          date: new Date(2021, 1, 20, 18, 30),
          desc: '学习九阳神功',
          time: 30
      },
      {
          id: '002',
          date: new Date(2022, 2, 10, 12, 30),
          desc: '学习降龙十八掌',
          time: 20
      },
      {
          id: '003',
          date: new Date(2022, 2, 11, 11, 30),
          desc: '学习JavaScript',
          time: 40
      },
      {
          id: '004',
          date: new Date(2022, 2, 15, 10, 30),
          desc: '学习React',
          time: 80
      }
  ]);

  // 将LogsForm中的数据传递给App组件，通过App组件进行数据的添加。
  const onSaveLogHandler = (newLog) => {
    // 向新日志添加id
    newLog.id = Date.now() + ''
    setLogsData([newLog, ...logsData]);
  }

  const deleteLogByIndex = (id) => {
    setLogsData(prevState => {
      const newLogs = prevState.filter(log => log.id !== id);
      return newLogs;
    })
  }
    
  return <div className="app">
    <LogsForm onSaveLog={onSaveLogHandler}/>
    <Logs logsData={logsData} onDeleteLog={deleteLogByIndex}/>
  </div>
};

// 导出App
export default App;
```

删除需要进行传参，故可在中间组件 **Logs.js** 中使用匿名函数来封装 **onDeleteLog** **回调函数，确保每次进行删除时，onDeleteLog** 能正确处理响应的 **id** 值。

**src/Components/Logs/Logs.js**
```js
/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';
import Card from "../UI/Card/Card";

const Logs = (props) => {  
  // 循环遍历数据，生成对应的item

  const logItemData = props.logsData.map(itme => <LogItem onDeleteLog={()=>props.onDeleteLog(itme.id)} key={itme.id} date={itme.date} LogDesc={itme.desc} LogTime={itme.time}></LogItem>)

  return <Card className="logs">
    {
      logItemData
      // logsData.map(item => <LogItem {...item}/> )
    }
  </Card>
};

export default Logs;
```

## 空列表提示

当列表为空时，提示信息

**src/Components/Logs/Logs.js**

```js
/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';
import Card from "../UI/Card/Card";

const Logs = (props) => {  
  // 循环遍历数据，生成对应的item

  let logItemData = props.logsData.map(itme => <LogItem onDeleteLog={()=>props.onDeleteLog(itme.id)} key={itme.id} date={itme.date} LogDesc={itme.desc} LogTime={itme.time}></LogItem>)

  if(logItemData.length === 0) {
    logItemData = <p>空日志列表！</p>
  }

  return <Card className="logs">
    {
      logItemData
      // logItemData.length !== 0 ? logItemData : <p>空日志列表！</p>
      // logsData.map(item => <LogItem {...item}/> )
    }
  </Card>
};

export default Logs;
```

## 添加confirmModal

在初始删除时，确认删除窗口使用的是 **window.confirm()** ，将其替换为自己写的确认组件。

创建 **src/UI/ConfirmModal** 文件夹，在 **ConfirmModal** 中进行窗口的创建。

**src/UI/ConfirmModal/ConfirmModal.js**

```js
import React from 'react'
import Card from '../Card/Card'
import './ConfirmModal.css'

const ConfirmModal = props => {
  return <Card className="confirmModal">
    <div className='confirmText'>
      <p>{props.confirmText}</p>
    </div>
    <div className='confirmBtn'>
      <button onClick={props.onConfirm}>确认</button>
      <button onClick={props.onCancel}>取消</button>
    </div>
  </Card>
}

export default ConfirmModal
```

**src/UI/ConfirmModal/ConfirmModal.css**
```css
.confirmModal {
  display: flex;
  flex-flow: column;
  width: 200px;
  height: 100px;
  padding: 5px;
  background-color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.confirmText {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: red;
}

.confirmBtn {
  flex: auto;
  display: flex;
  justify-content: flex-end;
}

.confirmBtn button {
  width: 50px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
}
```

并在 **LogItem.js** 中引入使用，通过变量控制窗口显示隐藏，并创建相应的确认，删除函数，将其传递给 **ConfirmModal.js** 使用。

**src\Components\UI\ConfirmModal\ConfirmModal.js**
```js
import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Card from '../../UI/Card/Card'
import ConfirmModal from '../../UI/ConfirmModal/ConfirmModal'

const LogItem = (props) => {

  // 添加state ，控制删除窗口显示
  const [showDelConfirm, setshowDelConfirm] = React.useState(false)

  const deleteItemHandler = () => {
    setshowDelConfirm(true)
  }

  // 定义取消删除函数
  const cancelDeleteHandler = () => {
    setshowDelConfirm(false)
  }

  // 定义确认删除函数
  const confirmDeleteHandler = () => {
    props.onDeleteLog()
    setshowDelConfirm(false)
  }

  return (
    <Card className='item'>
      {showDelConfirm && <ConfirmModal confirmText='确认删除吗？' onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler} />}
      <MyDate date={props.date}></MyDate>
      {/* 内容容器 */}
      <div className='content'>
        <h2 className='desc'>{props.LogDesc}</h2>
        <div className='time'>{props.LogTime}</div>
      </div>

      <div>
        <div className='delete' onClick={deleteItemHandler}>×</div>
      </div>
    </Card>
  )
}

export default LogItem
```

## 添加遮罩层

创建 **src\Components\UI\BackDrop** 文件夹，进行遮罩层创建。

在 ConfirmModal 中引入遮罩层进行使用，并在 BackDrop.js 的代码中通过 props.children 在遮罩层中进行显示。

**src\Components\UI\BackDrop\BackDrop.js**
```js
import React from 'react'
import './BackDrop.css'

const BackDrop = (props) => {
  return (
    <div className='backDrop'>
      {props.children}
    </div>
  )
}

export default BackDrop
```

**src\Components\UI\BackDrop\BackDrop.css**

```css
.backDrop{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0, .3);
}
```

**src\Components\UI\ConfirmModal\ConfirmModal.js**
```js
import React from 'react'
import Card from '../Card/Card'
import './ConfirmModal.css'
import BackDrop from '../BackDrop/BackDrop'

const ConfirmModal = props => {

  return <BackDrop>
    <Card className="confirmModal">
      <div className='confirmText'>
        <p>{props.confirmText}</p>
      </div>
      <div className='confirmBtn'>
        <button onClick={props.onConfirm}>确认</button>
        <button onClick={props.onCancel}>取消</button>
      </div>
    </Card>
  </BackDrop>
}

export default ConfirmModal
```

## 遮罩层优化 Protal

目前遮罩层在文档结构中，输入 **LogItem** 的一个子组件，某种程度上其只作用于其父元素。

目前遮罩层可以正常遮罩整个文档流。但是如果将父元素的定位设置为 **相对定位**，那么遮罩层就会变为只遮罩其父元素，而不是整个文档流。

此时可通过为遮罩层设置较高的 **z-index** 进行解决，但是其仍然在父元素中，如果父元素层级不够，可能会造成遮罩不完全的问题。

主要问题还是因为遮罩层是单个列表项的子元素。

问题类型：

在React中，父组件引入子组件后，子组件会直接在父组件内部染。换句话说，React元素中的子组件，在DOM中，也会是其父组件对应DOM的后代元素。

但是，在有些场景下如果将子组件直接渲染为父组件的后代，在网页显示时会出现一些问题。

比如，需要在React中添加一个会盖住其他元素的Backdrop组件，Backdrop显示后，页面中所有的元素都会被遮盖。很显然这里需要用到定位，但是如果将遮罩层直接在当前组件中染的话，遮罩层会成为当前组件的后代元素。

如果此时，当前元素后边的兄弟元素中有开启定位的情况出现，且层级不低于当前元素时，便会出现盖住遮罩层的情况。

### Protal

  - 组件默认会作为父组件的后代渲染到页面中，但是有些情况下，这种方式会带来一些问题。
  - 通过portal可以将组件渲染到页面中的指定位置。
  - 使用方法：
    1. 在index.html添加一个新的元素。
    2. 修改组件的渲染方式。
        - 通过ReactDOM.createPortal()作为返回值创建元素。
        - 参数：
            1. jsx（修改前return后的代码）。
            2. 目标位置（DOM元素）。


在 **public/index.html** 中创建遮罩层根元素容器。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>学习log</title>
</head>
<body>
  <div id="root"></div>
  <!-- 遮罩层容器 -->
  <div id="backdrop-root"></div>
</body>
</html>
```

在 ConfirmModal 中的内容最后也是在 backdrop 中显示，故在 backdrop 中进行设置。

**src\Components\UI\BackDrop\BackDrop.js**

```js
import React from 'react'
import ReactDOM from 'react'
import './Backdrop.css'

// 获取backdrop-root
const BackdropRoot = document.getElementById('backdrop-root')

const Backdrop = (props) => {
  return ReactDOM.createPortal(<div className='backdrop'>
    {props.children}
  </div>, BackdropRoot)
}

export default Backdrop
```

## 年份过滤

创建 **src/Components/LogsFilter/LogsFilter.js** ，接收父组件传入的年份信息，并创建选择框变化的监听函数，在选择框变化时，调用父组件传入的函数，并将改变的值作为参数传送。

```js
import React from 'react'

const LogsFilter = (props) => {
  // 监听事件
  const changeYear = e => {
    console.log(+e.target.value);
    props.onChange(+e.target.value);
  }
  return (
    <div>
      年份：
      <select value={props.year} onChange={changeYear}>
        <option value={2021}>2021</option>
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
      </select>
    </div>
  )
}

export default LogsFilter
```

在 **src/Components/Logs/Logs.js** 中，定义 setYear-state，并创建年份改变的函数，将其传递给子组件。设置根据年份过滤数据，并在循环遍历数据，生成item时使用过滤后的数据。

**src/Components/Logs/Logs.js**

```js
/* 日志的容器 */
import React from "react";
import LogItem from "./LogItem/LogItem";
import './Logs.css';
import Card from "../UI/Card/Card";
import LogsFilter from "../LogsFilter/LogsFilter";

const Logs = (props) => {  
  // 创建存储年份的state
  const [year, setYear] = React.useState(2022)
  // 过滤数据，只显示某一年的数据
  let filterData = props.logsData.filter(item => item.date.getFullYear() === year)
  const changeYear = (year)=>{
    setYear(year)
  }
  // 循环遍历数据，生成对应的item
  let logItemData = filterData.map(itme => <LogItem onDeleteLog={()=>props.onDeleteLog(itme.id)} key={itme.id} date={itme.date} LogDesc={itme.desc} LogTime={itme.time}></LogItem>)
  if(logItemData.length === 0) {
    logItemData = <p>空日志列表！</p>
  }
  return <Card className="logs">
    <LogsFilter year={year} onChange={changeYear}/>
    {
      logItemData
      // logItemData.length !== 0 ? logItemData : <p>空日志列表！</p>
      // logsData.map(item => <LogItem {...item}/> )
    }
  </Card>
};

export default Logs;
```









