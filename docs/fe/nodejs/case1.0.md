# 记账案例1.0

### 1 基本架构搭建

**express -e accounts**

**router-index.js**设置

```JavaScript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/account', function(req, res, next) {
  res.send('账本')
});

router.get('/account/create', function(req, res, next){
  res.send('添加')
})
module.exports = router;
```

### 2 静态网页响应

**router-index.js**设置**render**渲染

```JavaScript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/account', function(req, res, next) {
  //list 模板名称
  res.render('list')
});

router.get('/account/create', function(req, res, next){
  res.render('create')
})
module.exports = router;
```

创建模板**list.ejs   create.ejs**

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css"
      rel="stylesheet"
    />
    <style>
      label {
        font-weight: normal;
      }
      .panel-body .glyphicon-remove{
        display: none;
      }
      .panel-body:hover .glyphicon-remove{
        display: inline-block
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-lg-8 col-lg-offset-2">
          <h2>记账本</h2>
          <hr />
          <div class="accounts">
            <div class="panel panel-danger">
              <div class="panel-heading">2023-04-05</div>
              <div class="panel-body">
                <div class="col-xs-6">抽烟只抽煊赫门，一生只爱一个人</div>
                <div class="col-xs-2 text-center">
                  <span class="label label-warning">支出</span>
                </div>
                <div class="col-xs-2 text-right">25 元</div>
                <div class="col-xs-2 text-right">
                  <span
                    class="glyphicon glyphicon-remove"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            </div>
            <div class="panel panel-success">
              <div class="panel-heading">2023-04-15</div>
              <div class="panel-body">
                <div class="col-xs-6">3 月份发工资</div>
                <div class="col-xs-2 text-center">
                  <span class="label label-success">收入</span>
                </div>
                <div class="col-xs-2 text-right">4396 元</div>
                <div class="col-xs-2 text-right">
                  <span
                    class="glyphicon glyphicon-remove"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

对于路径的使用./等**相对路径会受到****url****路径**的影响，拼接url造成路径错误。

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>添加记录</title>
  <link href="/css/bootstrap.css" rel="stylesheet" />
  <link href="/css/bootstrap-datepicker.css" rel="stylesheet">
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-lg-8 col-lg-offset-2">
        <h2>添加记录</h2>
        <hr />
        <form>
          <div class="form-group">
            <label for="item">事项</label>
            <input type="text" class="form-control" id="item" />
          </div>
          <div class="form-group">
            <label for="time">发生时间</label>
            <input type="text" class="form-control" id="time" />
          </div>
          <div class="form-group">
            <label for="type">类型</label>
            <select class="form-control" id="type">
              <option value="">支出</option>
              <option value="">收入</option>
            </select>
          </div>
          <div class="form-group">
            <label for="account">金额</label>
            <input type="text" class="form-control" id="account" />
          </div>
          <div class="form-group">
            <label for="remarks">备注</label>
            <textarea class="form-control" id="remarks"></textarea>
          </div>
          <hr>
          <button type="submit" class="btn btn-primary btn-block">添加</button>
        </form>
      </div>
    </div>
  </div>
  <script src="/javascripts/jquery.min.js"></script>
  <script src="/javascripts/bootstrap.min.js"></script>
  <script src="/javascripts/bootstrap-datepicker.min.js"></script>
  <script src="/javascripts/bootstrap-datepicker.zh-CN.min.js"></script>
  <script src="/javascripts/main.js"></script>
</body>

</html>
```

### 3 获取表单数据

在**router-index.js**设置提交表单的路由post，并通过**req.body**进行获取数据

```JavaScript
// 新增记录
router.post('/account', (req, res) => {
  // 获取请求体数据
  console.log(req.body)
  res.send('添加记录')
})
```

在**create.ejs**中为每个数据添加name，并为**form**标签添加**method, action**属性

### 4 Lowdb

lowdb管理数据

 **npm i lowdb@1.0.0**

```JavaScript
// 导入lowdb
const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')
// 数据存入的json文件
const adapter = new FileSync('db.json')
// 获取db对象
const db = low(adapter)

// 初始化数据
// db.defaults({posts: [], user: {}}).write()

// 写入数据
// db.get('posts').push({id:3 , title: '天气不错'}).write()

// 获取数据
// console.log(db.get('posts').value());

// 获取单条
let res = db.get('posts').find({id:1}).value()
console.log(res);

// 删除  返回删除的对象
// db.get('posts').remove({id: 3}).write();

// 更新数据，先获取再赋值
db.get('posts').find({id:1}).assign({title:'天气不错11111'}).write()
```

### 5 保存账单信息

创建**data.json**数据文件

```JavaScript
{
  "accounts": []
}
```

在**routes-index.js**文件中引入**lowdb**，并设置写入文件地址，获取db对象

```JavaScript
var express = require('express');
var router = express.Router();
// 导入lowdb
const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')
// 数据存入的json文件
const adapter = new FileSync(__dirname + '/../data/db.json')
// 获取db对象
const db = low(adapter)

// 新增记录
router.post('/account', (req, res) => {
  // 写入文件
  db.get('accounts').push({ id: id, ...req.body }).write()
  res.send('添加记录')
})

module.exports = router;
```

使用**shortid**为每条数据生成唯一标识

```JavaScript
// 生成id
const shortid = require('shortid')
// 新增记录
router.post('/account', (req, res) => {
  let id = shortid.generate()
  // 获取请求体数据
  console.log(req.body)
  // 写入文件
  db.get('accounts').push({id : id , ...req.body}).write()
  res.send('添加记录')
})
```

### 6 完善成功提醒

即添加ejs模板

```JavaScript
 // 新增记录
router.post('/account', (req, res) => {
  let id = shortid.generate()
  // 获取请求体数据
  console.log(req.body)
  // 写入文件
  db.get('accounts').push({id : id , ...req.body}).write()
  res.render('success', {msg:'添加成功', url:'/account'})
})
```

success.ejs

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>提醒</title>
  <link
      href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css"
      rel="stylesheet"
    />
  <style>
    .h-50{
      height: 50px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="h-50"></div>
    <div class="alert alert-success" role="alert">
      <h1>:) <%= msg %></h1>
      <p><a href="<%= url %>">点击跳转</a></p>
    </div>
  </div>
</body>
</html>
```

### 7 帐单列表

账单列表渲染保存的账单信息

通过 **lowdb** 获取 **accounts** 的信息，并将其传给**list.ejs**

```JavaScript
router.get('/account', function(req, res, next) {
  // 获取账单信息
  let accounts = db.get('accounts').value()
  //list 模板名称
  res.render('list', {accounts: accounts})
});
```

**list.ejs** 通过 **accounts.forEach** 进行列表渲染

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css"
      rel="stylesheet"
    />
    <style>
      label {
        font-weight: normal;
      }
      .panel-body .glyphicon-remove{
        display: none;
      }
      .panel-body:hover .glyphicon-remove{
        display: inline-block
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-lg-8 col-lg-offset-2">
          <h2>记账本</h2>
          <hr />
          <div class="accounts">
            <% accounts.forEach(item => { %>
            <div class="panel <%= item.type== 1? 'panel-success' : 'panel-danger' %>">
              <div class="panel-heading"><%= item.time %></div>
              <div class="panel-body">
                <div class="col-xs-6"><%= item.remarks %></div>
                <div class="col-xs-2 text-center">
                  <span class="label <%= item.type== 1? 'label-success' : 'label-warning' %>"><%= item.type== 1? '收入' : '支出' %></span>
                </div>
                <div class="col-xs-2 text-right"><%= item.account%> </div>
                <div class="col-xs-2 text-right">
                  <span
                    class="glyphicon glyphicon-remove"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            </div>
            <% }) %>            
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

### 8 删除账单

在 **routes-index.js** 中再加入一个删除的路由，接受id参数进行删除

```JavaScript
// 删除记录
router.get('/account/:id', (req, res) => {
  // 获取params的id参数
  let id = req.params.id
  db.get('accounts').remove({id:id}).write()
  res.render('success', {msg:'删除成功', url:'/account'})
})
```

在 **list.ejs** 中的删除按钮添加 **a** **href** 进行跳转删除

```html
<div class="col-xs-2 text-right">
  <a href="/account/<%= item.id%>">
    <span
    class="glyphicon glyphicon-remove"
    aria-hidden="true"
  ></span>
  </a>
</div>
```
