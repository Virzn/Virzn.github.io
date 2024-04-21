# 数据库和身份认证

### 1 常用命令

#### 1.1 数据库命令

| show dbs                  | 显示所有数据库                     |
| ------------------------- | ---------------------------------- |
| use name                  | 切换数据库，数据库不存在会自动创建 |
| db                        | 显示当前所在的                     |
| use namedb.dropDatabase() | 删除当前数据库                     |

#### 1.2 集合命令

| db.createCollection('集合名称')       | 创建集合                   |
| ------------------------------------- | -------------------------- |
| show collections                      | 显示当前数据库中的所有集合 |
| db.集合名.drop()                      | 删除某个集合               |
| db.集合名.renameCollection('newName') | 重命名集合                 |

#### 1.3 文档命令

| db.集合名.insert(文档对象)                                   | 插入文档 |
| ------------------------------------------------------------ | -------- |
| db.集合名.find(查询条件)                                     | 查询文档 |
| db.集合名.update(查询条件, 新的文档)db.集合名.update({name:"张三"}, {$set:{age:19}}) | 更新文档 |
| db.集合名.remove(查询条件)                                   | 删除文档 |

### 2 Mongoose

#### 2.1 介绍

对象文档模型库

http://www.mongoosejs.net/

可通过代码操作mongodb数据库

#### 2.2 使用流程

```JavaScript
// 1.导入
const mongoose = require('mongoose')

// 2.连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')
// 设置strictQuery
mongoose.set('strictQuery', true);

// 3.设置回调
//连接成功的回调，回调函数只执行一次
mongoose.connection.once('open', () => {
  console.log('连接成功');
  // 4.创建文档的结构对象
  // Schema设置集合中文档的属性以及属性类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
  })
  // 5.创建模型对象 对文档进行操作
  let BookModel = mongoose.model('books', BookSchema)
  // 6.新增
  BookModel.create({
    name: '西游记',
    author:'吴承恩',
    price: 100
  }, (err, data) => {
    if(err){
      console.log('错误信息',err);
      return
    }
    console.log(data);
    // 7.关闭连接
    mongoose.disconnect()
  })
})
//连接失败的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
})
//连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
}) 
```

#### 2.3 字段类型

| String     | 字符串                                                       |
| ---------- | ------------------------------------------------------------ |
| Number     | 数字                                                         |
| Boolean    | 布尔值                                                       |
| Array      | 数组                                                         |
| Date       | 日期                                                         |
| Buffer     | Buffer对象                                                   |
| Mixed      | 任意类型，需要使用  **mongoose.Schema.Types.Mixed** 指定     |
| ObjectId   | 对象 ID，需要使用  **mongoose.Schema.Types.ObjectId** 指定   |
| Decimal128 | 高精度数字，需要使用  **mongoose.Schema.Types.Decimal128** 指定 |

```JavaScript
// 1.导入
const mongoose = require('mongoose')

// 2.建立连接
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 3.设置回调
// 连接成功的回调
mongoose.connection.once('open',()=>{
  // 4.创建文档的结构对象
  let BookSchema = mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    isHot: Boolean,
    tags: Array,
    pubTime : Date,
  })

  // 5.创建模型对象，操作文档 books为要操作的集合名称，BookSchema为结构对象
  let BookModel = mongoose.model('books',BookSchema)

  // 6.新增
  BookModel.create({
    name : '西游记',
    author : '吴承恩',
    price : 100,
    isHot : true,
    tags : ['西', '有', '即'],
    pubTime : new Date()
  }, (err, data) => {
    if(err){
      console.log('错误信息', err);
      return
    }
    console.log(data);
  })
}); 

// 连接失败的回调
mongoose.connection.once('error', ()=> {
  console.log('连接失败');
})

// 连接关闭的回调
mongoose.connection.once('close', ()=>{
  console.log('连接关闭');
})
```

#### 2.4 字段值验证

