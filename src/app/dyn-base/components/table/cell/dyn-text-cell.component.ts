import { Component, Input } from '@angular/core';

@Component({
  selector: 'dyn-text-cell',
  template: `
    <input tabindex="0" (blur)="dispatchAction(event)" (keyDown.enter)="enterPressed(event)" [formControlName]="column.model" #cell>
    `
})
export class DynTextCellComponent {
    @Input() column: any;
}
