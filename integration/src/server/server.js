"use strict";
const express = require('express'); // 引入express模块
const app = express(); // 调用方法生成应用

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var USERS = [{
    id: '01',
    userName: 'admin',
    webgrade: '90'
  },
  {
    id: '02',
    userName: "pigff",
    webgrade: '80'
  },
  {
    id: '03',
    userName: 'smg',
    webgrade: '85'
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

app.get('/users/:id', function (req, resp) {
  console.log(req.params);
  const id = req.params.id;
  let founded = false;
  for (let user of USERS) {
    if (user.id === id) {
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
    if (user.id === req.body.id) {
      user.userName = req.body.userName;
      user.webgrade = req.body.webgrade;
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
app.delete('/user/:id', function (req, resp) {
  let founded = false;
  let index = 0;
  for (const user of USERS) {
    if (user.id === req.params.id) {
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


// web服务器监听8080端口
app.listen(8080, function () {
  console.log('服务器在8080端口启动！');
});


function getUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "http://127.0.0.1:8080/users", true);
  xhttp.send();
}

function addUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "http://127.0.0.1:8080/user/", true);
  const user = {
    id: document.getElementById('id').value,
    userName: document.getElementById('userName').value,
    webgrade: document.getElementById('webgrade').value
  }
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(user));
}
