import { Component } from '@angular/core';

@Component({
    selector: 'dyn-join-domain',
    template: `
    <form class="login" nz-form [formGroup]="validateForm" (ngSubmit)="submit()" name="loginForm">
      <h1 class="login__heading">Pick a Side</h1>
      <nz-form-item>
        <nz-form-control>
          <nz-input-group nzPrefixIcon="anticon anticon-team" nzSize="large" class="domain__textbox">
            <input type="text" nz-input formControlName="domainname" nzRequired placeholder="Domain Name" id="username">
          </nz-input-group>
          <nz-form-explain
            *ngIf="validateForm.get('domainname').dirty && validateForm.get('domainname').errors">Please input !
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" [nzLoading]="(pending$ | async)" type="submit">
              Sign In<i nz-icon type="enter" theme="outline"></i>
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>`
})
export class JoinDomainComponent {

  constructor() { }
}
