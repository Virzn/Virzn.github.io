# 会话控制

Cookie

Session

Token

### 1  Cookie

**res.cookie**

```JavaScript
// 导入expree
const express = require('express')

// 创建应用对象
const app = express()

// 创建路由规则
app.get('/set-cookie', (req, res) => {
  // res.cookie('name', 'zhangsan') //浏览器关闭时会销毁
  // cookie生命周期，单位为毫秒
  res.cookie('name', 'lisi', {maxAge: 60 * 1000})
  res.send('home')
})

// 启动服务
app.listen(3000)
```

**res.clearCookie()**

```JavaScript
app.get('/remove-cookie', (req, res) => {
  // 删除cookie
  res.clearCookie('theme')
  res.send('删除成功')
})
```

获取Cookie

1. **导入cookie-parser**
2. **app.use(cookieParser())**
3. **req.cookies**

```JavaScript
// 导入expree
const express = require('express')
const cookieParser = require('cookie-parser')
// 创建应用对象
const app = express()
app.use(cookieParser())
// 创建路由规则
app.get('/set-cookie', (req, res) => {
  // res.cookie('name', 'zhangsan') //浏览器关闭时会销毁
  // cookie生命周期，单位为毫秒
  res.cookie('name', 'lisi', {maxAge: 60 * 1000})
  res.cookie('theme', 'blue')
  res.send('home')
})

app.get('/remove-cookie', (req, res) => {
  // 删除cookie
  res.clearCookie('theme')
  res.send('删除成功')
})

// 获取cookie
app.get('/get-cookie', (req, res) => {
  console.log(req.cookies);
  res.send('获取cookie')
})

// 启动服务
app.listen(3000)
```

### 2 Session

使用 **express-session  connect-mongo** 

设置 **session** 中间件

使用 **req.session.xxx**进行设置与读取session信息

使用**req.session.destory()**进行销毁session信息

```JavaScript
// 导入express
const express = require('express')
// 1.导入express-session connect-mongo
const session = require('express-session')
const MongoStore = require('connect-mongo')

// 创建应用对象
const app = express()

// 2.设置session中间件
app.use(session({
  name: 'sid',  //设置响应cookie的名字
  secret: 'atguigu', //参与加密的字符串
  saveUninitialized: false, //是否为每一次请求都设置一个cookie用来存储sessionid
  resave: true, //是否在每次请求时重新保存session,即每次请求都重置session的过期时间
  store : MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/project' //数据库的连接配置
  }),
  cookie: {
    httpOnly : true,  //开启后前端无法通过JS进行操作
    maxAge: 300 * 1000  //控制sessionId的过期时间
  }
}))

// 首页路由
app.get('/', (req, res) => {
  res.send('home')
})

// 登录
app.get('/login', (req, res) => {
  // username
  if(req.query.username == 'admin' && req.query.password == 'admin'){
    req.session.username = 'admin'
    req.session.uid = '41233123'
    res.send('登录成功')
  }else{
    res.send('登录失败')
  }
})

// session读取
app.get('/cart', (req, res)=>{
  if(req.session.username){
    res.send(`购物车 ${req.session.username}`)
  }else{
    res.send('未登录')
  }
})

// session销毁
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('销毁成功')
  })
})

// 监听服务
app.listen(3000)
```

### 3 session和cookie区别

**存储位置**

cookie：浏览器端

session：服务端

**安全性**

cookie以明文的方式存储在客户端，安全性相对较低

session存放于服务器端，相对较安全

**网络传输量**

cookie设置内容过多会增大报文体积，影响传输效率

session数据存储在服务器，只通过cookie传递id，不影响传输效率

**存储限制**

浏览器限制单个cookie保存的数据不能超过4k，且单个域名下的存储数量也有限制。

session存储在服务器中，没有限制。

### 4 Token

#### 4.1 特点

- 服务端压力小
  - 数据存储在客户端
- 相对更安全
  - 数据加密
  - 可避免CSRF
- 扩展性更强
  - 服务间可共享
  - 增加服务节点更简单

#### 4.2 JWT

跨域认证解决方案，可用于基于token的身份验证

```JavaScript
npm i jsonwebtoken
const jwt = require('jsonwebtoken')

// 创建token
// let token = jwt.sign(用户数据，加密字符串，配置对象)
// let token = jwt.sign({
//   username : 'zhangsan'
// }, 'atguigu',{
//   expiresIn: 60 //生命周期,单位秒
// })

// console.log(token);

let t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpoYW5nc2FuIiwiaWF0IjoxNzExODAwNTY0LCJleHAiOjE3MTE4MDA2MjR9.ExEzcPTWgvxEUxNdAcFdFQ9Zx2bh3mVTCd5Npkiiluo'
// 校验token
jwt.verify(t, 'atguigu', (err, data) => {
  if(err){
    console.log('校验失败');
    return
  }
  console.log(data);
})
```

### 5 案例优化Sessionv4.0

#### 5.1 注册

在views中创建auth存放注册页面 **reg.ejs**

