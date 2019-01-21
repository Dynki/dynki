import {
    ComponentFactory,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    Renderer2,
    ViewContainerRef
} from '@angular/core';

import { NzPopconfirmDirective, InputBoolean } from 'ng-zorro-antd';
import { DynSelectComponent } from './dyn-select.component';

@Directive({
    selector: '[dynSelect]',
    // tslint:disable-next-line
    host: {
        '[class.ant-popover-open]': 'isTooltipOpen'
    }
})
export class DynSelectDirective extends NzPopconfirmDirective implements OnInit {
    factory: ComponentFactory<DynSelectComponent> = this.resolver.resolveComponentFactory(DynSelectComponent);

    protected needProxyProperties = [
        'nzTitle',
        'nzContent',
        'nzOverlayClassName',
        'nzOverlayStyle',
        'nzMouseEnterDelay',
        'nzMouseLeaveDelay',
        'nzVisible',
        'nzTrigger',
        'nzPlacement',
        'nzOkText',
        'nzOkType',
        'nzCancelText',
        'nzCondition',
        'row',
        'column',
        'formGroup'
    ];

    @Input() nzOkText: string;
    @Input() nzOkType: string;
    @Input() nzCancelText: string;
    @Input() row: any;
    @Input() column: any;
    @Input() @InputBoolean() nzCondition: boolean;
    @Output() readonly nzOnCancel = new EventEmitter<void>();
    @Output() readonly nzOnConfirm = new EventEmitter<void>();

    constructor(
        elementRef: ElementRef,
        hostView: ViewContainerRef,
        resolver: ComponentFactoryResolver,
        renderer: Renderer2,
        @Optional() tooltip: DynSelectComponent
    ) {
        super(elementRef, hostView, resolver, renderer, tooltip);
    }

    ngOnInit(): void {
        if (!this.tooltip) {
            const tooltipComponent = this.hostView.createComponent(this.factory);
            this.tooltip = tooltipComponent.instance;
            // Remove element when use directive https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), tooltipComponent.location.nativeElement);
            this.isDynamicTooltip = true;
            this.needProxyProperties.forEach(property => this.updateCompValue(property, this[property]));
            const cancel_ = (this.tooltip as DynSelectComponent).nzOnCancel.subscribe(() => {
                this.nzOnCancel.emit();
            });
            const confirm_ = (this.tooltip as DynSelectComponent).nzOnConfirm.subscribe(() => {
                this.nzOnConfirm.emit();
            });
        }
        this.tooltip.setOverlayOrigin(this);
    }

}
