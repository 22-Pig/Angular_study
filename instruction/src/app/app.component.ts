import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'instruction';

  shouldShow = false;

  score = 70;

  color: string;
  fontSize: string;

  isBoredered = true;

  classObj = {
    bordered: this.isBoredered,
    blue: false,
    round: true
  }

  cities = ['杭州', '南京', '上海', '无锡'];
  people = [];

  peopleByCity = [];

  constructor() {
    this.people = [
      { name: 'Anderson', age: 35, city: 'Sao Paulo' },
      { name: 'John', age: 12, city: 'Miami' },
      { name: 'Peter', age: 22, city: 'New York' }
    ];

    this.peopleByCity = [
      {
        city: 'Miami',
        people: [
          { name: 'John', age: 12 },
          { name: 'Angel', age: 22 }
        ]
      },
      {
        city: 'Sao Paulo',
        people: [
          { name: 'Anderson', age: 35 },
          { name: 'Felipe', age: 36 }
        ]
      }
    ];
  }
  onToggle() {
    this.shouldShow = !this.shouldShow;
    return false;
  }

  grade() {
    return Math.floor(this.score / 10);
  }

  onInput(evt: Event) {
    const inputEle = <HTMLInputElement>evt.target;
    this.score = Number(inputEle.value);
  }

  apply(color: string, fontSzie: string) {
    this.color = color;
    this.fontSize = fontSzie;
  }

  toggleBorder() {
    this.isBoredered = !this.isBoredered;
  }
}