```JavaScript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>注册</title>
  <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
        <h2>注册</h2>
        <hr />
        <form method="post" action="/reg">
          <div class="form-group">
            <label for="item">用户名</label>
            <input name="username" type="text" class="form-control" id="item" />
          </div>
          <div class="form-group">
            <label for="time">密码</label>
            <input name="password" type="password" class="form-control" id="time" />
          </div>
          <hr>
          <button type="submit" class="btn btn-primary btn-block">注册</button>
        </form>
      </div>
    </div>
  </div>
</body>

</html>
```

在路由规则中添加auth的对应信息 **auth.js**

```JavaScript
var express = require('express');
var router = express.Router();

const UserModel = require('../../models/userModel');

// 注册
router.get('/reg', (req, res) => {
  // 响应html文件
  res.render('auth/reg')
})

// 注册
router.post('/reg', (req, res) => {
  // 获取请求体数据
  console.log(req.body);
  UserModel.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send('注册失败')
      return
    }
    res.render('success', { msg: '注册成功', url: '/login' })
  })
})

module.exports = router;
```

在 **app.js** 中引入路由规则

```JavaScript
 var authRouter = require('./routes/web/auth');
 
 app.use('/', authRouter);
```

创建路由中引入的用户对象结构文件 **userModel.js**

```JavaScript
// 导入mongoose
const mongoose = require('mongoose')

// 创建文档结构对象
let UserSchema = mongoose.Schema({
  username : {
    type: String,
    required: true
  },
  password: {
    type : String,
    required: true
  }
})

// 创建模型对象
let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
```

#### 5.2 登录

创建登录页面文件 **login.ejs**

```JavaScript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>登录</title>
  <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css" rel="stylesheet" />
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-8 col-md-offset-2 col-lg-4 col-lg-offset-4">
        <h2>登录</h2>
        <hr />
        <form method="post" action="/login">
          <div class="form-group">
            <label for="item">用户名</label>
            <input name="username" type="text" class="form-control" id="item" />
          </div>
          <div class="form-group">
            <label for="time">密码</label>
            <input name="password" type="password" class="form-control" id="time" />
          </div>
          <hr>
          <button type="submit" class="btn btn-primary btn-block">登录</button>
        </form>
      </div>
    </div>
  </div>
</body>

</html>
```

在路由规则中添加登录get页面，以及post登录操作 **auth.js**

```JavaScript
// 登录
router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  // 查询数据库
  // 获取用户名和密码
  let {username, password} = req.body
  UserModel.findOne({username : username, password : password }, (err, data) => {
    if(err){
      res.status(500).send('登录失败')
      return
    }
    // 判断data
    console.log(data);
    if(!data){
      return res.send('账号或密码错误')
    }
    // 成功响应
    res.render('success', {msg: '登录成功', url: '/account'})
  })
})
```

登录时创建相关的sessionid等信息

首先下载 **express-session connect-mongo** 等依赖

在 **app.js** 中引入路由文件，并设置session中间件

```JavaScript
// 导入express-session connect-mongo
const session = require('express-session');
const MongoStore = require('connect-mongo');
// 导入数据库配置项文件
const {DBHOST, DBPORT, DBNAME} = require('./config/config')

var app = express();

// 设置session中间件
 app.use(session({
  name: 'sid', //设置cookie的name，默认为connect.sid
  secret: 'atguigu', //参与机密的字符串
  saveUninitialized: false, //是否为每次请求都设置一个cookid来存储sessionid
  resave: true, //是否在每次请求后重置session的过期时间
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` //数据库连接信息
  }),
  cookie:{
    httpOnly: true, //开启后前端无法通过JS操作
    maxAge: 1000 * 60 * 60 * 24 * 7 //控制session的过期时间
  }
 }))
```

在 auth.js 路由文件中登录成功后写入session

```JavaScript
router.post('/login', (req, res) => {
  // 查询数据库
  // 获取用户名和密码
  let {username, password} = req.body
  UserModel.findOne({username : username, password : password }, (err, data) => {
    if(err){
      res.status(500).send('登录失败')
      return
    }
    // 判断data
    console.log(data);
    if(!data){
      return res.send('账号或密码错误')
    }
    // 写入session
    req.session.username = data.username
    req.session._id = data._id
    // 成功响应
    res.render('success', {msg: '登录成功', url: '/account'})
  })
})
```

 对用户的登录信息进行校验

使用路由中间件进行验证，创建 **middlewares** 文件夹存放中间件函数，创建 **checkLoginMiddlewares.js**

```JavaScript
// 声明中间件
let checkLoginMiddleware = (req, res, next) => {
  // 路由回调时进行判断
  if (!req.session.username) {
    return res.redirect('/login');
  }
  next();
}

module.exports = checkLoginMiddleware;
```

在 账单即 **account** 路由文件中引入中间件文件，并在对应的路由中使用

```JavaScript
var express = require('express');
var router = express.Router();
// 导入moment
const moment = require('moment');
const AccountModel = require('../../models/accountModel');

const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')

