import {
    Directive,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { Sortable } from '@shopify/draggable';

@Directive({
    selector: '[dynSortable]'
})
export class SortableDirective implements AfterViewInit {
    @Input()
    data: any[];

    @Input()
    selector: string;

    @Output()
    stop = new EventEmitter();

    sortable: Sortable;

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        this.sortable = new Sortable(this.el.nativeElement, {
            draggable: this.selector
        });

        this.sortable.on('sortable:stop', e => this.handleStop(e));
    }

    handleStop(e) {
        console.log('GOT HERE::', e);
        const { newIndex, oldIndex } = e;
        const next = this.data;
        const moved = next.splice(oldIndex, 1);
        next.splice(newIndex, 0, moved[0]);

        this.stop.emit(next);
    }
}
