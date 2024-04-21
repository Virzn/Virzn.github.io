#  API 服务



### 1 RESTful API

特定：

- URL中的路径标识 **资源，**路径中不能有 **动词**，例如 create，delete，update
- 操作资源要与 **HTTP** **请求方法**对应
- 操作结果要与 **HTTP** **响应状态码**对应

| 新增歌曲     | POST   | /song    | 返回新生成的歌曲信息 |
| ------------ | ------ | -------- | -------------------- |
| 删除歌曲     | DELETE | /song/10 | 返回一个空文档       |
| 修改歌曲     | PUT    | /song/10 | 返回更新后的歌曲信息 |
| 修改歌曲     | PATCH  | /song/10 | 返回更新后的歌曲信息 |
| 获取所有歌曲 | GET    | /song    | 返回歌曲列表数组     |
| 获取单个歌曲 | GET    | /song/10 | 返回单个歌曲信息     |

[RESTful API 设计指南 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)

### 2 JSON-SERVER

是一个 **JS** 编写的工具包，可以快速搭建 **RESTful API** 服务 

https://github.com/typicode/json-server

1.全局安装：

```JavaScript
npm i -g json-server
```

2.创建**JSON**文件(**db.json**)，编写基本结构

```JavaScript
{
    "song":[
        {"id": 1, "name": "干杯", "singer": "五月天"},
        {"id": 2, "name": "唯一", "singer": "王力宏"},
        {"id": 3, "name": "晴天", "singer": "周杰伦"},
    ]
}
```

以 **JSON** **文件所在文件夹作为工作目录**，执行以下命令

```JavaScript
json-server --watch db.json
```

默认监听端口为3000

### 3 接口测试

Apipost https://www.apipost.cn/

Apifox https://apifox.com/

Postman https://www.postman.com/

### 4 记账案例v3.0

获取账单API

#### 1 获取列表API

```JavaScript
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
```

#### 2 新增账单API

```JavaScript
// 新增记录
router.post('/account', (req, res) => {
  // 2023-02-24 => Object  moment
  console.log(req.body);
  // 插入数据库
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }, (err, data) => {
    if (err) {
      // res.status(500).send('插入失败')
      res.json({
        code: '1002',
        msg: '创建失败',
        data: null
      })
      return
    }
    // res.render('success', { msg: '添加成功', url: '/account' })
    res.json({
      code: '0000',
      msg: '创建成功',
      data: data
    })
  })
})
```

#### 3 删除账单API

```JavaScript
// 删除记录
router.delete('/account/:id', (req, res) => {
  // 获取params的id参数
  let id = req.params.id
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      // res.status(500).send('删除失败')
      res.json({
        code: '1003',
        msg: '删除失败',
        data: null
      })
      return
    }
    // res.render('success', { msg: '删除成功', url: '/account' })
    res.json({
      code: '0000',
      msg: '删除成功',
      data: null
    })
  })
})
```

#### 4 获取单个信息API

```JavaScript
// 获取单个账单信息
router.get('/account/:id', (req, res) => {
  let { id } = req.params
  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        code: '1004',
        msg: '获取失败',
        data: null
      })
    }
    res.json({
      code: '0000',
      msg: '获取成功',
      data: data
    })
  })
})
```

#### 5 更新单个账单API

```JavaScript
// 更新单个账单信息
router.patch('/account/:id', (req, res) => {
  let { id } = req.params
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      return res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      })
    }
    res.json({
      code: '0000',
      msg: '更新成功',
      data: data
    })
  })
})
```

