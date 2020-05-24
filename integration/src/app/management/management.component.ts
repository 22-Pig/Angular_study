import { Component, OnInit } from '@angular/core';
import { myService } from '../service';
// import { setTheme } from 'ngx-bootstrap/utils';
// import { DataServerService } from '../service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(public service: myService) {
    // setTheme('bs4');
  }

  ngOnInit(): void {
    // this.dss.ob.subscribe(msg => {
    //   console.log(msg);
    // });
  }

}
// this.service.data.name;
// this.service.data.name;
