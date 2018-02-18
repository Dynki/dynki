// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

// import { CognitoUtil, UserLoginService, UserRegistrationService } from '../services/dyn-cognito.service';
// import { Authenticate, User } from '../store/models/user';
// import { Registration } from '../store/models/register';

// import { Store, select } from '@ngrx/store';

// import * as fromAuth from '../store/reducers';
// import * as Auth from '../store/actions/auth';

// declare var AWS;

// @Injectable()
// export class AuthService {
//   constructor(
//     public awsAuth: UserLoginService,
//     public awsUtil: CognitoUtil,
//     public awsRegistration: UserRegistrationService,
//     private store: Store<fromAuth.State>
//    ) {
//   }

//   private getUserDetails(): User {
//     return { name: this.awsAuth.currentUserEmail };
//   }

//   getUserId(): string {
//     return this.awsUtil.getCognitoIdentity();
//   }

//   login({ username, password }: Authenticate) {
//     return Observable.fromPromise(this.awsAuth.login(username, password));
//   }

//   logout() {
//     return Observable.fromPromise(this.awsAuth.logout());
//   }

//   signUp({ username, password }: Registration) {
//     return Observable.fromPromise(this.awsRegistration.register(username, password))
//   }

//   confirmCode(username: string, code: string) {
//     return Observable.fromPromise(this.awsRegistration.confirmRegistration(username, code));
//   }

//   // getAuthenticated(): BehaviorSubject<boolean> {
//   //   return this.isLoggedIn;
//   // }

//   forgotPassword(email: string): void {
//   }

// }
