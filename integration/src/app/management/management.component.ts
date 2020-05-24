import { Component, OnInit } from '@angular/core';
import { myService } from '../service';
import { ActivatedRoute, Params } from '@angular/router'
// import { setTheme } from 'ngx-bootstrap/utils';
// import { DataServerService } from '../service';
// import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  msg: string;
  constructor(public service: myService, private route: ActivatedRoute) {
    // setTheme('bs4');
    // val =this. msg;
    // this.route.queryParams.subscribe(params => {

    //   this.queryParams = params['name']

    //   console.log(this.queryParams)

    // })
    const name = this.route.snapshot.queryParams['name'];
    // 2. queryParams的订阅
    this.route.queryParams.subscribe((params: Params) => {
      const name = params['name'];
      console.log('name==>', name);
    });
    this.msg = name;
  }

  ngOnInit(): void {
    // this.dss.ob.subscribe(msg => {
    //   console.log(msg);
    // });
  }

}
// this.service.data.name;
// this.service.data.name;
