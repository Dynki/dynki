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
            <div class="u-content__left">
                <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
                    <nz-form-item>
                        <nz-form-label [nzSm]="7" [nzXs]="24" nzFor="email">Username</nz-form-label>
                        <nz-form-control [nzSm]="14" [nzXs]="24">
                            <input readonly nz-input formControlName="username" id="username">
                        </nz-form-control>
                    </nz-form-item>
                    <nz-form-item class="display-name">
                        <nz-form-label [nzSm]="7" [nzXs]="24" nzFor="displayName">Display Name</nz-form-label>
                        <nz-form-control [nzSm]="14" [nzXs]="24" class="new-name">
                            <input nz-input formControlName="displayName" placeholder="Display name goes here" id="displayName">
                        </nz-form-control>
                        <button nz-button nzType="primary">Apply</button>
                    </nz-form-item>
                </form>
                <button nz-button nzType="default" (click)="changePassword()">Change Password</button>
            </div>
            <img src="./assets/img/santa.PNG">
        </nz-card>
        <nz-modal
            [nzFooter]="modalFooter"
            [(nzVisible)]="isVisible"
            nzTitle="Change Password"
            (nzOnCancel)="handleCancel()"
            (nzOnOk)="handleOk()"
            [nzOkLoading]="isOkLoading">
            <div class="password">
                <div class="left">
                    <div>Passwords must contain</div>
                    <div class="checklist">
                        <i nz-icon type="close" theme="outline"></i>
                        <div>At least 6 characters</div>
                    </div>
                    <div class="checklist">
                        <i nz-icon type="close" theme="outline"></i>
                        <div>At least 1 upper case letter (A..Z)</div>
                    </div>
                    <div class="checklist">
                        <i nz-icon type="close" theme="outline"></i>
                        <div>At least 1 lower case letter (a..z)</div>
                    </div>
                    <div class="checklist">
                        <i nz-icon type="close" theme="outline"></i>
                        <div>At least 1 number (0..9)</div>
                    </div>
                </div>
                <div class="right">
                </div>
            </div>
            <ng-template #modalFooter>
                <span>Modal Footer: </span>
                <button nz-button nzType="default" (click)="handleCancel()">Custom Callback</button>
                <button nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button>
            </ng-template>
        </nz-modal>
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
    isVisible = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.isVisible = false;

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

    changePassword() {
        this.isVisible = true;
    }

    handleCancel(): void {
        // this.isVisible = false;
    }
}
