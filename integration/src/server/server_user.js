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


app.get('/users', function (req, resp) {
  resp.send(USERS);
  resp.end();
});

app.get('/users/:userName', function (req, resp) {
  console.log(req.params);
  const userName = req.params.userName;
  let founded = false;
  for (let user of USERS) {
    if (user.userName === userName) {
      resp.send([user]);
      founded = true;
      break;
    }
  }
  if (founded) {
    resp.send({
      succ: true
    });
  } else {
    resp.send({
      succ: false,
      msg: '没有找到用户!'
    });
  }

  resp.end();
});

// 添加用户
app.post('/user', function (req, resp) {
  USERS.push(req.body);
  resp.send({
    succ: true
  });
  resp.end();
});

// 修改用户
app.put('/user', function (req, resp) {
  //json
  let founded = false;
  for (let user of USERS) {
    if (user.userName === req.body.userName) {
      user.userName = req.body.userName;
      user.password = req.body.password;
      founded = true;
      break;
    }
  }

  if (founded) {
    resp.send({
      succ: true
    });
  } else {
    resp.send({
      succ: false,
      msg: '没有找到用户!'
    });
  }
  resp.end();
});

// 删除用户
app.delete('/user/:userName', function (req, resp) {
  let founded = false;
  let index = 0;
  for (const user of USERS) {
    if (user.userName === req.params.userName) {
      USERS.splice(index, 1);
      founded = true;
      break;
    }
    index++;
  }

  if (founded) {
    resp.send({
      succ: true
    });
  } else {
    resp.send({
      succ: false,
      msg: '没有找到需要删除的用户!'
    });
  }
  resp.end();
});


// web服务器监听8848端口
app.listen(8848, function () {
  console.log('服务器在8848端口启动!');
});


function getUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "http://127.0.0.1:8848/users", true);
  xhttp.send();
}

function addUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "http://127.0.0.1:8848/user/", true);
  const user = {
    userName: document.getElementById('userName').value,
    password: document.getElementById('password').value
  }
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(user));
}
