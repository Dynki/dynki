import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynCellHost]',
})
export class DynCellDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
