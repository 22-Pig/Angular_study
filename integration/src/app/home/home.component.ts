import { Component, OnInit } from '@angular/core';
import { MENUS, PRODUCTS, SKIPS, } from './data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menus = MENUS;
  products = PRODUCTS;
  skips = SKIPS;

  constructor() { }

  ngOnInit(): void {
  }

}
