import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShellState } from 'app/dyn-shell/store/shell.state';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import * as shellActions from '../../store/shell.actions';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dyn-new-domain',
  template: `
    <form *ngIf="domain$ | async as domain" class="new_domain__form"
      nz-form [formGroup]="domainForm" (ngSubmit)="submit()" name="domainForm">
      <h1 class="registration__heading">Name your team</h1>
      <h4>Give your team a name they can be proud of</h4>
      <nz-form-item class="new_domain__form-item new_domain__form-input">
        <nz-form-control [nzValidateStatus]="domain.validationStatus" nzHasFeedback class="domain__ctrl">
          <nz-input-group nzPrefixIcon="anticon anticon-team" nzSize="large">
            <input #domainName type="text" (input)="checkDomain(domainName.value)" autocomplete="off"
              nz-input formControlName="domain" nzRequired placeholder="Enter your team name" id="domain">
          </nz-input-group>
          <nz-form-explain
            *ngIf="domainForm.get('domain').dirty && domainForm.get('domain').hasError('required')">We're gonna need a team name!
          </nz-form-explain>
          <nz-form-explain
            *ngIf="domainForm.get('domain').dirty && domainForm.get('domain').hasError('minlength')">Too short try a longer name!
          </nz-form-explain>
          <nz-form-explain
            *ngIf="domainForm.get('domain').dirty && domainForm.get('domain').hasError('maxlength')">Too long, too long!
          </nz-form-explain>
          <nz-form-explain
            *ngIf="domainForm.get('domain').dirty && domainForm.get('domain').hasError('pattern')">Sorry no wacky characters allowed!
          </nz-form-explain>
          <nz-form-explain
            *ngIf="domain.domainChecked && domain.domainExists && domainForm.valid">Aww team name already exists!
          </nz-form-explain>
          <nz-form-explain *ngIf="domain.domainChecked && !domain.domainExists && domainForm.valid">Team name is good!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item class="new_domain__form-item">
        <nz-form-control>
          <button
            [disabled]="tmpDisableBtn || !domain.domainChecked || domain.domainExists"
            class="domain__btn" nz-button [nzSize]="'Large'" nzType="dashed" [nzLoading]="domain.pending" type="submit">
              Create Team<i nz-icon type="arrow-right" theme="outline"></i>
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
    `
})
export class NewDomainComponent implements OnInit {
  private subject: Subject<string> = new Subject();
  domainForm: FormGroup;
  tmpDisableBtn = false;

  @Select(ShellState.domain)
  domain$: Observable<object>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
    this.domainForm = this.fb.group({
      domain: [null, [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(4),
      Validators.pattern('^[0-9a-zA-Z \b]+$')]]
    });

    this.subject.pipe(
      debounceTime(500)
    ).subscribe(domainName => {
      this.tmpDisableBtn = false;
      this.store.dispatch(new shellActions.CheckDomainName(domainName));
    });
  }

  submit() {
    this.store.dispatch(new shellActions.CreateDomain(this.domainForm.value.domain));
  }

  checkDomain(domainNameValue) {
    this.tmpDisableBtn = true;
    this.subject.next(domainNameValue);
  }
}
