import { NzNotificationService } from 'ng-zorro-antd';
import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { take, tap } from 'rxjs/operators';
import { AuthStateModel } from '../../dyn-auth/store/auth.model';
import * as fromAuth from '../../dyn-auth/store/auth.actions';
import { Observable, of } from '../../../../node_modules/rxjs';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        initialized: false,
        pending: false,
        user: null,
    }
})
export class MockAuthState implements NgxsOnInit {


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

    constructor(private store: Store, private _notification: NzNotificationService) { }

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
        return of({ email: 'deanselvey' }).pipe(
            take(1),
            tap((user) => {
                ctx.patchState({ initialized: true });
                if (user) {
                    console.log(`CheckSession: ${user.email} is logged in`);
                    ctx.dispatch(new fromAuth.LoginSuccess(user));
                    return;
                }
                console.log('CheckSession: no user found');
            })
        );
    }

    @Action(fromAuth.LoginWithEmailAndPassword)
    loginWithEmailAndPassword(ctx: StateContext<AuthStateModel>, action: fromAuth.LoginWithEmailAndPassword) {
        console.log('LoginWithEmailAndPassword');
        of({ email: 'deanselvey' }).pipe().toPromise().then(
            (user) => {
                ctx.dispatch(new fromAuth.LoginSuccess(user));
            })
            .catch(error => {
                ctx.dispatch(new fromAuth.LoginFailure(error));
            });
    }

    @Action(fromAuth.Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        return of().pipe().toPromise().then(
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
        of().toPromise()
            .then(() => {
                ctx.dispatch(new fromAuth.LoginWithEmailAndPassword(event.payload));
            })
    };

    @Action(fromAuth.LoginSuccess)
    onLoginSuccess(ctx: StateContext<AuthStateModel>) {
        console.log('onLoginSuccess, navigating to /');
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
    onSignUp(ctx: StateContext<MockAuthState>, event: fromAuth.SignUp) {
        of(event.payload.username, event.payload.password).toPromise()
            .then(() => ctx.dispatch(new fromAuth.VerificationEmail({ email: 'deanselvey' })))
            .catch((err) => ctx.dispatch(new fromAuth.RegisterError(err)))
    }

    @Action(fromAuth.LoginFailure)
    onLoginError(ctx: StateContext<AuthStateModel>, event: fromAuth.LoginFailure) {
        this._notification.create('error', 'Login Error', event.payload.message);
    }

    @Action(fromAuth.RegisterError)
    onRegisterError(ctx: StateContext<MockAuthState>, event: fromAuth.RegisterError) {
        this._notification.create('error', 'Registration Error', event.payload.message);
    }

    @Action(fromAuth.VerificationEmail)
    onVerificationEmail(ctx: StateContext<MockAuthState>) {
        of().toPromise()
            .then(() => this._notification.create('info', 'Please verify account', 'Please check your email to verify your account'))
            .catch((err) => ctx.dispatch(new fromAuth.VerificationError({ message: 'Failed to send verification email' })))
    }

    @Action(fromAuth.ForgotPassword)
    onForgotPassword(ctx: StateContext<MockAuthState>, event: fromAuth.ForgotPassword) {
        of(event.payload).toPromise()
            .then(() => this._notification.create('success', 'Email sent', 'Please check your email to reset your password'))
            .catch((err) => ctx.dispatch(new fromAuth.AuthError({ message: 'Failed to send password reset email' })))
    }

    @Action(fromAuth.NotVerified)
    onNotVerified(ctx: StateContext<MockAuthState>) {
        ctx.dispatch(new fromAuth.VerificationError({ message: 'Account not verified - please check your email' }));
    }
}

