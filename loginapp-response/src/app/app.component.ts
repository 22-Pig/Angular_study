import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //对应登录的表单
  myForm: FormGroup;
  //对应输入用户名的输入框
  userName: AbstractControl;
  //对应密码的输入框
  password: AbstractControl;

  name$: Observable<string>;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        'userName': ['smg', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      //可以在此实现自己的业务逻辑
      console.log(val);
    });
  }
  onSubmit(value: any) {
    console.log(value);
  }
}
