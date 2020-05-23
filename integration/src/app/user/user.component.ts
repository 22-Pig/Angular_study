import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;
  modalRef: BsModalRef;
  name$: Observable<string>;

  constructor(private fb: FormBuilder, private httpclient: HttpClient, private modalService: BsModalService) {
    this.userForm = this.fb.group({
      'userName': ['', Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.userName = this.userForm.controls['userName'];
    this.password = this.userForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      //可以在此实现自己的业务逻辑
      console.log(val);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users');
  }

  search() {
    if (this.userName.value) {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users/' + this.userName.value);
    } else {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users');
    }
  }

  searchall() {
    if (this.userName.value) {
      this.users$ = <Observable<User>>this.httpclient.get(this.baseUrl + 'users');
    }
  }


  add() {
    if (!this.userName.value) {
      alert('用户名为空，不能添加!');
      return 0;
    } else {
      // 对于可观察对象执行，我们需要订阅其结果
      this.httpclient.post(this.baseUrl + 'user', this.userForm.value).subscribe(
        (val: any) => {
          if (val.succ) { // val是服务器返回的值
            alert('添加成功!');
            this.searchall();
          }
        }
      );
    }
  }

  select(u: User) {
    this.currentUser = u;
    this.userForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpclient.delete(this.baseUrl + 'user/' + this.currentUser.userName).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
            this.searchall();
          }
        }
      )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpclient.put(this.baseUrl + 'user', this.userForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
            this.searchall();
          }
        }
      )
    }
  }
}