```JavaScript
// 1.导入
const mongoose = require('mongoose')

// 2.建立连接
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 3.设置回调
// 连接成功的回调
mongoose.connection.once('open',()=>{
  // 4.创建文档的结构对象
  let BookSchema = mongoose.Schema({
    // 必填  唯一值
    name: {
      type: String,
      required : true, // 必填
      unique : true, // 唯一
    },
    // 默认值
    author: {
      type: String,
      default: '匿名'
    },
    // 枚举值
    style : {
      type: String,
      enum: ['玄幻', '魔幻']
    },
    
    price: Number,
    isHot: Boolean,
    tags: Array,
    pubTime : Date,
  })

  // 5.创建模型对象，操作文档 books为要操作的集合名称，BookSchema为结构对象
  let BookModel = mongoose.model('books',BookSchema)

  // 6.新增
  BookModel.create({
    name : '西游记',
    author : '吴承恩',
    price : 100,
    isHot : true,
    tags : ['西', '有', '即'],
    pubTime : new Date()
  }, (err, data) => {
    if(err){
      console.log('错误信息', err);
      return
    }
    console.log(data);
  })
}); 

// 连接失败的回调
mongoose.connection.once('error', ()=> {
  console.log('连接失败');
})

// 连接关闭的回调
mongoose.connection.once('close', ()=>{
  console.log('连接关闭');
})
```

#### 2.5 CURD(增改查删)

##### 2.5.1 插入

插入一条 **BookModel.create({}, (****err****, data) => {})**

插入多条 **BookModel.insertMany([], (****err****, data) => {})**

```JavaScript
// 3.设置回调
// 连接成功的回调
mongoose.connection.once('open',()=>{
  // 4.创建文档的结构对象
  let BookSchema = mongoose.Schema({
    // 必填  唯一值
    name: {
      type: String,
      required : true, // 必填
      unique : true, // 唯一
    },
    // 默认值
    author: {
      type: String,
      default: '匿名'
    },
    // 枚举值
    style : {
      type: String,
      enum: ['玄幻', '魔幻']
    },
    
    price: Number,
    isHot: Boolean,
    tags: Array,
    pubTime : Date,
  })

  // 5.创建模型对象，操作文档 books为要操作的集合名称，BookSchema为结构对象
  let BookModel = mongoose.model('books',BookSchema)

  // 6.新增一条
  BookModel.create({
    name : '西游记',
    author : '吴承恩',
    price : 100,
    isHot : true,
    tags : ['西', '有', '即'],
    pubTime : new Date()
  }, (err, data) => {
    if(err){
      console.log('错误信息', err);
      return
    }
    console.log(data);
  })
  
   //7. 新增多条
  BookModel.insertMany([{
    name: '西游记',
    author: '吴承恩',
    price: 19.9,
    is_hot: true
  }, {
    name: '红楼梦',
    author: '曹雪芹',
    price: 29.9,
    is_hot: true
  },], (err, data) => {
    //判断是否有错误
    if (err) {
      console.log(err);
      return;
    }
    //如果没有出错, 则输出插入后的文档对象
    console.log(data);
    //8. 关闭数据库连接 (项目运行过程中, 不会添加该代码)
    mongoose.disconnect();
  });
}); 
```

##### 2.5.2 删除

删除一条 **BookModel.deleteOne({},function())**

删除多条 **BookModel.deleteMany({}, function())**

```JavaScript
//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });

  //6. 创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model('novel', BookSchema);

  // 7.删除一条
  BookModel.deleteOne({id: '6606ace1d699b73651fe2083'}, (err, data) => {
    if(err){
      console.log('错误信息',err);
      return
    }
    console.log(data);
  })

  // 8.批量删除
  BookModel.deleteMany({is_hot : false}, (err, data) => {
    if(err){
      console.log('错误信息', err);
      return;
    }
    console.log(data);
  })
});
```

##### 2.5.3 更新

更新一条 **BookModel.updateOne({}, {}, function())**

更新多条 **BookModel.updateMany({}, {}, function())**

```JavaScript
 //4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });

  //6. 创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model('novel', BookSchema);

  // 7.更新一条
  // BookModel.updateOne({ name: '红楼梦' }, { price: 9.9 }, (err, data) => {
  //   if (err) {
  //     console.log('错误信息', err);
  //     return;
  //   }
  //   console.log(data);
  // })

  // 8.更新多条
  BookModel.updateMany({ author: '余华' }, { is_hot: true }, (err, data) => {
    if (err) {
      console.log('错误信息', err);
      return;
    }
    console.log(data);
  })
});
```

