import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-board-detail',
  templateUrl: './dyn-board-detail.component.html'
})
export class DynBoardDetailComponent {

    @Input() board;

    constructor() { }
}
