import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'firebase';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'dyn-userprofile, [dyn-userprofile]',
    template: `
    <div class="profile">
        <nz-card class="u-header1">
            <h1 class="u-heading">Profile</h1>
            <div class="avatar">{{userInitial}}</div>
            <div class="u-heading">{{alias}}</div>
        </nz-card>
        <nz-card class="u-header2">
            <h4 class="nag">We never stop the nagging!, we would really really like you to enter a display name... pretty please</h4>
            <nz-steps [nzCurrent]="current" nzSize="small">
                <nz-step nzTitle="Created"></nz-step>
                <nz-step nzTitle="Email Verified"></nz-step>
                <nz-step nzTitle="Enter Display Name"></nz-step>
            </nz-steps>
            <nz-divider></nz-divider>
            <section class="input-area">
                <input class="new-name" nz-input placeholder="Display name goes here" [(ngModel)]="newName">
                <button nz-button nzType="default">Apply</button>
            </section>
        </nz-card>
        <nz-card class="u-content">
        <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
            <nz-form-item>
                <nz-form-label [nzSm]="7" [nzXs]="24" nzFor="email">Username</nz-form-label>
                <nz-form-control [nzSm]="14" [nzXs]="24">
                    <input readonly nz-input formControlName="username" id="username">
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label [nzSm]="7" [nzXs]="24" nzFor="displayName">Display Name</nz-form-label>
                <nz-form-control [nzSm]="14" [nzXs]="24">
                    <input nz-input formControlName="displayName" id="displayName">
                </nz-form-control>
            </nz-form-item>
        </form>
        </nz-card>
    </div>
    `
})
export class DynUserProfileComponent implements OnInit {

    @Input() user: UserInfo;
    validateForm: FormGroup;
    userInitial: string;
    current;
    newName: string;
    alias: string;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            displayName      : [ null, [ Validators.required ] ],
            username         : [ null, [ Validators.email, Validators.required ] ],
            password         : [ null, [ Validators.required ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ]
        });

        this.alias = this.user.displayName ? this.user.displayName : this.user.email;
        this.current = !this.user.displayName ? 2 : 3;
        this.userInitial = this.user.displayName ? this.user.displayName[0].toLocaleUpperCase() : this.user.email[0].toLocaleUpperCase();

        this.validateForm.patchValue({
            displayName: this.user.displayName,
            username: this.user.email
        })
    }

    confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
        if (!control.value) {
          return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
          return { confirm: true, error: true };
        }
      };
}
