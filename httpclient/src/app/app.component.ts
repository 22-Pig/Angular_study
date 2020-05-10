import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;

  constructor(private fb: FormBuilder, private httpclient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'userName': [''],
      'password': ['']
    });

    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }
  // 页面初始化
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users');
  }

  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users/' + this.id.value);
    } else {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users');
    }
  }

  add() {
    // console.log(this.myForm.value); // 通过在html表单中的input设置name属性的值，与服务器接收对象的属性值一致，这样表单的value属性就是一个接受对象
    // 对于可观察对象执行，我们需要订阅其结果
    this.httpclient.post(this.baseUrl + 'user', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) { // val是服务器返回的值
          alert('添加成功!');
        }
      }
    );
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpclient.delete(this.baseUrl + 'user/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpclient.put(this.baseUrl + 'user', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }
  }
}
