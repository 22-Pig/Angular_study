"use strict";
const express = require('express'); // 引入express模块
const app = express(); // 调用方法生成应用

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var USERS = [{
    userName: 'admin',
    password: '123456'
  },
  {
    userName: "aaa",
    password: '123123'
  }
];

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X - Requested - With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200);
  else next();
});






// 使用 session 中间件
app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

// 获取登录页面
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login')
});

// 用户登录
app.post('/login', function (req, res) {
  const userName = req.name;
  const password = req.password;
  // if(req.body.username == 'admin' && req.body.pwd == 'admin123'){
  if (req.body.userName === userName && req.body.password === password) {
    req.session.userName = user.userName; // 登录成功，设置 session
    res.redirect('/');
  } else {
    res.json({
      ret_code: 1,
      ret_msg: '账号或密码错误'
    }); // 若登录失败，重定向到登录页面
  }
});

// 获取主页
app.get('/', function (req, res) {
      if (req.session.userName) { //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('management', {
          username: req.session.userName
        });
      } else {
        res.redirect('login');
      }

      // app.get('/users/:userName', function (req, resp) {
      //   console.log(req.params);
      //   let found = false;
      //   for (let user of USERS) {
      //     if (user.userName === userName && user.password === password) {
      //       found = true;
      //       resp.send([user]);
      //       break;
      //     }
      //   }
      //   return found;
      //   resp.end();
      // });

      // web服务器监听8000端口
      app.listen(8000, function () {
        console.log('服务器在8000端口启动！');
      });


      function getUsers() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
          }
        };
        xhttp.open("GET", "http://127.0.0.1:8000/users", true);
        xhttp.send();
      }
