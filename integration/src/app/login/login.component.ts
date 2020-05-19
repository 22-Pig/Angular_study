import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
    var xmlHttp = null;

    const frm = {
      iptUserName: null,
      iptPassword: null,
      pUserNameErr: null,
      pPasswordErr: null,
      pFrmErr: null
    };


    /*
        用于ajax接收服务器应答
    */
    function onResponse() {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          const resp = xmlHttp.responseText;
          console.log(resp);
          const obj = JSON.parse(resp);
          if (obj.success) {
            console.log('登录成功');
            //第一个page的class加上hide
            //第二个page的class去掉hide
            const pages = document.getElementsByClassName('page');
            pages[0].className = 'page login-page hide';
            pages[1].className = 'page';
            // window.location.href = "www.baidu.com";
          } else {
            // frm.pFrmErr.innerText = '错误的用户名或者密码';
            alert('错误的用户名或者密码!');
          }
        } else {
          // frm.pFrmErr.innerText = '服务器无响应';
          alert('服务器无响应');
        }

      }

    }

    /*
        用于ajax发送消息给服务器
    */
    function sendLogin(name, password) {
      //服务器接收POST消息
      //参数名字叫做name和passw
      //链接地址http://127.0.0.1:8080/user
      // xmlHttp.onreadystatechange = onResponse;
      xmlHttp.open('POST', 'http://127.0.0.1:8080/user', true);
      xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlHttp.send('name=' + name + '&password=' + password);
    }
    function onLogin() {
      frm.pUserNameErr.innerText = '';
      frm.pPasswordErr.innerText = '';
      frm.pFrmErr.innerText = '';
      //const userName = document.getElementById('userName');
      const userName = frm.iptUserName.value;
      let fmt = true;
      console.log(userName);
      if (userName.trim().length <= 0) {
        frm.pUserNameErr.innerText = '用户名不能为空';
        fmt = false;
      } else if (userName.trim().length < 3) {
        frm.pUserNameErr.innerText = '用户名长度不能小于3';
        fmt = false;
      }

      const password = frm.iptPassword.value;
      if (password.trim().length <= 0) {
        frm.pPasswordErr.innerText = '密码不能为空';
        fmt = false;
      } else if (password.trim().length < 6) {
        frm.pPasswordErr.innerText = '密码长度不能小于6';
        fmt = false;
      }

      if (!fmt) {
        return;
      } else {
        sendLogin(userName.trim(), password.trim());
        /*if (userName === 'admin' && password === '123456') {
            window.location.href = './ex03_2.html';
        } else {
            frm.pFrmErr.innerText = '用户名或者密码错误';
        }*/
      }
    }

    function onFocusOrInput(evt) {
      //evt是一个事件 evt.target表示哪个html标记触发该事件
      const obj = evt.target;
      frm.pFrmErr.innerText = '';
      if (obj === frm.iptUserName) {
        frm.pUserNameErr.innerText = '';
        const userName = frm.iptUserName.value;

        console.log(userName);
        if (userName.trim().length <= 0) {
          frm.pUserNameErr.innerText = '用户名不能为空';
          obj.className = 'form-control ipt-error';
        } else if (userName.trim().length < 3) {
          frm.pUserNameErr.innerText = '用户名长度不能小于3';
          obj.className = 'form-control ipt-error';
        } else {
          obj.className = 'form-control';
        }
      }
    }

    function onFocusOrInput1(evt) {
      const obj = evt.target;
      frm.pFrmErr.innerText = '';
      if (obj === frm.iptPassword) {
        frm.pPasswordErr.innerText = '';
        const password = frm.iptPassword.value;
        if (password.trim().length <= 0) {
          frm.pPasswordErr.innerText = '密码不能为空';
          obj.className = 'form-control ipt-error';
        } else if (password.trim().length < 6) {
          frm.pPasswordErr.innerText = '密码长度不能小于6';
          obj.className = 'form-control ipt-error';
        } else {
          obj.className = 'form-control';
        }
      }
    }


    window.onload = function () {
      const btnLogin = document.getElementById('btnLogin');
      btnLogin.addEventListener('click', function (evt) {
        onLogin();
        evt.returnValue = false;
      });

      frm.iptUserName = document.getElementById('userName');
      frm.iptUserName.addEventListener('focus', function (evt) {
        onFocusOrInput(evt);
      });

      frm.iptUserName.addEventListener('input', function (evt) {
        onFocusOrInput(evt);
      });
      frm.iptPassword = document.getElementById('password');
      frm.iptPassword.addEventListener('focus', function (evt) {
        onFocusOrInput1(evt);
      });
      frm.iptPassword.addEventListener('input', function (evt) {
        onFocusOrInput1(evt);
      });
      frm.pUserNameErr = document.getElementById('userNameErr');
      frm.pPasswordErr = document.getElementById('passwordErr');
      frm.pFrmErr = document.getElementById('frmErr');

      xmlHttp = new XMLHttpRequest();
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }


}
