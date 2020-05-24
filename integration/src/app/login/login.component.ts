import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { myService } from '../service';
import { query } from '@angular/animations';
import { stringify } from 'querystring';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //对应登录的表单
  myForm: FormGroup;
  //对应输入用户名的输入框
  userName: AbstractControl;
  //对应密码的输入框
  password: AbstractControl;

  name$: Observable<string>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;
  users$: Observable<User>;
  msg: string;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private httpclient: HttpClient, public service: myService) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      //可以在此实现自己的业务逻辑
      // console.log(val);
      this.msg = val;
      console.log(this.msg);
    });
  }

  sendValue() {
    this.service.data = {
      name: this.userName

    }
    this.router.navigate(['management'], name),
      console.log(name);
  }

  onSubmit(value: any) {
    // if (this.myForm.invalid) {
    //   alert('表单无效！');
    //   return;
    // }
    // if (this.myForm.valid) {
    //   alert('表单填写成功！');
    //   return;
    // }
    console.log(value);
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users');
    // this.myStore.list.push(213);
    console.log(this.msg);
  }

  login() {
    if (this.myForm.valid) {
      this.httpclient.post(this.baseUrl + 'users', this.myForm.value).subscribe((val: any) => {
        console.log(val);
        if (val.succ == true) {
          this.authService.login();
          this.router.navigate(['/management'], { queryParams: { user: this.msg } });
        } else if ((val.succ == false)) {
          alert('用户名或密码错误！');
        }
      });
    }
  }
}
