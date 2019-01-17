import { ChangeDetectorRef, Component } from '@angular/core';
import { NzPopconfirmComponent } from 'ng-zorro-antd';

@Component({
  selector           : 'dyn-select',
  templateUrl        : './dyn-select.component.html'
})
export class DynSelectComponent extends NzPopconfirmComponent {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
