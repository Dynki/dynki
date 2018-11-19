import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { NzNotificationService } from 'ng-zorro-antd';
import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { take, tap } from 'rxjs/operators';

import * as fromAuth from './auth.actions';
import { AuthStateModel } from './auth.model';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        initialized: false,
        pending: false,
        user: null,
    }
})
export class AuthState implements NgxsOnInit {


    /**
     * Selectors
     */
    @Selector()
    static getInitialized(state: AuthStateModel): boolean {
        return state.initialized;
    }

    @Selector()
    static getUser(state: AuthStateModel) {
        console.log('returning user ', state.user);
        return state.user;
    }

    @Selector()
    static getPending(state: AuthStateModel) {
        return state.pending;
    }

    constructor (
        private store: Store,
        private afAuth: AngularFireAuth,
        private _notification: NzNotificationService,
    ) {
    }

    /**
     * Dispatch CheckSession on start
     */
    ngxsOnInit(ctx: StateContext<AuthStateModel>) {
        ctx.dispatch(new fromAuth.CheckSession());
    }

    /**
     * Commands
     */
    @Action(fromAuth.CheckSession)
    checkSession(ctx: StateContext<AuthStateModel>) {
        console.log('Auth::State::checkSession');
        return this.afAuth.authState.pipe(
            take(1),
            tap((user: User) => {
                ctx.patchState({ initialized: true });
                if (user) {
                    console.log(`CheckSession: ${user.email} is logged in`);
                    ctx.dispatch(new fromAuth.CheckSuccess(user));
                    return;
                }
                console.log('CheckSession: no user found');
            })
        );
    }

    @Action(fromAuth.LoginWithEmailAndPassword)
    loginWithEmailAndPassword(ctx: StateContext<AuthStateModel>, action: fromAuth.LoginWithEmailAndPassword) {
        console.log('LoginWithEmailAndPassword');
        this.afAuth.auth.signInWithEmailAndPassword(action.payload.username, action.payload.password).then(
            (user: User) => {
            // (user: UserInfo) => {
                ctx.dispatch(new fromAuth.LoginSuccess(user));
            })
            .catch(error => {
                ctx.dispatch(new fromAuth.LoginFailure(error));
            });
    }

    @Action(fromAuth.Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        return this.afAuth.auth.signOut().then(
            () => {
                ctx.dispatch(new fromAuth.LogoutSuccess());
            });
    }

    /**
     * Events
     */
    @Action(fromAuth.LoginSuccess)
    setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, event: fromAuth.LoginSuccess) {
        console.log(event);
        ctx.patchState({
            user: event.payload.user
        });
    }

    @Action(fromAuth.CheckSuccess)
    setUserStateOnCheckSuccess(ctx: StateContext<AuthStateModel>, event: fromAuth.LoginSuccess) {
        console.log(event);
        ctx.patchState({
            user: event.payload
        });
    }


    @Action([fromAuth.LoginFailure, fromAuth.LogoutSuccess])
    setUserStateOnFailure(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            user: undefined
        });
        console.log('setUserStateOnFailure::Dispatching Login Redirect')
        ctx.dispatch(new fromAuth.LoginRedirect());
    }

    @Action(fromAuth.SetPersistence)
    setPersistence(ctx: StateContext<AuthStateModel>, event: fromAuth.SetPersistence) {
        console.log('setPersistence');
        this.afAuth.auth.setPersistence(event.payload.persistence)
            .then(() => {
                ctx.dispatch(new fromAuth.LoginWithEmailAndPassword(event.payload));
            })
    };

    @Action(fromAuth.RefreshToken)
    refreshToken(ctx: StateContext<AuthStateModel>) {
        this.afAuth.auth.currentUser.getIdToken(true)
    };

    @Action(fromAuth.LoginSuccess)
    onLoginSuccess(ctx: StateContext<AuthStateModel>) {
        console.log('onLoginSuccess, navigating to /');
        ctx.dispatch(new Navigate(['/']));
    }

    @Action(fromAuth.CheckSuccess)
    onCheckSuccess(ctx: StateContext<AuthStateModel>) {
        console.log('onCheckSuccess, navigating to /');
        ctx.dispatch(new Navigate(['/']));
    }

    @Action(fromAuth.LoginRedirect)
    onLoginRedirect(ctx: StateContext<AuthStateModel>) {
        console.log('onLoginRedirect, navigating to /login/auth');
        ctx.dispatch(new Navigate(['/login/auth']));
    }

    @Action(fromAuth.RegisterRedirect)
    onRegisterRedirect(ctx: StateContext<AuthStateModel>) {
        console.log('onRegisterRedirect, navigating to /login/register');
        ctx.dispatch(new Navigate(['/login/register']));
    }

    @Action(fromAuth.LoginWithEmailAndPassword)
    setPendingStatusOnLogin(ctx: StateContext<AuthStateModel>, event: fromAuth.LoginWithEmailAndPassword) {
        ctx.patchState({
            pending: true
        });
    }

    @Action([fromAuth.LoginFailure, fromAuth.LoginSuccess])
    setPendingStatusOnCompletion(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({
            pending: false
        });
    }


    @Action(fromAuth.SignUp)
    onSignUp(ctx: StateContext<AuthState>, event: fromAuth.SignUp) {
        this.afAuth.auth.createUserWithEmailAndPassword(event.payload.username, event.payload.password)
            .then(() => ctx.dispatch(new fromAuth.VerificationEmail(this.afAuth.auth.currentUser.reload())))
            .catch((err) => ctx.dispatch(new fromAuth.RegisterError(err)))
    }

    @Action(fromAuth.LoginFailure)
    onLoginError(ctx: StateContext<AuthStateModel>, event: fromAuth.LoginFailure) {
        this._notification.create('error', 'Login Error', event.payload.message);
    }

    @Action(fromAuth.RegisterError)
    onRegisterError(ctx: StateContext<AuthState>, event: fromAuth.RegisterError) {
        this._notification.create('error', 'Registration Error', event.payload.message);
    }

    @Action(fromAuth.VerificationEmail)
    onVerificationEmail(ctx: StateContext<AuthState>) {
        this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => this._notification.create('info', 'Please verify account', 'Please check your email to verify your account'))
            .catch((err) => ctx.dispatch(new fromAuth.VerificationError({ message: 'Failed to send verification email' })))
    }

    @Action(fromAuth.ForgotPassword)
    onForgotPassword(ctx: StateContext<AuthState>, event: fromAuth.ForgotPassword) {
        this.afAuth.auth.sendPasswordResetEmail(event.payload)
            .then(() => this._notification.create('success', 'Email sent', 'Please check your email to reset your password'))
            .catch((err) => ctx.dispatch(new fromAuth.AuthError({ message: 'Failed to send password reset email' })))
    }

    @Action(fromAuth.NotVerified)
    onNotVerified(ctx: StateContext<AuthState>) {
        ctx.dispatch(new fromAuth.VerificationError({ message: 'Account not verified - please check your email' }));
    }
}