##### 2.5.4 查询

查询一条 

**BookModel.findOne({}, function())**

**BookModel.findById(id, function())**

查询多条

**BookModel.find({}, function())**

```JavaScript
//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });

  //6. 创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model('novel', BookSchema);

  // 7.读取单条
  // BookModel.findOne({ name: '狂飙' }, (err, data) => {
  //   if (err) {
  //     console.log('错误信息', err);
  //     return;
  //   }
  //   console.log(data);
  // })

  // 根据id获取
  // BookModel.findById('6606ace1d699b73651fe2088', (err, data) => {
  //   if (err) {
  //     console.log('错误信息', err);
  //     return;
  //   }
  //   console.log(data);
  // })

  // 8.批量获取
  // BookModel.find({ author: '余华' }, (err, data) => {
  //   if (err) {
  //     console.log('错误信息', err);
  //     return;
  //   }
  //   console.log(data);
  // })
  BookModel.find({}, (err, data) => {
    if (err) {
      console.log('错误信息', err);
      return;
    }
    console.log(data);
  })
});
```

#### 2.6 条件控制

| >    | $gt                                                          |
| ---- | ------------------------------------------------------------ |
| <    | $lt                                                          |
| >=   | $gte                                                         |
| <=   | $lte                                                         |
| !==  | $ne                                                          |
| \|\| | db.students.find({$or:[{age:18},{age:24}]});                 |
| &&   | db.students.find({$and: [{age: {$lt:20}}, {age: {$gt: 15}}]}); |
| 正则 | BookModel.find({name: new RegExp('三')})                     |

```JavaScript
 //1. 安装 mongoose
//2. 导入 mongoose
const mongoose = require('mongoose');

//设置 strictQuery 为 true
mongoose.set('strictQuery', true);

//3. 连接 mongodb 服务                        数据库的名称
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once('open', () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });

  //6. 创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model('novel', BookSchema);

  // 价格小于20
  // BookModel.find({ price: { $lt: 20 } }, (err, data) => {
  //   if (err) {
  //     console.log('错误信息', err);
  //     return;
  //   }
  //   console.log(data);
  // })

  // 逻辑或运算
  // BookModel.find({ $or: [{ author: '曹雪芹' }, { author: '余华' }] }, (err, data) => {
  //   if (err) {
  //     console.log('错误信息', err);
  //     return;
  //   }
  //   console.log(data);
  // })

    // 逻辑与运算
    // BookModel.find({$and: [{price : {$gt: 30}}, {price : {$lt: 70}}]}, (err, data) => {
    //   if(err){
    //     console.log('错误',err );
    //     return
    //   }
    //   console.log(data);
    // })

    // 正则匹配 模糊查询
    // BookModel.find({name: /三/}, (err, data) => {
    //   if(err){
    //     console.log('错误',err );
    //     return
    //   }
    //   console.log(data);
    // })

    BookModel.find({name: new RegExp('三')}, (err, data) => {
      if(err){
        console.log('错误',err );
        return
      }
      console.log(data);
    })
});

// 设置连接错误的回调
mongoose.connection.on('error', () => {
  console.log('连接失败');
});

//设置连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
});
```

#### 2.7 个性化读取

##### 2.7.1 字段筛选

```JavaScript
  // 7.设置字段 select 0要1不要
  BookModel.find().select({name: 1, author: 1,}).exec((err, data) => {
    if(err){
      console.log('出错了');
      return
    }
    console.log(data);
  })
```

##### 2.7.2 数据排序

```JavaScript
  // 8.数据排序  sort -1降1升
    BookModel.find().sort({price: 1}).exec((err, data) => {
      if(err){
        console.log('出错了');
        return
      }
      console.log(data);
    })
```

##### 2.7.3 数据截断

```JavaScript
    // 9.数据截断 取4-6名数据   limit(x) 前x名  skip(3)  跳过前三个
    BookModel.find().sort({price: 1}).limit(3).skip(3).exec((err, data) => {
      if(err){
        console.log('出错了');
        return
      }
      console.log(data);
    })
```

#### 2.8 模块化

主文件 **index.js**

