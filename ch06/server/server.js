"use strict";
const express = require('express'); // 引入express模块
const app = express(); // 调用方法生成应用

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded()); //json方式发送参数
app.use(bodyParser.json());

var USERS = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: "pigff", password: '456789' }
];

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X - Requested - With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

// 响应GET方法
// URL（也叫作路由）
// 回调函数，表示收到请求后，如何处理并应答
app.get('/hello', function (req, resp) {
    resp.send('哈哈哈');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

// 添加用户
// app.post('/user/:id/:userName/:password', function (req, resp) { //参数化路由发送参数
app.post('/user', function (req, resp) {

    //json
    // console.log(req.params);
    // console.log(req.body);
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

// 修改用户
app.put('/user', function (req, resp) {
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

// 删除用户
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.slice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到需要删除的用户!' });
    }
    resp.end();
});


// web服务器监听8080端口
app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});