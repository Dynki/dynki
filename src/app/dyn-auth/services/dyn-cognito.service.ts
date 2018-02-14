import { Injectable, Inject } from '@angular/core';

// import {RegistrationUser} from "../../dyn-registration/dyn-registration.component";
import { environment } from '../../../environments/environment';
// import {NewPasswordUser} from "../../dyn-newpassword/dyn-newpassword.component";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { observeOn } from 'rxjs/operator/observeOn';
import { User } from '../store/models/user';
/**
 * Created by Dean Selvey
 */


declare var AWSCognito: any;
declare var AWS: any;

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
    callback(): void;
    callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoUtil {

    public static _REGION = environment.region;
    public static _IDENTITY_POOL_ID = environment.identityPoolId;
    public static _USER_POOL_ID = environment.userPoolId;
    public static _CLIENT_ID = environment.clientId;

    public static _POOL_DATA = {
        UserPoolId: CognitoUtil._USER_POOL_ID,
        ClientId: CognitoUtil._CLIENT_ID
    };

    public static getAwsCognito(): any {
        return AWSCognito
    }

    getUserPool() {
        return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(CognitoUtil._POOL_DATA);
    }

    getCurrentUser() {
        return this.getUserPool().getCurrentUser();
    }


    getCognitoIdentity(): string {
        const cognitoUser = this.getCurrentUser();

        if (cognitoUser != null && AWS.config.credentials.identityId === undefined) {
            cognitoUser.getSession(function (err, session) {

                if (err) {
                    console.log(err);
                    return;
                }
                console.log('session.validity:' + session.isValid());

                const propName = 'cognito-idp.' + CognitoUtil._REGION + '.amazonaws.com/' + CognitoUtil._USER_POOL_ID;

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : CognitoUtil._IDENTITY_POOL_ID, // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        [propName] : session.getIdToken().getJwtToken()
                    }
                });

                return AWS.config.credentials.identityId;
            });
        } else {
            return AWS.config.credentials.identityId;
        }
    }

    getAccessToken(callback: Callback): void {
        if (callback == null) {
            throw new Error('CognitoUtil: callback in getAccessToken is null...returning');
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoUtil: Cannot set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        } else {
            callback.callbackWithParam(null);
        }
    }

    getIdToken(callback: Callback): void {
        if (callback == null) {
            throw new Error('CognitoUtil: callback in getIdToken is null...returning');
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoUtil: Cannot set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    } else {
                        console.log('CognitoUtil: Got the id token, but the session is not valid');
                    }
                }
            });

        } else {
            callback.callbackWithParam(null);
        }
    }

    getRefreshToken(callback: Callback): void {
        if (callback == null) {
            throw new Error('CognitoUtil: callback in getRefreshToken is null...returning');
        }
        if (this.getCurrentUser() != null) {
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log('CognitoUtil: Cannot set the credentials:' + err);
                    callback.callbackWithParam(null);
                } else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });
        } else {
            callback.callbackWithParam(null);
        }
    }

    refresh(): void {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log('CognitoUtil: Cannot set the credentials:' + err);
            } else {
                if (session.isValid()) {
                    console.log('CognitoUtil: refreshed successfully');
                } else {
                    console.log('CognitoUtil: refreshed but session is still not valid');
                }
            }
        });
    }
}

@Injectable()
export class UserRegistrationService {

    constructor( @Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {
        AWS.config.region = environment.region;
    }

    register(username: String, password: String): Promise<User> {

        return new Promise((resolve, reject) => {
            console.log('UserRegistrationService: user is ' + username);

            const attributeList = [];
            const dataEmail = { Name: 'email', Value: username };
            const dataNickname = { Name: 'nickname', Value: username };

            attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
            attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataNickname));

            this.cognitoUtil.getUserPool().signUp(username, password, attributeList, null, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    console.log('UserRegistrationService: registered user is ' + result);
                    resolve(result);
                }
            });
        });
    }

    confirmRegistration(username: string, confirmationCode: string) {

        return new Promise((resolve, reject) => {
            const userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
                if (err) {
                    reject({ message: err.message, res: null });
                } else {
                    resolve({ message: null, res: result });
                }
            });

        })

    }

    resendCode(username: string) {

        return new Promise((resolve, reject) => {
            const userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.resendConfirmationCode(function (err, result) {
                if (err) {
                    reject({ message: err.message, res: null });
                } else {
                    resolve({ message: null, res: result });
                }
            });
        })
    }

    // newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
    //   console.log(newPasswordUser);
    //   // Get these details and call
    //   //cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
    //   let authenticationData = {
    //       Username: newPasswordUser.username,
    //       Password: newPasswordUser.existingPassword,
    //   };
    //   let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    //   let userData = {
    //       Username: newPasswordUser.username,
    //       Pool: this.cognitoUtil.getUserPool()
    //   };

    //   console.log("UserLoginService: Params set...Authenticating the user");
    //   let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    //   console.log("UserLoginService: config is " + AWS.config);
    //   cognitoUser.authenticateUser(authenticationDetails, {
    //       newPasswordRequired: function(userAttributes, requiredAttributes) {
    //         // User was signed up by an admin and must provide new
    //         // password and required attributes, if any, to complete
    //         // authentication.

    //         // the api doesn't accept this field back
    //         delete userAttributes.email_verified;
    //         cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
    //           onSuccess: function (result) {
    //             callback.cognitoCallback(null, userAttributes);
    //           },
    //           onFailure: function (err) {
    //             callback.cognitoCallback(err, null);
    //           }
    //         });
    //       },
    //       onSuccess: function (result) {
    //         callback.cognitoCallback(null, result);
    //       },
    //       onFailure: function (err) {
    //         callback.cognitoCallback(err, null);
    //       }
    //     });
    // }
}