```JavaScript
// 导入db
const db = require('./db/db')
// 导入电影模型对象
const MovieModel = require('./models/MovieModel')

db(()=>{
  // 电影模型对象
  MovieModel.create({title : "奥本海默", director : '诺兰'}, (err, data) => {
    if(err){
      console.log('插入出错了', err);
      return;
    }
    console.log(data);
  })
})
```

数据库连接信息 **db.js**

```JavaScript
module.exports = function (success, error) {
  // db不传第二个参数时，默认赋值
  if(typeof error !== 'function'){
    error = () => {
      console.log('连接失败');
    }
  }
  // 1.导入
  const mongoose = require('mongoose')

  // 导入数据库配置文件
  const { DBHOST, DBPORT, DBNAME} = require('../config/config')

  // 2.连接mongodb服务
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
  // 设置strictQuery
  mongoose.set('strictQuery', true);

  // 3.设置回调
  //连接成功的回调，回调函数只执行一次
  mongoose.connection.once('open', () => {
    success()

  })
  //连接失败的回调
  mongoose.connection.on('error', () => {
    error()
  })
  //连接关闭的回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  })
}
```

模型对象文件 **MovieModel.js**

```JavaScript
// 导入mongoose
const mongoose = require('mongoose')

// 创建文档结构
const MovieSchema = new mongoose.Schema({
  name: String,
  director: String,
})

// 创建模型对象
const MovieModel = mongoose.model('movie', MovieSchema)

// 暴露模型对象
module.exports = MovieModel
```

数据库配置文件 **config.js**

```JavaScript
// 配置文件
module.exports = {
  DBHOST: '127.0.0.1',
  DBPORT: 27017,
  DBNAME : 'bilibili'
}
```

### 3  图形化管理工具

ROBO 3T https://github.com/Studio3T/robomongo/releases

Navicat https://www.navicat.com.cn/

### 4 记账案例v2.0

将mongodb引入记账案例中。

#### 1 创建数据库配置文件

**config.js**

```JavaScript
// 配置文件
module.exports = {
  DBHOST: '127.0.0.1',
  DBPORT: 27017,
  DBNAME : 'bilibili'
}
```

#### 2 创建db数据库连接

**db.js**

```JavaScript
module.exports = function (success, error) {
  // db不传第二个参数时，默认赋值
  if(typeof error !== 'function'){
    error = () => {
      console.log('连接失败');
    }
  }
  // 1.导入
  const mongoose = require('mongoose')

  // 导入数据库配置文件
  const { DBHOST, DBPORT, DBNAME} = require('../config/config')

  // 2.连接mongodb服务
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
  // 设置strictQuery
  mongoose.set('strictQuery', true);

  // 3.设置回调
  //连接成功的回调，回调函数只执行一次
  mongoose.connection.once('open', () => {
    success()

  })
  //连接失败的回调
  mongoose.connection.on('error', () => {
    error()
  })
  //连接关闭的回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭');
  })
}
```

#### 3 创建账户模型对象

**accountModel.js**

```JavaScript
// 导入mongoose
const mongoose = require('mongoose')

// 创建文档结构对象
let AccountSchema = mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  time : Date,
  type : {
    type: Number,
    default: -1
  },
  account : {
    type : Number,
    required: true
  },
  remarks: {
    type : String,
  }
})

// 创建模型对象
let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel
```

#### 4 在入口文件中引入db

设置数据库连接成功之后再进行服务启动

**bin/www.js**

```JavaScript
#!/usr/bin/env node
// 导入db
const db = require('../db/db')

db(() => {
  /**
   * Module dependencies.
   */

  var app = require('../app');
  var debug = require('debug')('accounts:server');
  var http = require('http');

  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
})
```

#### 5 在routes-index中进行数据操作

其中使用 **moment** 对日期格式进行转换

导入**模型对象**进行操作

```JavaScript
var express = require('express');
var router = express.Router();
// 导入moment
const moment = require('moment');
const AccountModel = require('../models/accountModel');

router.get('/account', function (req, res, next) {
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

router.get('/account/create', function (req, res, next) {
  res.render('create')
})

// 新增记录
router.post('/account', (req, res) => {
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
router.get('/account/:id', (req, res) => {
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

另外页面对应的ejs文件也有所修改。
