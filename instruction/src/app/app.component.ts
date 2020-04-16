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
}