router.get('/account',checkLoginMiddleware , function (req, res, next) {
  // 获取账单信息
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      res.status(500).send('获取失败')
      return;
    }
    // 响应成功
    //list 模板名称
    res.render('list', { accounts: data, moment: moment})
  })

});

router.get('/account/create',checkLoginMiddleware , function (req, res, next) {
  res.render('create')
})

// 新增记录
router.post('/account',checkLoginMiddleware , (req, res) => {
  // 2023-02-24 => Object  moment
  // 插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }, (err, data) => {
    if (err) {
      res.status(500).send('插入失败')
      return
    }
    res.render('success', { msg: '添加成功', url: '/account' })
  })
})

// 删除记录
router.get('/account/:id',checkLoginMiddleware , (req, res) => {
  // 获取params的id参数
  let id = req.params.id
  AccountModel.deleteOne({_id : id}, (err, data) => {
    if(err){
      res.status(500).send('删除失败')
      return
    }
    res.render('success', { msg: '删除成功', url: '/account' })
  })
})

module.exports = router;
```

#### 5.3 退出登录

在路由规则中添加规则-通过销毁sessionid进行退出

```JavaScript
// 退出登录
router.get('/logout', (req, res) => {
  // 销毁session
  req.session.destroy(() => {
    res.render('success', {msg: '退出成功', url: '/login'})
  })
})
```

在 **list.ejs** 中添加退出按钮

```JavaScript
        <div class="row text-right">
          <div class="col-xs-12">
            <a href="/logout" class="btn btn-danger">退出</a>
          </div>
        </div>
```

#### 5.4 首页/404

在路由规则中添加规则，访问/重定向到 /**account**中

```JavaScript
// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向
  res.redirect('/account')
})
```

在 **app.js** 中的404路径进行配置

```JavaScript
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  // 响应404
  res.render('404')
});
```

创建响应的 **404.ejs** 文件

//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js 为腾讯公益404接口

```JavaScript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404</title>
</head>
<body>
  <script src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"></script>
</body>
</html>
```

### 6 案例优化Tokenv5.0

#### 6.1 登录响应token

在**routes-api** 下创建**auth**的接口响应

在 **/api/login** 登录接口中登录成功后，生成token，并进行响应

```JavaScript
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/userModel');
const {secret} = require('../../config/config')

// 登录
router.post('/login', (req, res) => {
  // 查询数据库
  // 获取用户名和密码
  let { username, password } = req.body
  UserModel.findOne({ username: username, password: password }, (err, data) => {
    if (err) {
      res.json({
        code: '2001',
        msg: '数据库读取失败',
        data: null
      })
      return
    }
    // 判断data
    console.log(data);
    if (!data) {
      res.json({
        code: '2002',
        msg: '用户名或密码错误',
        data: null
      })
    }
    // 生成token
    let token = jwt.sign({
      username: data.username,
      _id: data._id,
    }, secret, {
      expiresIn: 60 * 60 * 24 * 7
    }
    )
    // 响应token
    res.json({
      code: '0000',
      msg: '登陆成功',
      data: token,
    })
  })
})

module.exports = router;
```

在 **app.js** 中导入 **api/login** 接口信息

```JavaScript
const authApiRouter = require('./routes/api/auth')

app.use('/api', authApiRouter);
```

#### 6.2 token校验

使用路由中间件进行校验

在 **config.js** 文件中配置 **token** 的加密字符串 **secret**

```JavaScript
// 配置文件
module.exports = {
  DBHOST: '127.0.0.1',
  DBPORT: 27017,
  DBNAME : 'bilibili',
  secret: 'atguigu'
}
```

创建 **checkTokenMiddleware.js** 编写中间件函数，进行 **token** 的校验，校验通过后将token对应的**用户信息**存入 **req** 中。

```JavaScript
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
// 声明中间件
let checkTokenMiddleware = (req, res, next) => {
  let token = req.get('token')
  if (!token) {
    return res.json({
      code: '2003',
      msg: 'token缺失',
      data: null
    })
  }
  // 检验token
  jwt.verify(token, secret , (err, data) => {
    if (err) {
      return res.json({
        code: '2004',
        msg: '校验失败',
        data: null
      })
    }
    // 保存用户信息
    req.user = data;
    // 校验成功
    next()
  })
}

module.exports = checkTokenMiddleware
```

在账户接口 /api/account.js 中导入 token 校验中间件， 并在每个接口中使用

```JavaScript
// 引入token校验中间件
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');


router.get('/account', checkTokenMiddleware, function (req, res, next) {
  console.log(req.user);
  // 获取账单信息
  AccountModel.find().sort({ time: -1 }).exec((err, data) => {
    if (err) {
      // res.status(500).send('获取失败')
      res.json({
        code: '1001',
        msg: '读取失败',
        data: null,
      })
      return;
    }
    // 响应成功
    //list 模板名称
    // res.render('list', { accounts: data, moment: moment})
    res.json({
      // 响应编号
      code: '0000',
      // 响应的信息
      msg: '读取成功',
      // 响应的数据
      data: data,
    })
  })
});

....
```
