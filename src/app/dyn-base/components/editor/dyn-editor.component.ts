import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Quill from 'quill';

@Component({
    selector: 'dyn-editor, [dyn-editor]',
    template: `
    <div id="editor"></div>
    `
})
export class DynEditorComponent implements AfterViewInit {

    @ViewChild('editor') editor: ElementRef;

    constructor() {
    }

    ngAfterViewInit() {
        // We can now initialize Quill with something like this:
        const quill = new Quill(this.editor.nativeElement.querySelector('editor'), {});
    }
}
