import { Component } from '@angular/core';

@Component({
    selector: 'dyn-domain-choice',
    template: `
    <div class="domain__choice">

        <section class="section">
            <div class="domain__container">
                <div class="brand">
                    <div class="section__img"></div>
                    <h1>Dynki</h1>
                </div>
            </div>
            <div class="main">
                <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting,actionEdit,actionEllipsis]">
                    <nz-card-meta nzTitle="Card title" nzDescription="This is the description" [nzAvatar]="avatarTemplate"></nz-card-meta>
                </nz-card>
                <ng-template #avatarTemplate>
                    <nz-avatar nzSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
                </ng-template>
                <ng-template #coverTemplate>
                    <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
                </ng-template>
                <ng-template #actionSetting>
                    <i nz-icon type="setting"></i>
                </ng-template>
                <ng-template #actionEdit>
                    <i nz-icon type="edit"></i>
                </ng-template>
                <ng-template #actionEllipsis>
                    <i nz-icon type="ellipsis"></i>
                </ng-template>
            </div>
        </section>
    </div>`
})
export class DomainChoiceComponent {

    constructor() { }
}
