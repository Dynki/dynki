import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from 'firebase';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Store, Select, Actions, ofActionDispatched } from '@ngxs/store';
import { BaseState } from 'app/dyn-base/store/base.state';
import * as baseActions from '../../dyn-base/store/base.actions';
import { IMessages } from '../store/message.model';
import * as messageActions from '../store/message.actions';

@Injectable()
export class MessagingService {

  private userInfo: UserInfo;

  @Select(BaseState.domainId)
  private domainId$: Observable<string>;
  private domainId = undefined;

  constructor(private db: AngularFirestore, private action$: Actions, private store: Store, private afAuth: AngularFireAuth) {
    this.action$.pipe(ofActionDispatched(baseActions.DomainLoaded))
      .subscribe(() => {
        this.domainId = this.store.selectSnapshot(BaseState.domainId);
      });

      this.afAuth.authState.subscribe(u => {
          this.userInfo = u
        });
   }

  getMessages() {
    console.log('Messaging::Service::getMessages');
    // return this.db.collection('domains').doc(this.domainId).collection('boardsInDomain').doc('appBoards').snapshotChanges()
    // .pipe(
    //   map(a => {
    //     const data = a.payload.data();
    //     const id = a.payload.id;
    //     return { id, ...data } as IMessages;
    //   })
    // ).subscribe((boards: IBoards) => {
    //   this.store.dispatch(new boardActions.RefreshBoards(boards));
    // })
    const messages: IMessages = {
        messages: [
        {
            id: '232425t34534',
            from: 'Dynki Team',
            to: ['Dean Selvey'],
            subject: 'Welcome to Dynki',
            body: 'Welcome to Dynki, we hope you enjoy it',
            sent: true,
            created: new Date(),
            author: 'Dynki Team',
            status: 'Unread'
        }]
    }

    this.store.dispatch(new messageActions.RefreshMessages(messages));
  }
}
