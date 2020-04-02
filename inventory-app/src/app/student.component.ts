import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'student',
    inputs: ['name'],
    outputs: ['studentSelected'],
    template: `
    <p (click)="onClicked()">{{name}}</p>
    `
})

export class Student {
    name: string;
    studentSelected: EventEmitter<string>;

    constructor() {
        this.studentSelected = new EventEmitter();
    }

    onClicked() {
        this.studentSelected.emit(this.name);
    }
}