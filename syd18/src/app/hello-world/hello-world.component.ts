import { Component, OnInit } from '@angular/core'; //引入包

@Component({ //是一个注解，表示下面的类是一个组件
  selector: 'app-hello-world', //选择器，将来用在其他的模板文件中，显示该组件
  templateUrl: './hello-world.component.html', //该组件显示的内容
  styleUrls: ['./hello-world.component.css'] //该组件美化的样式
})
export class HelloWorldComponent implements OnInit { //定义一个ts的类

  constructor() { }

  ngOnInit(): void {
  }

}
