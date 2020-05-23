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

var STUS = [{
    id: '01',
    stuName: 'admin',
    webgrade: '90'
  },
  {
    id: '02',
    stuName: "pigff",
    webgrade: '80'
  },
  {
    id: '03',
    stuName: 'smg',
    webgrade: '85'
  }
];

//跨域处理
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X - Requested - With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

// 登录用户验证
app.post('/users', function (req, resp) {
  for (let user of USERS) {
    if (user.userName === req.body.userName && user.password === req.body.password) {
      resp.send({
        succ: true
      });
      return;
    }
  }
  resp.send({
    succ: false
  });
  resp.end();
});


// 用户管理部分

// 查询所有用户
app.get('/users', function (req, resp) {
  resp.send(USERS);
  resp.end();
});

// 查询单个用户
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
    userName: document.getElementById('userName').value,
    password: document.getElementById('password').value
  }
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(user));
}



// 学生成绩管理部分

// 查询所有学生
app.get('/stus', function (req, resp) {
  resp.send(STUS);
  resp.end();
});

// 查询单个学生
app.get('/stus/:id', function (req, resp) {
  console.log(req.params);
  const id = req.params.id;
  let founded = false;
  for (let stu of STUS) {
    if (stu.id === id) {
      resp.send([stu]);
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
      msg: '没有找到学生!'
    });
  }

  resp.end();
});

// 添加学生
app.post('/stu', function (req, resp) {
  STUS.push(req.body);
  resp.send({
    succ: true
  });
  resp.end();
});

// 修改学生
app.put('/stu', function (req, resp) {
  //json
  let founded = false;
  for (let stu of STUS) {
    if (stu.id === req.body.id) {
      stu.stuName = req.body.stuName;
      stu.webgrade = req.body.webgrade;
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
      msg: '没有找到学生!'
    });
  }
  resp.end();
});

// 删除学生
app.delete('/stu/:id', function (req, resp) {
  let founded = false;
  let index = 0;
  for (const stu of STUS) {
    if (stu.id === req.params.id) {
      STUS.splice(index, 1);
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
      msg: '没有找到需要删除的学生!'
    });
  }
  resp.end();
});

function getStus() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "http://127.0.0.1:8080/stus", true);
  xhttp.send();
}

function addStus() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "http://127.0.0.1:8080/stu/", true);
  const stu = {
    id: document.getElementById('id').value,
    stuName: document.getElementById('stuName').value,
    webgrade: document.getElementById('webgrade').value
  }
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(stu));
}

// web服务器监听8080端口
app.listen(8080, function () {
  console.log('服务器在8080端口启动！');
});
