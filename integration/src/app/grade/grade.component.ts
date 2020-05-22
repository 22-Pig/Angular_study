import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stu } from './Stu';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  stuForm: FormGroup;
  id: AbstractControl;
  stuName: AbstractControl;
  webgrade: AbstractControl;
  stus$: Observable<Stu>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: Stu;

  constructor(private fb: FormBuilder, private httpclient: HttpClient) {
    this.stuForm = this.fb.group({
      'id': [''],
      'stuName': [''],
      'webgrade': ['']
    });

    this.id = this.stuForm.controls['id'];
    this.stuName = this.stuForm.controls['stuName'];
    this.webgrade = this.stuForm.controls['webgrade'];
  }

  // 页面初始化
  ngOnInit(): void {
    this.stus$ = <Observable<Stu>>this.httpclient.get(this.baseUrl + 'stus');
  }

  search() {
    if (this.id.value) {
      this.stus$ = <Observable<Stu>>this.httpclient.get(this.baseUrl + 'stus/' + this.id.value);
    } else {
      this.stus$ = <Observable<Stu>>this.httpclient.get(this.baseUrl + 'stus');
    }
  }

  add() {
    if (!this.id.value) {
      alert('学号为空，不能添加!');
      return 0;
    } else {
      // 对于可观察对象执行，我们需要订阅其结果
      this.httpclient.post(this.baseUrl + 'stu', this.stuForm.value).subscribe(
        (val: any) => {
          if (val.succ) { // val是服务器返回的值
            alert('添加成功!');
          }
        }
      );
    }

  }

  select(u: Stu) {
    this.currentUser = u;
    this.stuForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpclient.delete(this.baseUrl + 'stu/' + this.currentUser.id).subscribe(
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
      this.httpclient.put(this.baseUrl + 'stu', this.stuForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }
  }
}
