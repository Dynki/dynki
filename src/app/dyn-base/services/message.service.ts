import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Actions, Store, ofActionDispatched, Select } from '@ngxs/store';

import * as baseActions from '../store/base.actions';
import { BaseState } from '../store/base.state';
import { Observable } from 'rxjs';
import { UserInfo } from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MessagingService {

    private userInfo: UserInfo;
    currentMessage = new BehaviorSubject(null)

    @Select(BaseState.domainId)
    private domainId$: Observable<string>;
    private domainId = undefined;

    constructor(
        private db: AngularFirestore,
        private action$: Actions,
        private store: Store,
        private afAuth: AngularFireAuth,
        private messaging: AngularFireMessaging
    ) {
        this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
            .subscribe(() => {
                this.domainId = this.store.selectSnapshot(BaseState.domainId);
            });

        this.afAuth.authState.subscribe(u => {
            this.userInfo = u
        });
    }


    updateToken(token) {
        this.afAuth.authState.take(1).subscribe(user => {
            if (!user) {
                 return;
            }

            return this.db.collection('domains').doc(this.domainId).collection('fcmTokens').doc(user.uid).set({ token });
        })
    }

    getPermission() {
        this.messaging.requestPermission
        .pipe(
            switchMap(() => {
                console.log('Notification permission granted.');
                return this.messaging.getToken
            })
        )
        .subscribe(token => {
                console.log(token)
                return this.updateToken(token);
        },
        (err) => {
            console.log('Unable to get permission to notify.', err);
        });
    }

    receiveMessage() {
        this.messaging.messages.subscribe((payload) => {
            console.log('Message received. ', payload);
            this.currentMessage.next(payload)
        });

    }
}
