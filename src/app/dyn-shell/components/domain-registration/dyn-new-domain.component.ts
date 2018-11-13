import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'dyn-new-domain',
    template: `
    <form class="new_domain__form" nz-form [formGroup]="domainForm" (ngSubmit)="submit()" name="domainForm">
      <h1 class="registration__heading">Name your domain</h1>
      <nz-form-item class="new_domain__form-item new_domain__form-input">
        <nz-form-control>
          <nz-input-group [nzSuffix]="suffixTemplate" nzPrefixIcon="anticon anticon-team" nzSize="large">
            <input type="text" nz-input formControlName="domain" nzRequired placeholder="Enter your domain name" id="domain">
          </nz-input-group>
          <ng-template #suffixTemplate><i nz-icon *ngIf="checkingDomain" type="loading"></i></ng-template>
          <nz-form-explain
            *ngIf="domainExists">Domain name already exists!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="new_domain__form-item">
        <nz-form-control>
          <button disabled class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" [nzLoading]="(pending$ | async)" type="submit">
              Create Domain<i nz-icon type="arrow-right" theme="outline"></i>
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
    `
})
export class NewDomainComponent implements OnInit {
  domainForm: FormGroup;
  checkingDomain: false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.domainForm = this.fb.group({
      domain: ''
    });
  }
}