@Injectable()
export class UserLoginService {

    userAuthenticated: Subject<any>;
    currentUserEmail: string;
    cognitoUser: any;

    constructor(public cognitoUtil: CognitoUtil) {
        AWS.config.region = environment.region;

        this.userAuthenticated = new Subject()
        this.userAuthenticated.next(false);
    }

    isUserAuthenticated(): Subject<any> {
        return this.userAuthenticated;
    }

    login(username: string, password: string): Promise<User> {
        return this.authenticate(username, password, this);
    }

    authenticate(username: string, password: string, callback: any): Promise<User> {

        return new Promise((resolve, reject) => {

            // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
            AWSCognito.config.update({ accessKeyId: 'anything', secretAccessKey: 'anything' })

            const authenticationData = {
                Username: username,
                Password: password,
            };
            const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

            const userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

            const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                newPasswordRequired: function (userAttributes, requiredAttributes) {
                    this.userAuthenticated = false;
                    reject({ message: `User needs to set password.`, res: null });
                },
                onSuccess: function (result) {

                    const logins = {}
                    logins['cognito-idp.' + CognitoUtil._REGION + '.amazonaws.com/' +
                     CognitoUtil._USER_POOL_ID] = result.getIdToken().getJwtToken();

                    // Add the User's Id Token to the Cognito credentials login map.
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
                        Logins: logins
                    });

                    this.cognitoUser = result;

                    AWS.config.credentials.get(function (err) {
                        if (!err) {
                            callback.userAuthenticated.next(true);
                            resolve({ name: username });
                        } else {
                            callback.userAuthenticated.next(false);
                            reject({ message: err.message, res: null });
                        }
                    });

                },
                onFailure: function (err) {
                    callback.userAuthenticated.next(false);
                    reject({ message: err.message, res: null })
                },
            });
        });
    }

    forgotPassword(username: string, callback: CognitoCallback) {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function (result) {

            },
            onFailure: function (err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    logout() {

        return new Promise((resolve, reject) => {
            this.cognitoUtil.getCurrentUser().signOut();
            this.userAuthenticated.next(false);
            resolve();
        })
    }

    checkAuthStatus(): Observable<User> {
        return Observable.fromPromise(this.isAuthenticated());
    }

    isAuthenticated(): Promise<User> {

        return new Promise((resolve, reject) => {
            const cognitoUser = this.cognitoUtil.getCurrentUser();

            if (cognitoUser != null) {
                this.currentUserEmail = cognitoUser.username;
                cognitoUser.getSession(function (err, session) {
                    if (err) {
                        reject(err);
                    } else {
                        const propName = 'cognito-idp.' + CognitoUtil._REGION + '.amazonaws.com/' + CognitoUtil._USER_POOL_ID;

                        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                            IdentityPoolId : CognitoUtil._IDENTITY_POOL_ID, // your identity pool id here
                            Logins : {
                                // Change the key below according to the specific region your user pool is in.
                                [propName] : session.getIdToken().getJwtToken()
                            }
                        });

                        resolve({ name: cognitoUser.username });
                    }
                });
            } else {
                reject(null);
            }
        });

    }

}

@Injectable()
export class UserParametersService {

    constructor(public cognitoUtil: CognitoUtil) {
    }

    getParameters(callback: Callback) {
        const cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log('UserParametersService: Could not retrieve the user');
                } else {
                    cognitoUser.getUserAttributes(function (err2, result) {
                        if (err) {
                            console.log('UserParametersService: in getParameters: ' + err2);
                        } else {
                            callback.callbackWithParam(result);
                        }
                    });
                }
            });
        } else {
            callback.callbackWithParam(null);
        }
    }
}
